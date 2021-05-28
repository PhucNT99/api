const { getResponse }  = require("../utils")
const { Api, Project } = require("../models")

// createApi
// updateApi
// getListApi
// deleteApi
// genDocApi
// genTestApi

async function createApi(req, res, next) {
    let { name, data, idProject} = req.body
    let project = await Project.findByPk(idProject)
    if (!project) {
        return res.send(getResponse(400, "Project has been existed!"))
    } 
    let [api, created] = await Api.findOrCreate({ where:{ name }, defaults:{ name, data}})
    if(created) {
        project.addApi(api)
        return res.send(getResponse(200, "Create project success!", api))
    }
    return res.send(getResponse(400, "Project has been existed!"))
}

function updateApi(req, res, next) {
    let {name, data, id} = req.body
    Api.update({ id, name, data }, {
        where: {
            id
        }
    })
    .then(api => {
        return res.send(getResponse(200, "Update api success!", api))
    })
    .catch(next)
}

function getListApi(req, res, next) {
    let idProject = req.body.idProject || req.body.ProjectId
    Api.findAll({
        where: {
            ProjectId: idProject
        }
    })
    .then(apis => {
        res.send(getResponse(200, "Get all api of project", apis))
    })
    .catch(next)
}

function deleteApi(req, res, next) {
    let { id } = req.body.id
    Api.destroy({
        where: {
            id
        }
    })
    .then(() => {
        res.send(getResponse(200, "Delete api success!"))
    })
    .catch(next)
}

function genDocApi(req, res, next) {
    let { id } = req.body.id
    Api.findByPk(id)
    .then(api => {

    })
}

function genTestApi(req, res, next) {
    let { id } = req.body.id
    Api.findByPk(id)
    .then(api => {
        
    })
}

module.exports = {
    createApi,
    updateApi,
    getListApi,
    deleteApi,
    genDocApi,
    genTestApi,
}