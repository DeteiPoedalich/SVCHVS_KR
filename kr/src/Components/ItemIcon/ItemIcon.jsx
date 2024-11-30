import './ItemIcon.css';

export default function ItemIcon(props) {
    const { item } = props;
    const imageUrl = `http://localhost:5000/${item.ItemImg}`; // Формирование URL

    return (
        <div className='ItemIcon'>
            <img src={imageUrl} alt={item.ItemName} />
        </div>
    );
}