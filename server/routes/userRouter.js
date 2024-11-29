const Router = require('express')
const router = new Router()
const UserController=require('../Controllers/UserController')
const authMiddleWare=require("../middleware/authMiddleWare")

router.post('/registration',UserController.registration)
router.post('/login',UserController.login)
router.get('/auth',authMiddleWare,UserController.check)

module.exports=router