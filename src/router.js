import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

import CreateDragon from './pages/CreateDragon';
import DragonDetail from './pages/DragonDetail';


function MainRouter() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/dragon/:id' element={<DragonDetail />} />
            <Route path='/create-dragon' element={<CreateDragon />} />
        </Routes>
    );
}

export default MainRouter;