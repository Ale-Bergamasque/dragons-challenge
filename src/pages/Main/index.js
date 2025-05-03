import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import DragonCard from '../../components/DragonCard';
import UnavailableImage from '../../assets/unavailable_image.jpg';
import './styles.css';

function Main() {
    const { dragons } = useUser();
    const navigate = useNavigate();
    const [paginationParam, setPaginationParam] = useState({});
    const paginationLimit = 8;

    // useEffect(() => {
    //     handlePagination(1)
    // }, [productSearch]);

    // function handlePagination(page) {
    //     setPaginationParam({
    //         start: (page - 1) * paginationLimit,
    //         end: page * paginationLimit
    //     });
    // }

    // function handleReturnProductWithoutFilter() {
    //     setProductSearch(products);
    // }

    // function handleNavigate(path) {
    //     token ? navigate(`/${path}`) : navigate('/login');
    // }

    // function handleFilter(e) {
    //     if (e.key !== 'Enter') {
    //         return;
    //     }

    //     let search = e.target.value;

    //     if (!search || search.trim() === '') {
    //         setProductSearch(products);
    //         return;
    //     }

    //     const productsFilter = products?.filter(product => {
    //         return product?.product_name.toLowerCase().includes(search.toLowerCase());
    //     });
    //     setProductSearch(productsFilter);

    //     e.target.value = ''
    // }

    // async function handleProrductDetail(productId) {
    //     try {
    //         const product = await api().get(`/products/${productId}`);
    //         setProductDetail(product.data);

    //     } catch (error) {
    //         return;
    //     }
    //     navigate(`/produto/${productId}`)
    // }

    // function handleLogoff() {
    //     setToken('');
    //     setUserId('');
    //     setStoreName('');
    // }

    return (
        <div className='container'>
            <header className='header'>
                <h1 className='header-title'>Dragons</h1>
            </header>
            <main className='main'>
                <div className='main__dragons'>
                        {dragons?.map((dragon) => (
                            <div className='cursor-pointer' key={dragon.id}>
                                <DragonCard
                                    dragonImage={dragon.imageUrl || UnavailableImage}
                                    dragonName={dragon.name}
                                />
                            </div>
                        ))}
                </div>
                <button className="button main__add-button cursor-pointer transform">Adicionar dragão</button>

            </main>
        </div>
    );
}

export default Main;