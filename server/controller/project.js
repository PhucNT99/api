const { getResponse }  = require("../utils")
const { Api, Project } = require("../models")

function createProject(req, res, next) {
    let {name, description} = req.body
    console.log(name, description)
    Project.findOrCreate({
        where: {
            name
        },
        defaults: {
            name,
            description
        }
    })
    .then(([project, created]) => {
        if(created) {
            return res.send(getResponse(200, "Create project success!", project))
        }
        return res.send(getResponse(400, "Project has been existed!"))
    })
    .catch(next)
}

function updateProject(req, res, next) {
    let {id, name, description } = req.body
    Project.update({ id, name, description },{
        where: {
            id
        }
    })
    .then(project => {
        return res.send(getResponse(200, "Update project success!", project))
    })
    .catch(next)
}

function getListProject(req, res, next) {
    Project.findAll()
    .then(projects => {
        res.send(getResponse(200, "Get list project success!", projects))
    })
    .catch(next)
}

function deleteProject(req, res, next) {
    let { id } = req.body
    Project.destroy({
        where: {
            id
        }
    })
    .then(() => {
        res.send(getResponse(200, "Delete project success!"))
    })
    .catch(next)
}

module.exports = {
    createProject,
    updateProject,
    getListProject,
    deleteProject,
}