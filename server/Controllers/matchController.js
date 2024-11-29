const {Match} = require("../models/models")
const ApiError=require("../error/ApiError")

class MatchController{
    async create(req,res){
        try{
            const {PlayerId1,PlayerId2,PlayerId3,PlayerId4,PlayerId5,PlayerId6,PlayerId7,PlayerId8,PlayerId9,PlayerId10}=req.body
            const match=await Match.create({PlayerId1,PlayerId2,PlayerId3,PlayerId4,PlayerId5,PlayerId6,PlayerId7,PlayerId8,PlayerId9,PlayerId10})
            return res.json(match)
        }
        catch(e){
            console.log(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){
        let matches
        matches=await Match.findAll()
        return res.json(matches)
    }
    async getSome(req,res){
        let{limit,page}=req.query
        page=page||1
        limit=limit||5
        let offset=page=limit-limit
        let matches
        matches=await Match.findAll({where:limit,offset})
        return res.json(matches)
    }
    async getOne(req,res){
        const {MatchId}=req.params
        const match= await Match.findOne(
            {
                where:{MatchId},
            },
        )
        return res.json(match)
    }
}

module.exports=new MatchController()