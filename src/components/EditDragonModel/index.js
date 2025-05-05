import { useEffect } from 'react';
import './styles.css';


function EditDragonModel({ form, formDisabled, setFormDisabled, handleSubmitEditDragon, handleCloseEditModal, handleChangeInputValue }) {

    useEffect(() => {
        const isNameFilled = form.dragonName?.toString().trim().length > 0;
        setFormDisabled(!isNameFilled);
    }, [form.dragonName]);

    return (
        <div className='modal-backdrop'>
            <form className='form-edit-dragon' onSubmit={handleSubmitEditDragon}>
                <div className='form-edit-dragon__inputs'>
                    <h1>Editar dragão</h1>
                    <div className='form-edit-dragon__inputs-fist-line'>
                        <div className='input-group'>
                            <label htmlFor='dragonName' className='label'>Nome</label>
                            <input
                                id='dragonName'
                                type='text'
                                name='dragonName'
                                value={form.dragonName}
                                onChange={handleChangeInputValue}
                                className='input-text'
                            />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='dragonType' className='label'>Tipo</label>
                            <input
                                id='dragonType'
                                type='text'
                                name='dragonType'
                                value={form.dragonType}
                                onChange={handleChangeInputValue}
                                className='input-text'
                            />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='history' className='label'>História</label>
                            <input
                                id='history'
                                type='text'
                                name='history'
                                value={form.history}
                                onChange={handleChangeInputValue}
                                className='input-text'
                            />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='dragonImage' className='label'>Imagem</label>
                            <input
                                id='dragonImage'
                                type='text'
                                name='dragonImage'
                                value={form.dragonImage}
                                onChange={handleChangeInputValue}
                                className='input-text'
                                placeholder='Link da imagem'
                            />
                            <label className='input-photo__label' htmlFor="dragonImage">
                                {form.dragonImage && <img
                                    className='img-upload'
                                    src={form.dragonImage}
                                    alt='Imagem do dragão'
                                />}
                            </label>
                        </div>
                    </div>
                </div>
                <div className='form-edit-dragon__btns'>
                    <button
                        className={formDisabled ? 'button form-edit-dragon__btn disabled' : 'button form-edit-dragon__btn transform'}
                        type='submit'
                        disabled={formDisabled}>
                        Salvar Alterações
                    </button>
                    <button
                        className='button form-edit-dragon__btn transform'
                        type='button'
                        onClick={handleCloseEditModal}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditDragonModel;