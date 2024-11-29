const Router = require('express')
const router = new Router()
const buildController=require("../Controllers/buildController")

router.post('/',buildController.create)
router.get('/:BuildId',buildController.getOne)

module.exports=router