import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnavailableImage from '../../assets/unavailable_image.jpg';
import DragonCard from '../../components/DragonCard';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function Main() {
    const { dragons, setDragonDetail } = useUser();
    const navigate = useNavigate();
    const [paginationParam, setPaginationParam] = useState({});
    const paginationLimit = 8;

    async function handleDragonDetail(dragonId) {
        try {
            const product = await api().get(`/${dragonId}`);
            setDragonDetail(product.data);
        } catch (error) {
            return;
        }
        navigate(`/dragon/${dragonId}`)
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
                            />
                        </div>
                    ))}
                </div>
                <button className="button main__add-button cursor-pointer transform" onClick={() => navigate('/create-dragon')}>Adicionar novo dragão</button>

            </main>
        </div>
    );
}

export default Main;