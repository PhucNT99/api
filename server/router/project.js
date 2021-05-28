const express = require("express")
const router = express.Router()
const { projectController } =  require("../controller")

router.post("/create",  projectController.createProject)
router.post("/update",  projectController.updateProject)
router.post("/get-list",  projectController.getListProject)
router.post("/delete",  projectController.deleteProject)

module.exports = router

// 172.16.4.0:3002/api/project/create // name: 
                                      // description:

// 172.16.4.0:3002/api/project/update // name:

// 172.16.4.0:3002/api/project/get-list

// 172.16.4.0:3002/api/project/delete