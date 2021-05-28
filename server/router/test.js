const express = require("express")
const router = express.Router()
const { testController } =  require("../controller")

router.post("/create",  testController.createTest)
router.post("/update",  testController.updateTest)
router.post("/get-list",  testController.getListTest)
router.post("/delete",  testController.deleteTest)
router.post("/gen-doc",  testController.genDocTest)
router.post("/gen-test",  testController.genTestTest)


module.exports = router