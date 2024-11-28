import HeaderComp from '../Components/HeaderComp/HeaderComp'
import HeroByAttribute from '../Components/HeroByAttribute/HeroByAttribute'
import "../Pages/Heroes.css"

export default function Heroes(){
    return(
        <>
            <HeaderComp />
            <main>
                <HeroByAttribute text="STRENGTH" img="img/hero_strength.png"/>
                <HeroByAttribute text="AGILITY" img="img/hero_agility.png"/>
                <HeroByAttribute text="INTELLIGENCE" img="img/hero_intelligence.png"/>
                <HeroByAttribute text="UNIVERSAL" img="img/hero_universal.png"/>
            </main>
        </>
    )
}