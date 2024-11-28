import '../HeroByAttribute/HeroByAttribute.css';
import HeroIcon from"../HeroIcon/HeroIcon.jsx"
import { Link } from 'react-router-dom';

export default function HeroByAttribute(props) {    

    var count = 0;
    if (props.text === "STRENGTH") {
        count = 32;
    } else if(props.text === "AGILITY") {
        count = 32;
    }
    else{
        count=31;
    }

    const ShowHeroes = () => {
        const heroes = [];
        for (var i = 0; i < count; i++) {
            heroes.push(<Link to="/"><HeroIcon key={i} /></Link>);
            console.log(count);
        }
        return heroes;
    }

    return (
        <div className='HeroByAttribute'>
            <div className='Attribute'>
                <img src={props.img} alt="" />
                <p>{props.text}</p>
            </div>
            <div className='Heroes'>
                {ShowHeroes()}
            </div>
        </div>
    );
}