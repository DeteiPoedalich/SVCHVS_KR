const Router = require('express')
const router = new Router()
const PlayerInMatchController=require("../Controllers/playerInMatchController")

router.post('/',PlayerInMatchController.create)
router.get('/:userId', PlayerInMatchController.getOne);
router.get('/inmatch/:matchId', PlayerInMatchController.getSome) 

module.exports=router