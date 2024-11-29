const {PlayerInMatch} = require("../models/models")
const ApiError=require("../error/ApiError")

class PlayerInMatchController{
    async create(req,res){
        try{
            const {PlayerName,HeroId,Kills,Deaths,Assists,ItemId1,ItemId2,ItemId3,ItemId4,ItemId5,ItemId6,NeutralSlotId,Side}=req.body
            const player=await PlayerInMatch.create({PlayerName,HeroId,Kills,Deaths,Assists,ItemId1,ItemId2,ItemId3,ItemId4,ItemId5,ItemId6,NeutralSlotId,Side})
            return res.json(player)
        }
        catch(e){
            console.log(ApiError.badRequest(e.message))
        }
        
    }

    async getOne(req,res){
        const {PlayerId}=req.params
        const player= await PlayerInMatch.findOne(
            {
                where:{PlayerId},
            },
        )
        return res.json(player)
    }
    
}

module.exports=new PlayerInMatchController()