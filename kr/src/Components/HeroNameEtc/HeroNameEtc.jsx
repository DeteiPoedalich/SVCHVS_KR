import { useEffect, useState } from 'react';
import Facets from "../Facets/Facets"
import "./HeroNameEtc.css"


const HeroNameEtc = ({heroId}) => {
    const [hero, setHero] = useState(null);  // Состояние для данных героя
    const [loading, setLoading] = useState(true);  // Состояние загрузки
    const [error, setError] = useState(null);  // Состояние ошибки
    useEffect(() => {
        if (!heroId) { 
            console.error('Hero is not provided');
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const loadedHero = await fetch(process.env.REACT_APP_API_URL+`api/heroes/${heroId}`);
                const data = await loadedHero.json();  
                setHero(data);  // Устанавливаем данные героя в состояние
            } catch (error) {
                console.error("Ошибка при загрузке героя:", error);
                setError("Не удалось загрузить данные о герое"); 
            } finally {
                setLoading(false);  // Завершаем загрузку
            }
        };
            fetchData();  // Запрашиваем данные только если heroId есть
    }, [heroId]);  // Эффект срабатывает при изменении heroId
    if (loading) return <div>Loading...</div>;  // Отображаем индикатор загрузки
    if (error) return <div>{error}</div>;  // Отображаем ошибку, если она произошла
    if (!hero) return <div>Hero not found</div>;  // Если данных нет, отображаем ошибку
    let fileName;
    if(hero.Attribute==="Strength"){
        fileName=process.env.REACT_APP_API_URL+"hero_strength.png"
    }
    else if(hero.Attribute==="Agility"){
        fileName=process.env.REACT_APP_API_URL+"hero_agility.png"
    }
    else if(hero.Attribute==="Intelligence"){
        fileName=process.env.REACT_APP_API_URL+"hero_intelligence.png"
    }
    else if(hero.Attribute==="Universal"){
        fileName=process.env.REACT_APP_API_URL+"hero_universal.png"
    }
    let HeroDifficulty1,HeroDifficulty2,HeroDifficulty3
    if(hero.Difficulty===1){
        HeroDifficulty1=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty2=process.env.REACT_APP_API_URL+"Frame_117.png"
        HeroDifficulty3=process.env.REACT_APP_API_URL+"Frame_117.png"
    }
    else if(hero.Difficulty===2){
        HeroDifficulty1=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty2=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty3=process.env.REACT_APP_API_URL+"Frame_117.png"
    }
    else if(hero.Difficulty===3){
        HeroDifficulty1=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty2=process.env.REACT_APP_API_URL+"Rectangle_1.png"
        HeroDifficulty3=process.env.REACT_APP_API_URL+"Rectangle_1.png"
    }

    let AttackTypeImg
    if(hero.AttackType==="Melee")
    {
        AttackTypeImg=process.env.REACT_APP_API_URL+"melee.svg"
    }
    else{
        AttackTypeImg=process.env.REACT_APP_API_URL+"ranged.svg"
    }

    return (
        <div className="HeroById">
            <div className="HeroInfo">
                <div className='pupup'>
                    <h1 className='HeroName'>{hero.HeroName}</h1>
                    <div className='HeroIcons'>
                        <img className='AttributeImg' src={fileName} alt="" />
                        <div className='difficulty'>
                            <img src={HeroDifficulty1} alt="" />
                            <img src={HeroDifficulty2} alt="" />
                            <img src={HeroDifficulty3} alt="" />
                        </div>
                        <div className='attacktype'>
                            <p>Attack Type: </p>
                            <img src={AttackTypeImg} alt="" />
                        </div>
                    </div>
                    <Facets heroId={parseInt(heroId)}/>
                </div>
                <div className='HeroStats'>
                    <div className='stats'>                    
                        <div className='fullstat'>
                            <p className='statname'>STRENGTH</p>
                            <div className='stat'>
                                <img src={process.env.REACT_APP_API_URL+"hero_strength.png"} alt="" />
                                <p>{hero.Strength}+{hero.StrengthPlus}</p>   
                            </div>
                        </div>
                        <div className='fullstat'>
                            <p className='statname'>AGILITY</p>
                            <div className='stat'>
                                <img src={process.env.REACT_APP_API_URL+"hero_agility.png"} alt="" />
                                <p>{hero.Agility}+{hero.AgilityPlus}</p>
                            </div>
                            
                        </div>            
                        <div className='fullstat'>
                            <p className='statname'>INTELLIGENCE</p>
                            <div className='stat'>
                                <img src={process.env.REACT_APP_API_URL+"hero_intelligence.png"} alt="" />
                                <p>{hero.Intelligence}+{hero.IntelligencePlus}</p>
                            </div>
                            
                        </div>                      
                    </div>
                    <div className='healthnmana'>
                        <p className='healttext'>Health</p>
                        <div className='HealthBar'>
                            <p>{hero.Health}</p>
                            <p className='healthplus'>+{hero.HealthPlus}</p>
                        </div>
                        <p className='healttext'>Mana</p>
                        <div className='ManaBar'>
                            <p>{hero.Mana}</p>
                            <p className='healthplus'>+{hero.ManaPlus}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroNameEtc;
