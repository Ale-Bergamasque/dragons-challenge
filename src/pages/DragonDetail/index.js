import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnavailableImage from '../../assets/unavailable_image.jpg';
import DragonDetailCard from '../../components/DragonDetailCard';
import SecondaryHeader from '../../components/SecondaryHeader';
import useUser from '../../hooks/useUser';
import './styles.css';

function DragonDetail() {
    const { dragonDetail } = useUser();
    const [formattedDate, setFormattedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const createdDate = new Date(dragonDetail.createdAt).toLocaleDateString("pt-BR");
        setFormattedDate(createdDate);
    });

    return (
        <div className='container'>
            <SecondaryHeader
                pageBack={() => navigate('/')}
            />
            <main className='main'>
                <div className='main__dragons'>
                    <DragonDetailCard
                        dragonImage={dragonDetail.imageUrl || UnavailableImage}
                        dragonName={dragonDetail.name}
                        dragonCreateDate={formattedDate}
                        dragonType={dragonDetail.type.trim() || '-'}
                    />
                </div>
            </main>
        </div>
    );
}

export default DragonDetail;