const Router = require('express')
const router = new Router()
const skillController=require("../Controllers/skillController")

router.post('/',skillController.create)
router.get('/:SkillId',skillController.getOne)

module.exports=router