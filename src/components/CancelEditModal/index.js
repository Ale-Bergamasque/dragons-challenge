import './styles.css';

function CancelEditModal({ discardEdition, onClose }) {

    return (
        <div className='modal-backdrop'>
            <div className='modal-cancel-edit' >
                <h1>Tem certeza que deseja descartar as alterações?</h1>
                <div className='modal-cancel-edit__btns'>
                    <button className='button btn-edit transform' type='button' onClick={discardEdition}>Sim</button>
                    <button className='button btn-edit transform' type='button' onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
}

export default CancelEditModal;   