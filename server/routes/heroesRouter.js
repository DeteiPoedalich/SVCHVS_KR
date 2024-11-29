const Router = require('express')
const router = new Router()
const HeroesController= require("../Controllers/heroesController")

router.post('/',HeroesController.create)
router.get('/',HeroesController.getAll)
router.get('/:HeroId',HeroesController.getOne)

module.exports=router