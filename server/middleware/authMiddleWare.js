const jwt= require('jsonwebtoken')
const tokenService= require('../services/token-service')

module.exports=function(req,res,next){
    if(req==="OPTIONS"){
        next()
    }
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(e)
        }
        const accessToken=authorizationHeader.split(' ')[1]
        if(!accessToken){
            return next(e)
        }
        const userData=tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(e)
        }
        req.user=userData;
        next()
    }
    catch(e){
        res.status(401).json({message:"Not authorized"})
    }
}