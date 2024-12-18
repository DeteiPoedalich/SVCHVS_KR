const Router = require('express')
const router = new Router()
const teamController=require("../Controllers/teamController")
const authMiddleWare=require("../middleware/authMiddleWare")

router.post('/',authMiddleWare,teamController.create)
router.get('/',teamController.getAll)
router.get('/:TeamId',teamController.getOne)

module.exports=router