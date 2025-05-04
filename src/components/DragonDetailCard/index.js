import './styles.css';

export default function DragonDetailCard({ dragonImage, dragonName, dragonCreateDate, dragonType }) {

    return (
        <div className="card">
            <img className='card__img' src={dragonImage} alt="Imagem do rpoduto" />
            <span className='card__name'>{dragonName}</span>
            <span>{dragonCreateDate}</span>
            <span>{dragonType}</span>
        </div>
    );
}