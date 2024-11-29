const {Team} = require("../models/models")
const ApiError=require("../error/ApiError")
const uuid =require("uuid")
const path=require("path")

class TeamController{
    async create(req,res){
        try{
            const {TeamName}=req.body
            const {TeamImg}=req.files
            let fileName=uuid.v4()+".jpg"
            TeamImg.mv(path.resolve(__dirname,'..','static',fileName))

            const team=await Team.create({TeamName,TeamImg:fileName})
            return res.json(team)
        }
        catch(e){
            console.log(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){
        let teams
        items=await Team.findAll()
        return res.json(teams)
    }
    async getOne(req,res){
        const {TeamId}=req.params
        const team= await Team.findOne(
            {
                where:{TeamId},
            },
        )
        return res.json(team)
    }
}

module.exports=new TeamController()