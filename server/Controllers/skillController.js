const {Skill} = require("../models/models")
const ApiError=require("../error/ApiError")
const uuid =require("uuid")
const path=require("path")

class SkillController{
    async create(req,res){
        try{
            const {SkillName,SkillDescription}=req.body
            const {SkillImg}=req.files
            let fileName=uuid.v4()+".jpg"
            SkillImg.mv(path.resolve(__dirname,'..','static',fileName))

            const skill=await Skill.create({SkillName,SkillDescription, SkillImg:fileName})
            return res.json(skill)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getOne(req,res){
        const {SkillId}=req.params
        const skill= await Skill.findOne(
            {
                where:{SkillId},
            },
        )
        return res.json(skill)
    }
}

module.exports=new SkillController()