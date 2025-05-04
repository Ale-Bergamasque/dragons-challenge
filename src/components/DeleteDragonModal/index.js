import './styles.css';

function DeleteDragonModal({ onSubmit, closeDeleteModal }) {

    return (
        <div className='modal-backdrop'>
            <div className='modal-delete-edit' >
                <h1>Tem certeza que deseja excluir permanentemente este dragão ?</h1>
                <form className='modal-delete-edit__btns' onSubmit={onSubmit}>
                    <button className='button btn-delete transform' type='submit'>Excluir</button>
                    <button className='button btn-delete transform' type='button' onClick={closeDeleteModal}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}

export default DeleteDragonModal;   