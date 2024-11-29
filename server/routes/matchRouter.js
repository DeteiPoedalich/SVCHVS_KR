const Router = require('express')
const router = new Router()
const matchController=require("../Controllers/matchController")

router.post('/',matchController.create)
router.get('/',matchController.getAll)
router.get('/',matchController.getSome)
router.get('/:MatchId',matchController.getOne)

module.exports=router