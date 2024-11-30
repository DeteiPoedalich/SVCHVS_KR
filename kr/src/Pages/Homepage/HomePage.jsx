import HeaderComp from '../../Components/HeaderComp/HeaderComp'
import Navigation from '../../Components/Navigation/Navigation'
import GetStarted from '../../Components/GetStarted/GetStarted'
import "./homepage.css"

export default function HomePage(){
    return(
        <>
            <HeaderComp />
            <Navigation/>
            <GetStarted/>
        </>
    )
}