const {Team} = require("../models/models")
const ApiError=require("../error/ApiError")
const uuid =require("uuid")
const path=require("path")

class TeamController{
    async create(req, res) {
        try {
            const { TeamName } = req.body;
            let fileName = null; // Initialize fileName to null
    
            if (req.files && req.files.TeamImg) { // Check if TeamImg exists in req.files
                const { TeamImg } = req.files;
                fileName = uuid.v4() + ".jpg";
                TeamImg.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
            else{
                fileName="sema.jpg";
            }
    
            const team = await Team.create({ TeamName, TeamImg: fileName }); // Use fileName (which might be null)
            return res.json(team);
        } catch (e) {
            console.log(ApiError.badRequest(e.message));
            // It's good practice to also send an error response to the client
            return res.status(400).json({ message: "Error creating team", error: e.message });
        }
    }

    async getAll(req,res){
        let teams
        teams=await Team.findAll()
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