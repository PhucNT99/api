require("dotenv").config()
const express		= require("express")
const cors			= require("cors")
const bodyParser 	= require("body-parser")
const app			= express()
const PORT			= process.env.PORT || 3002
const { getResponse } = require("./server/utils")
const { apiRoute, projectRoute, testRoute, generateRoute } = require("./server/router")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
	console.log(req.body || req.params)
	next()
})
app.use("/api/project", projectRoute)
app.use("/api/api", apiRoute)
app.use("/api/test", testRoute)
app.use("/api/gen", generateRoute)

app.use(function(error, req, res, next) {
	console.log(error)
	return res.send(getResponse(404, "Page not found"))
})

app.listen(PORT,function() {
	console.log("Listening!!!", PORT)
})

