import HeaderComp from '../../Components/HeaderComp/HeaderComp'
import HeroByAttribute from '../../Components/HeroByAttribute/HeroByAttribute'
import "./Heroes.css"

export default function Heroes(){
    return(
        <>
            <HeaderComp />
            <div className='AllHeroes'>
                <HeroByAttribute text="STRENGTH" img="http://localhost:5000/hero_strength.png"/>
                <HeroByAttribute text="AGILITY" img="http://localhost:5000/hero_agility.png"/>
                <HeroByAttribute text="INTELLIGENCE" img="http://localhost:5000/hero_intelligence.png"/>
                <HeroByAttribute text="UNIVERSAL" img="http://localhost:5000/hero_universal.png"/>
            </div>
        </>
    )
}