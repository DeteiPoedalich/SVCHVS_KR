const {Item} = require("../models/models")
const ApiError=require("../error/ApiError")
const uuid =require("uuid")
const path=require("path")

class ItemController{
    async create(req,res){
        try{
            const {ItemName,ItemDescription,ItemType,ItemType2}=req.body
            const {ItemImg}=req.files
            let fileName=uuid.v4()+".jpg"
            ItemImg.mv(path.resolve(__dirname,'..','static',fileName))

            const item=await Item.create({ItemName,ItemDescription,ItemType,ItemType2,ItemImg:fileName})
            return res.json(item)
        }
        catch(e){
            console.log(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){
        let items
        items=await Item.findAll()
        return res.json(items)
    }
    async getOne(req,res){
        const {ItemId}=req.params
        const item= await Item.findOne(
            {
                where:{ItemId},
            },
        )
        return res.json(item)
    }
}

module.exports=new ItemController()