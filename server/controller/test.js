const { getResponse }  = require("../utils")
const { Test, Api } = require("../models")

// createTest
// updateTest
// getListTest
// deleteTest
// genDocTest
// genTestTest

async function createTest(req, res, next) {
    let { name, data, idApi} = req.body
    let api = await Api.findByPk(idApi)
    if (!api) {
        return res.send(getResponse(400, "Test case has been existed!"))
    } 
    // let [test, created] = await Test.findOrCreate({ where:{ name }, defaults:{ name, data}})
    // if(created) {
    //     api.addTest(test)
    //     return res.send(getResponse(200, "Create Test case success!", test))
    // }
    // return res.send(getResponse(400, "Test case has been existed!"))
    let test = await Test.create({ name, data })
    api.addTest(test)
    return res.send(getResponse(200, "Create Test case success!", test))
}

function updateTest(req, res, next) {
    let {name, data, id} = req.body
    Test.update({ id, name, data }, {
        where: {
            id
        }
    })
    .then(test => {
        return res.send(getResponse(200, "Update Test success!", test))
    })
    .catch(next)
}

function getListTest(req, res, next) {
    let idApi = req.body.idApi || req.body.apiId
    Test.findAll({
        where: {
            apiId: idApi
        }
    })
    .then(tests => {
        res.send(getResponse(200, "Get all Test of api", tests))
    })
    .catch(next)
}

function deleteTest(req, res, next) {
    let { id } = req.body
    Test.destroy({
        where: {
            id
        }
    })
    .then(() => {
        res.send(getResponse(200, "Delete Test success!"))
    })
    .catch(next)
}

function genDocTest(req, res, next) {
    let { id } = req.body.id
    Test.findByPk(id)
    .then(test => {

    })
}

function genTestTest(req, res, next) {
    let { id } = req.body.id
    Test.findByPk(id)
    .then(test => {
        
    })
}

module.exports = {
    createTest,
    updateTest,
    getListTest,
    deleteTest,
    genDocTest,
    genTestTest,
}