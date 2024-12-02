const Router = require('express')
const router = new Router()
const buildController=require("../Controllers/buildController")
const checkRoleMiddleWare=require("../middleware/checkRoleMiddleWare")

router.post('/',buildController.create)
router.get('/:BuildId',buildController.getOne)

module.exports=router