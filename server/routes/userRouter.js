const Router = require('express')
const router = new Router()
const UserController=require('../Controllers/UserController')
const authMiddleWare=require("../middleware/authMiddleWare")

router.post('/registration',UserController.registration)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.get('/refresh',UserController.refresh)
router.get('/users',UserController.getUsersByTeamId)
router.get('/allusers',UserController.getUsers)
router.get('/', UserController.getUsersByNickName);
router.get('/profile/:id',authMiddleWare, UserController.getProfile);
router.put('/update/:id',  UserController.update);
router.get('/auth',UserController.check)
router.put('/jointeam/:userId', authMiddleWare, UserController.JoinTeam); 

module.exports=router