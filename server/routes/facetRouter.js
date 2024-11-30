const Router = require('express')
const router = new Router()
const facetController=require("../Controllers/facetController")

router.post('/',facetController.create)
router.get('/',facetController.getAll)
router.get('/:HeroId',facetController.getAllByHeroId)

module.exports=router