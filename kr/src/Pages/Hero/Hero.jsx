import HeaderComp from '../../Components/HeaderComp/HeaderComp'
import Navigation from '../../Components/Navigation/Navigation'
import HeroInfomation from '../../Components/HeroInformation/HeroInformation'

export default function Hero(){
    return(
        <>
            <HeaderComp />
            <div className='Hero'>
                <Navigation/>
                <div>
                    <HeroInfomation/>
                </div>
            </div>
        </>
    )
}