const Router = require('express')
const router = new Router()
const UserController=require('../Controllers/UserController')
const authMiddleWare=require("../middleware/authMiddleWare")
const {body} = require('express-validator')

router.post('/registration',
    UserController.registration)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.get('/refresh',UserController.refresh)
router.get('/getUsers',UserController.getUsers)
router.get('/auth',authMiddleWare,UserController.check)

module.exports=router