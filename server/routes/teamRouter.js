const Router = require('express')
const router = new Router()
const teamController=require("../Controllers/teamController")

router.post('/',teamController.create)
router.get('/',teamController.getAll)
router.get('/:TeamId',teamController.getOne)

module.exports=router