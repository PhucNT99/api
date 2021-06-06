function parseJson(project) {
    project.Apis.forEach(a => {
        a.data = JSON.parse(a.data)
        a.Tests.forEach(t => {
            t.data = JSON.parse(t.data)
        })
    })
    return project
}

export {
    parseJson
}