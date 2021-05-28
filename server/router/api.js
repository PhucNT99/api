const express = require("express")
const router = express.Router()
const { apiController } =  require("../controller")

router.post("/create",  apiController.createApi)
router.post("/update",  apiController.updateApi)
router.post("/get-list",  apiController.getListApi)
router.post("/delete",  apiController.deleteApi)
router.post("/gen-doc",  apiController.genDocApi)
router.post("/gen-test",  apiController.genTestApi)


module.exports = router