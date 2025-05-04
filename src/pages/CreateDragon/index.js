import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelEditModal from '../../components/CancelEditModal';
import SecondaryHeader from '../../components/SecondaryHeader';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import { getBase64, getBase64Image } from '../../utils/base64';

import './styles.css';

function CreateDragon() {
    const { dragons, setDragons, dragonDetail, setDragonDetail } = useUser();
    const [form, setForm] = useState({
        dragonName: '',
        dragonType: '',
        dragonImage: null,
        history: ''
    });
    const [warning, setWarning] = useState('');
    const [modalCancelEditOpen, setModalCancelEditOpen] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const navigate = useNavigate();

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setWarning('');
    }

    const handleChangeInputImage = async (e) => {
        const photo = await getBase64(e.target.files[0]);
        setForm(form => ({ ...form, dragonImage: photo }));
    };

    function handleCleanForm() {
        setForm({
            dragonName: '',
            dragonType: '',
            dragonImage: '',
            history: ''
        });
        setWarning('');
    }

    useEffect(() => {
        const isNameFilled = form.dragonName?.toString().trim().length > 0;
        setFormDisabled(!isNameFilled);
    }, [form.dragonName]);

    async function handleSubmitCreateDragon(e) {
        e.preventDefault();

        if (formDisabled) return;

        try {
            const response = await api().post('/', {
                createdAt: new Date().toISOString(),
                name: form.dragonName,
                type: form.dragonType,
                imageUrl: form.dragonImage,
                histories: [form.history]
            });

            setDragons([...dragons, response.data[0]]);
            handleCleanForm();
        } catch (error) {
            setWarning(error.response.data);
            return;
        }

        setWarning('');
    }

    function handleDiscardEditiontModal() {
        handleCleanForm();
        handleCloseCancelEditModal();
    }

    function handleCloseCancelEditModal() {
        setModalCancelEditOpen(false);
    }

    return (
        <div className='container'>
            <SecondaryHeader
                pageBack={() => navigate('/')}
            />
            <form className='form-create-dragon' onSubmit={handleSubmitCreateDragon}>
                <div className='form-create-dragon__inputs'>
                    <h1>Criar novo dragão</h1>
                    <div className='form-create-dragon__inputs-fist-line'>
                        <div className='input-group'>
                            <label htmlFor='dragonName' className='label'>Nome do dragão</label>
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
                            <label htmlFor='dragonType' className='label'>Tipo do dragão</label>
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
                            <label htmlFor='history' className='label'>História do dragão</label>
                            <input
                                id='history'
                                type='text'
                                name='history'
                                value={form.history}
                                onChange={handleChangeInputValue}
                                className='input-text'
                            />
                        </div>
                    </div>
                    <div className='input-photo'>
                        <label htmlFor="dragonImage">Adicionar foto</label>
                        <label className='input-photo__label' htmlFor="dragonImage">
                            {form.dragonImage && <img
                                className='img-upload'
                                src={getBase64Image(form.dragonImage)}
                                alt='Foto do produto'
                            />}
                        </label>
                        <input id='dragonImage' type="file" onChange={handleChangeInputImage} />
                    </div>
                </div>
                <div className='form-create-dragon__btns'>
                    <button className={formDisabled ? 'button form-create-dragon__btn disabled' : 'form-create-dragon__btn transform'} type='submit'>Criar dragão</button>
                    <button className='button form-create-dragon__btn transform' type='button' onClick={() => setModalCancelEditOpen(true)}>Cancelar</button>
                </div>
            </form>
            {modalCancelEditOpen &&
                <CancelEditModal
                    discardEdition={handleDiscardEditiontModal}
                    onClose={handleCloseCancelEditModal}
                />}
        </div>
    );
}

export default CreateDragon;