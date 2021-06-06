class Response {
    constructor(code, message, content) {
        this.code = code
        this.message = message || ""
        this.content = content || {}
    }
}

function getResponse(code, message, content) {
    return new Response(code, message, content)
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
module.exports = {
    getResponse,
    parseJson
}