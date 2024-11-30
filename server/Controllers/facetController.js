const {Facet} = require("../models/models")
const ApiError=require("../error/ApiError")
const {Heroes}=require("../models/models")

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
    async getAll(req,res){
        let facets
        facets=await Facet.findAll()
        return res.json(facets)
    }

    async getAllByHeroId(req, res) {
        const { HeroId } = req.params; 
            const facets = await Facet.findAll({
                where: { HeroId },
            });
    
            // Возвращаем найденные записи
            return res.json(facets);
        
    }
}

module.exports=new FacetController