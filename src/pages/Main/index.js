import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnavailableImage from '../../assets/unavailable_image.jpg';
import DeleteDragonModal from '../../components/DeleteDragonModal';
import DragonCard from '../../components/DragonCard';
import EditDragonModal from '../../components/EditDragonModel';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function Main() {
    const { dragons, setDragons, setDragonDetail } = useUser();
    const [dragonKey, setDragonKey] = useState(null);
    const [modalDeleteDragonOpen, setModalDeleteDragonOpen] = useState(false);
    const [modalEditDragonOpen, setModalEditDragonOpen] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [form, setForm] = useState({
        createdAt: '',
        dragonName: '',
        dragonType: '',
        dragonImage: '',
        history: ''
    });

    const navigate = useNavigate();

    async function handleDragonDetail(dragonId) {
        try {
            const dragon = await api().get(`/${dragonId}`);
            setDragonDetail(dragon.data);
        } catch (error) {
            return;
        }
        navigate(`/dragon/${dragonId}`)
    }

    async function handleOpenEditModal(key) {
        try {
            const dragon = await api().get(`/${key}`);
            setDragonKey(key)
            setForm({
                createdAt: dragon.data.dragonDetail,
                dragonName: dragon.data.name || '',
                dragonType: dragon.data.type || '',
                dragonImage: dragon.data.imageUrl || '',
                history: dragon.data.histories || ''
            });
            setModalEditDragonOpen(true);
        } catch (error) {
            return;
        }
    }

    function handleCloseEditModal() {
        setModalEditDragonOpen(false);
    }

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleCleanForm() {
        setForm({
            dragonName: '',
            dragonType: '',
            dragonImage: '',
            history: ''
        });
    }

    async function handleSubmitEditDragon(e) {
        e.preventDefault();

        if (formDisabled) return;

        try {
            const payload = {
                createdAt: form.createdAt,
                name: form.dragonName,
                type: form.dragonType,
                histories: form.history
                    ? form.history.split(',').map(item => item.trim()).filter(Boolean)
                    : []
            };

            if (form.dragonImage) {
                payload.imageUrl = form.dragonImage;
            }

            const response = await api().put(`/${dragonKey}`, payload);

            const indexDragon = dragons.findIndex((dragon) => dragon.id === response.data.id);
            dragons[indexDragon] = response.data;

            setDragons([...dragons]);
            handleCleanForm();
            handleCloseEditModal()
        } catch (error) {
            console.log(error)
            return;
        }
    }

    function handleOpenDeleteModal(key) {
        setDragonKey(key)
        setModalDeleteDragonOpen(true);
    }

    function handleCloseDeleteModal() {
        setModalDeleteDragonOpen(false);
    }

    async function handleSubmitDeleteProduct(e) {
        e.preventDefault();

        try {
            await api().delete(`/${dragonKey}`);

            const indexDragon = dragons.findIndex((dragon) => dragon.id === dragonKey);
            dragons.splice(indexDragon, 1);

            setDragons([...dragons]);

        } catch (error) {
            console.log(error)
            return;
        }
        setModalDeleteDragonOpen(false)
    }

    return (
        <div className='container'>
            <header className='header'>
                <h1 className='header-title'>Dragons</h1>
            </header>
            <main className='main'>
                <div className='main__dragons'>
                    {dragons && dragons.length > 0 ?
                        (dragons.map((dragon) => (
                            <div className='cursor-pointer' key={dragon.id} onClick={() => handleDragonDetail(dragon.id)}>
                                <DragonCard
                                    dragonImage={dragon.imageUrl || UnavailableImage}
                                    dragonName={dragon.name}
                                    dragonId={dragon.id}
                                    openDeleteModal={handleOpenDeleteModal}
                                    openEditModal={handleOpenEditModal}
                                />
                            </div>
                        ))
                        ) : (<p>Nenhum dragão cadastrado</p>)
                    }
                </div>
                <button className="button main__add-button cursor-pointer transform" onClick={() => navigate('/create-dragon')}>Adicionar novo dragão</button>
            </main>
            {modalDeleteDragonOpen &&
                <DeleteDragonModal
                    onSubmit={handleSubmitDeleteProduct}
                    closeDeleteModal={handleCloseDeleteModal}
                />}
            {modalEditDragonOpen &&
                <EditDragonModal
                    form={form}
                    formDisabled={formDisabled}
                    setFormDisabled={setFormDisabled}
                    handleSubmitEditDragon={handleSubmitEditDragon}
                    handleCloseEditModal={handleCloseEditModal}
                    handleChangeInputValue={handleChangeInputValue}
                />}
        </div>
    );
}

export default Main;