import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import BurgerPage from './pages/BurgerPage';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="react-burger/" element={<Home />} />
                <Route path="react-burger/cart" element={<Cart />} />
                <Route path="react-burger/burger/:id" element={<BurgerPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
