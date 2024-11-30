
import HeroNameEtc from "../HeroNameEtc/HeroNameEtc";
import { useParams } from 'react-router-dom';

export default function HeroInfomation(){
    const { HeroId } = useParams();
    
    console.log('Hero ID from URL:', HeroId); 
    return(
        <>           
            <div className='HeroInformation'>
                <HeroNameEtc heroId={parseInt(HeroId)}/>
                
            </div>
        </>
    )
}