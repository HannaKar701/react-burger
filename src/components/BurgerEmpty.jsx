import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

function BurgerEmpty() {
    return (
        <div class="cart cart--empty">
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Вероятней всего, вы ещё не добавили бургеры в корзину. <br />
                Чтобы заказать бургеры, перейдите на главную страницу.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link class="button button--black" to="/react-burger/">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
}

export default BurgerEmpty;
