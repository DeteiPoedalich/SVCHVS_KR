import '../HeroIcon/HeroIcon.css';

export default function HeroIcon(props) {
    const { hero } = props;
    const imageUrl = `http://localhost:5000/${hero.HeroImg}`; // Формирование URL

    return (
        <div className='HeroIcon'>
            <img src={imageUrl} alt={hero.HeroName} />
        </div>
    );
}