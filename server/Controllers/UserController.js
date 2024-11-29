const ApiError=require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User}=require("../models/models")

const generateJwt = (UserId,NickName,role) =>{
    return jwt.sign({UserId,NickName,role},process.env.SECRET_KEY,{expiresIn:'30m'})
}

class UserController{
    async registration(req,res,next){
        const {NickName,password,role}=req.body
        if(!NickName || !password){
            return next(ApiError.badRequest('Wrong nickname or password'))
        }
        const candidate= await User.findOne({where:{NickName}})
        if(candidate){
            return next(ApiError.badRequest('There is already a user with such nickname'))
        }
        const hashPassword= await bcrypt.hash(password,5)
        const user=await User.create({NickName,role,password:hashPassword})
        const token=generateJwt(user.UserId, user.NickName, user.role)
        return res.json({token})
    }

    async login(req,res,next){
        const {NickName,password}=req.body
        const user= await User.findOne({where:{NickName}})
        if(!user){
            return next(ApiError.internal("There is no user with such nickname"))
        }
        let comparePassword=bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Your password is wrong"))
        }
        const token=generateJwt(user.UserId, user.NickName, user.role)
        return res.json({token})
    }

    async check(req,res,next){
        const token=generateJwt(req.user.UserId, req.user.NickName, req.user.role)
        return res.json(token)
    }
}

module.exports=new UserController()