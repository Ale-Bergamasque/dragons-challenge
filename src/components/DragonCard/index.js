import './styles.css';

export default function DragonCard({ dragonImage, dragonName }) {

    return (
        <div className="card transform">
            <img className='card__img' src={dragonImage} alt="Imagem do rpoduto" />
            <span className='card__name'>{dragonName}</span>
            <div className='card__buttons'>
                <button className="button">Editar</button>
                <button className="button">Remover</button>
            </div>
        </div>
    );
}