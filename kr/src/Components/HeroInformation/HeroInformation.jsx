
import HeroNameEtc from "../HeroNameEtc/HeroNameEtc";
import { useParams } from 'react-router-dom';
import Skills from "../Skills/Skills"
import SkillBuild from "../SkillBuild/SkillBuild";
import ItemBuild from "../ItemBuild/ItemBuild";

export default function HeroInfomation(){
    const { HeroId } = useParams();
    console.log('Hero ID from URL:', HeroId); 
    return(
        <>           
            <div className='HeroInformation'>
                <HeroNameEtc heroId={parseInt(HeroId)}/>
                <Skills heroId={parseInt(HeroId)} className1="SkillsForDisplay" className2="SkillForDisplay"/>
                <SkillBuild buildId={parseInt(HeroId)}/>               
            </div>
        </>
    )
}