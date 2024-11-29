const {Heroes} = require("../models/models")
const ApiError=require("../error/ApiError")
const uuid =require("uuid")
const path=require("path")

class HeroesController{
    async create(req,res){
        try{
            const {HeroName,BuildId,Attribute,Strength,StrengthPlus,Agility,AgilityPlus,Intelligence,IntelligencePlus,Difficulty,AttackType,Health,Mana,HealthPlus,ManaPlus,SkillId1,SkillId2,SkillId3,SkillId4}=req.body
            const {HeroImg}=req.files
            let fileName=uuid.v4()+".jpg"
            HeroImg.mv(path.resolve(__dirname,'..','static',fileName))

            const hero=await Heroes.create({HeroName,BuildId,Attribute,Strength,StrengthPlus,Agility,AgilityPlus,Intelligence,IntelligencePlus,Difficulty,AttackType,Health,Mana,HealthPlus,ManaPlus,SkillId1,SkillId2,SkillId3,SkillId4,HeroImg:fileName})
            return res.json(hero)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){
        let heroes
        heroes=await Heroes.findAll()
        return res.json(heroes)
    }
    async getOne(req,res){
        const {HeroId}=req.params
        const hero= await Heroes.findOne(
            {
                where:{HeroId},
            },
        )
        return res.json(hero)
    }
}

module.exports=new HeroesController()