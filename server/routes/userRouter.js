const Router = require('express')
const router = new Router()
const UserController=require('../Controllers/UserController')


router.post('/registration',UserController.registration)
router.post('/login',UserController.login)
router.get('/auth',UserController.check)

module.exports=router