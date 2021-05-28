const express = require("express")
const router = express.Router()
const { generateController } = require("../controller")

router.post("/full-info", generateController.getFullInfoProject)
router.post("/gen-doc", generateController.genDocs)
router.post("/gen-test", generateController.genTests)
module.exports = router