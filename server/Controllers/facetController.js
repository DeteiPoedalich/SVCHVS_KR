const {Facet} = require("../models/models")
const ApiError=require("../error/ApiError")

class FacetController{
    async create(req,res){
        try{
            const {HeroId,FacetName,FacetDescription}=req.body
            const facet=await Facet.create({HeroId,FacetName,FacetDescription})
            return res.json(facet)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
        
    }


    async getOne(req,res){
        const {FacetId}=req.params
        const facet= await Facet.findOne(
            {
                where:{FacetId},
            },
        )
        return res.json(facet)
    }
}

module.exports=new FacetController