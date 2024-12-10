const {PlayerInMatch} = require("../models/models")
const ApiError=require("../error/ApiError")

class PlayerInMatchController{
    async create(req,res){
        try{
            const {User_Id,PlayerName,HeroId,Kills,Deaths,Assists,ItemId1,ItemId2,ItemId3,ItemId4,ItemId5,ItemId6,NeutralSlotId,Side}=req.body
            const player=await PlayerInMatch.create({User_Id,PlayerName,HeroId,Kills,Deaths,Assists,ItemId1,ItemId2,ItemId3,ItemId4,ItemId5,ItemId6,NeutralSlotId,Side})
            return res.json(player)
        }
        catch(e){
            console.log(ApiError.badRequest(e.message))
        }
        
    }

    async getOne(req, res){
        try {
            const { userId } = req.params; 
            console.log("play"+userId)// Correctly access userId from req.params
            const player = await PlayerInMatch.findAll({ // Use findAll for multiple matches
                where: { User_Id: userId }, // Use correct key for User_Id
            });
            console.log("play"+player)
            return res.json(player);
        } catch (e) {
            console.error(e); // Log the actual error for debugging
            return res.status(500).json({ message: "Internal Server Error" }); // Send appropriate error response
        }
    }
    async getSome(req, res) {
        try {
            const { matchId } = req.params;
            const players = await PlayerInMatch.findAll({
                where: { MatchMatchId: matchId },
            });
            return res.json(players);
        } catch (error) {
            console.error("Error fetching players in match:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
}

module.exports=new PlayerInMatchController()