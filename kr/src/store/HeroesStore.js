
export class HeroesStore{
    constructor(){
        this._heroes=[]
    }
    setHeroes(heroes){
        this._heroes=heroes
    }
    getHeroes(){
        return this._heroes
    }
}