const Router = require('express')
const router = new Router()
const UserController=require('../Controllers/UserController')
const authMiddleWare=require("../middleware/authMiddleWare")

router.post('/registration',UserController.registration)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.get('/refresh',UserController.refresh)
router.get('/users',UserController.getUsers)
router.get('/profile/:id', authMiddleWare, UserController.getProfile);
router.put('/update/:id',  UserController.update);
router.get('/auth',UserController.check)

module.exports=router