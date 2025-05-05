import { useEffect, useState } from 'react';
import api from '../services/api';

function useUserProvider() {
    const [dragons, setDragons] = useState([]);
    const [dragonDetail, setDragonDetail] = useState([]);

    useEffect(() => {
        api().get('/').then((response) => {
            const sortedData = response.data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setDragons(sortedData);
        }).catch((error) => {
            console.error(error)
            return;
        });
        return;
    }, []);

    return {
        dragons,
        setDragons,
        dragonDetail,
        setDragonDetail
    }
}

export default useUserProvider;