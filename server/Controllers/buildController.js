const {Build} = require("../models/models")
const ApiError=require("../error/ApiError")
const uuid =require("uuid")
const path=require("path")

class BuildController{
    async create(req,res){
        try{
            const {ItemId1,ItemId2,ItemId3,ItemId4,ItemId5,ItemId6,SkillId1,SkillId2,SkillId3,SkillId4,SkillLVL1,SkillLVL2,SkillLVL3,SkillLVL4}=req.body
            const build=await Build.create({ItemId1,ItemId2,ItemId3,ItemId4,ItemId5,ItemId6,SkillId1,SkillId2,SkillId3,SkillId4,SkillLVL1,SkillLVL2,SkillLVL3,SkillLVL4})
            return res.json(build)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getOne(req,res){
        const {BuildId}=req.params
        const build= await Build.findOne(
            {
                where:{BuildId},
            },
        )
        return res.json(build)
    }
}

module.exports=new BuildController()