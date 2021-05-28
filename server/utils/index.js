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

module.exports = {
    getResponse
}