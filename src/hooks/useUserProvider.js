import { useEffect, useState } from 'react';
import api from '../services/api';

function useUserProvider() {
    // const [token, setToken, removeToken] = useLocalStorage('token');
    // const [userId, setUserId, removeUserId] = useLocalStorage('userId');
    // const [storeName, setStoreName, removeStoreName] = useLocalStorage('storeName');
    const [dragons, setDragons] = useState([]);
    const [dragonDetail, setDragonDetail] = useState([]);

    useEffect(() => {
        api().get('/').then((response) => {
            const sortedData = response.data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setDragons(response.data);
        }).catch((error) => {
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