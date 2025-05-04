import './styles.css';

export default function DragonCard({ dragonImage, dragonName, dragonId, openDeleteModal }) {

    return (
        <div className="card">
            <img className='card__img' src={dragonImage} alt="Imagem do rpoduto" />
            <span className='card__name'>{dragonName}</span>
            <div className='card__buttons' onClick={(e) => { e.stopPropagation() }}>
                <button className="button">Editar</button>
                <button className="button" onClick={() => openDeleteModal(dragonId)}>Remover</button>
            </div>
        </div>
    );
}