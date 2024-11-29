const Router = require('express')
const router = new Router()
const PlayerInMatchController=require("../Controllers/playerInMatchController")

router.post('/',PlayerInMatchController.create)
router.get('/:PlayerId',PlayerInMatchController.getOne)

module.exports=router