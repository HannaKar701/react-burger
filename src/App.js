import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import BurgerPage from './pages/BurgerPage';

import './scss/app.scss';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/react-burger/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/react-burger/cart" element={<Cart />} />
                    <Route path="/react-burger/burger/:id" element={<BurgerPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
