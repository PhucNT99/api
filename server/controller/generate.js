const { getResponse }  = require("../utils")
const { Api, Test, Project } = require("../models")
const fs = require("fs")
const path = require("path")
const archiver = require('archiver');
const { exec } = require("child_process")

function getFullInfoProject(req, res, next) {
    let idProject = req.body.id || req.body.idProject
    Project.findByPk(idProject, {
        include: [
            {
                model: Api,
                include: [
                    {
                        model: Test,
                    }
                ]
            }
        ]
    })
    .then(project => {
        parseJson(project)
        res.send(getResponse(200, "", project))
    })
    .catch(next)

}

function parseJson(project) {
    project.Apis.forEach(a => {
        a.data = JSON.parse(a.data)
        a.Tests.forEach(t => {
            t.data = JSON.parse(t.data)
        })
    })
    return project
}

function genDocs(req, res, next) {
    let idProject = req.body.id || req.body.idProject
    Project.findByPk(idProject, {
        include: [
            {
                model: Api,
                include: [
                    {
                        model: Test,
                    }
                ]
            }
        ]
    })
    .then(project => {
        parseJson(project)
        makeFolder(project)
        .then(out => {
            res.sendFile(out)
        })
    })
    .catch(next)
}

function genTests(req, res, next) {
    let idProject = req.body.id || req.body.idProject
    Project.findByPk(idProject, {
        include: [
            {
                model: Api,
                include: [
                    {
                        model: Test,
                    }
                ]
            }
        ]
    })
    .then(project => {
        parseJson(project)
        let test = genTestCases(project)
        res.send(getResponse(200, "", test))
    })
    .catch(next)
}

const u = require("url")
function genTestCases(projectObj) {
    let col = {
        info: {
            name: projectObj.name,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: []
    }
    for(let api of projectObj.Apis) {
        if(!api.Tests || !api.Tests.length) {
            continue
        }
        let testCases = api.Tests
        for(let cs of testCases) {
            for(let _cs of cs.data) {
                let item = {
                    name: cs.name,
                    event: [],
                    request: {},
                    response: []
                }
                let _item = {
                listen: 'test',
                script: {
                        exec: [`pm.test(\"${_cs.name}\", function(){\r`],
                        type: "text/javascript"
                    }
                }
                for(let e of _cs.expect) {
                    if(e.code) {
                        _item.script.exec.push(`    pm.response.to.have.status(${e.code});\r`)
                    }else {
                        _item.script.exec.push(`    pm.expect('${e.response}').${e.condition};\r`,)
                    }
                }
                item.request = processRequest(api.data, _cs)
                _item.script.exec.push("});\r")
                item.event = [_item]
                col.items.push(item)
            }
        }
    }
    console.log(JSON.stringify(col, null, 4))
    return col
}
function processRequest(api, cs) {
    let result = {
        method: api.method,
        header: []
    }
    if(result.method.toUpperCase() == "POST") {
        result.body = {
            mode: api.mode,
        }
        result.body[api.mode] = genRequestPost(cs.parameters, api.parameters, api.mode)
    }
    result.url = processUrl(mapper(api.path, cs.parameters, api.parameters))
    return result
}
function genRequestPost(parameters, apiParameters, mode) {
    if(mode == "raw") {
        let raw = {}
        parameters.forEach(i => {
            let obj = apiParameters.find(v => {
                return v.name == i.name 
            })
            if(obj && obj.in == "body") raw[i.name] = (i || {}).value.toString()
        })
        
        return raw
    }
    let result = []
    parameters.forEach(i => {
        let obj = apiParameters.find(v => {
            return v.name == i.name 
        })
        if(obj && obj.in == "body")
            result.push({
                    key: i.name,
                    value: (i || {}).value.toString(),
                    type: "text"
                })
            })
        return result
}
function mapper(string, parameters, apiParameters) {
    parameters.forEach(i => {
        let _i = apiParameters.find(a => {
            return i.name == a.name
        })
        if(_i && _i.in == "path") {
            if(Array.isArray(i.value)) {
                i.value.forEach(v => {
                    string = string.replace(`\{${i.name}\}`, v)
                })
            }else {
                string = string.replace(`\{${i.name}\}`, i.value)
            }
        }else if(_i && _i.in == "query") {
            string +="?"
            if(Array.isArray(i.value)) {
                i.value.forEach(v => {
                    string += `${v.name}=${v.value}`
                })
            }else {
                string += `${i.name}=${i.value}`
            }
        }
    })
    return string
}
function processUrl(string) {
    let obj = {
        raw: string
    }
    let url = new u.URL(string)
    obj.protocol = url.protocol.replace(":","")
    obj.host = url.hostname.split(".")
    obj.path = url.pathname.split("/").filter(i => i)
    obj.query = []
        url.searchParams.forEach((value, key) => {
        obj.query.push({
            key,
            value
        })
    })
    return obj
}
// ====================================================
let docsPath = path.join(__dirname, "..", "tmp_docs")
function makeSummaryMD(projectObj) {
    let str = "";
    let apis = projectObj.Apis
    str += "#Sumamry\n\n";
    str += `* [${projectObj.name}](${projectObj.name}/README.md)\n\n`
    for(let obj of apis) {
        str += `    * [${obj.name}](${projectObj.name}/${obj.name}.md)\n\n`
    }
    return str
}

function makeApiMD(api) {
    let data = api.data
    let str = ""
    str += `#### ${api.name}\n\n`
    str += `${data.description}\n`
    str += `#### Path\n\n   `
    str += `    ${data.method} ${data.path}\n`
    str += `#### Parameters\n`
    str += `| |Description|Type|Require |\n`
    str += `|-|-|-|-|\n`
    for(let p of data.parameters) {
        str += `|\`${p.name}\`|${p.description}|\`${p.type}\`|\`${p.required}\`|\n`
    }
    str += `#### Responses\n`
    str += `|Code|Message|Description|\n`
    str += `|-|-|-|\n`
    for(let r of data.responses) {
        str += `|\`${r.code}\`|${r.message}|${r.description}|\n`
    }

    return str
}

function makeReadmeMD() {
    return "This is my document"
}
function makeFolder(projectObj) {
    let projectName = projectObj.name
    let projectId = projectObj.id
    let projectIdPath = path.join(docsPath, projectId.toString())
    let projectNamePath = path.join(projectIdPath, projectName)
    if(!fs.existsSync(projectIdPath)) {
        fs.mkdirSync(projectIdPath)
    }
    if(!fs.existsSync(projectNamePath)) {
        fs.mkdirSync(projectNamePath)
    }
    fs.writeFileSync(path.join(projectIdPath, "SUMMARY.md"), makeSummaryMD(projectObj))
    fs.writeFileSync(path.join(projectIdPath, "README.md"), makeReadmeMD(projectObj))
    for(let obj of projectObj.Apis) {
        const filePath = path.join(projectNamePath, obj.name + ".md")
        fs.writeFileSync(filePath, makeApiMD(obj))
    }
    return new Promise((resolve, reject) => {
        exec(`cd ${projectIdPath} && npx gitbook build`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            zipDirectory(projectIdPath + "/_book", projectIdPath + '/docs.zip')
            .then(resolve)
            .catch(reject)
        })
    })
}
function zipDirectory(source, out) {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream(out);
  
    return new Promise((resolve, reject) => {
      archive
        .directory(source, false)
        .on('error', err => reject(err))
        .pipe(stream)
      ;
  
      stream.on('close', () => resolve(out));
      archive.finalize();
    });
}
module.exports = {
    getFullInfoProject,
    genDocs,
    genTests
}