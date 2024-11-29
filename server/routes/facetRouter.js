const Router = require('express')
const router = new Router()
const facetController=require("../Controllers/facetController")

router.post('/',facetController.create)
router.get('/:FacetId',facetController.getOne)

module.exports=router