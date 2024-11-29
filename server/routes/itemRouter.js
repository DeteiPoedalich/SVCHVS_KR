const Router = require('express')
const router = new Router()
const itemController=require("../Controllers/itemController")

router.post('/',itemController.create)
router.get('/',itemController.getAll)
router.get('/:ItemId',itemController.getOne)

module.exports=router