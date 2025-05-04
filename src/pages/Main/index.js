import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnavailableImage from '../../assets/unavailable_image.jpg';
import DeleteDragonModal from '../../components/DeleteDragonModal';
import DragonCard from '../../components/DragonCard';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function Main() {
    const { dragons, setDragons, dragonDetail, setDragonDetail } = useUser();
    const navigate = useNavigate();
    const [dragonKey, setDragonKey] = useState(null);
    const [modalDeleteDragonOpen, setModalDeleteDragonOpen] = useState(false);

    async function handleDragonDetail(dragonId) {
        try {
            const product = await api().get(`/${dragonId}`);
            console.log(product.data)
            setDragonDetail(product.data);
        } catch (error) {
            return;
        }
        navigate(`/dragon/${dragonId}`)
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
            console.log(error.response.data)
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
                    {dragons?.map((dragon) => (
                        <div className='cursor-pointer' key={dragon.id} onClick={() => handleDragonDetail(dragon.id)}>
                            <DragonCard
                                dragonImage={dragon.imageUrl || UnavailableImage}
                                dragonName={dragon.name}
                                dragonId={dragon.id}
                                openDeleteModal={handleOpenDeleteModal}
                            />
                        </div>
                    ))}
                </div>
                <button className="button main__add-button cursor-pointer transform" onClick={() => navigate('/create-dragon')}>Adicionar novo dragão</button>
            </main>
            {modalDeleteDragonOpen &&
                <DeleteDragonModal
                    dragonName={dragonDetail.name}
                    onSubmit={handleSubmitDeleteProduct}
                    closeDeleteModal={handleCloseDeleteModal}
                />}
        </div>
    );
}

export default Main;