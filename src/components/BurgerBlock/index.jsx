import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, cartItemByIdSelector } from '../../redux/slices/cartSlice';

export const typeNames = ['цельнозерновая булочка', 'белая булочка'];

function BurgerBlock({ id, title, description, price, imageUrl, sizes, types }) {
    const dispatch = useDispatch();

    const cartItem = useSelector(cartItemByIdSelector(id));
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);
    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
        };
        dispatch(addItem(item));
    };

    return (
        <div className="burger-block">
            <Link to={`/react-burger/burger/${id}`}>
                <img className="burger-block__image" src={imageUrl} alt="Burger" />
                <h4 className="burger-block__title">{title}</h4>
                <p className="burger-block__description">{description}</p>
            </Link>
            <div className="burger-block__selector">
                <ul>
                    {types.map((typeId, index) => (
                        <li
                            key={uuidv4()}
                            onClick={() => setActiveType(typeId)}
                            className={activeType === index ? 'active' : ''}>
                            {typeNames[typeId]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, index) => (
                        <li
                            key={uuidv4()}
                            onClick={() => setActiveSize(index)}
                            className={activeSize === index ? 'active' : ''}>
                            {size}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="burger-block__bottom">
                <div className="burger-block__price">от {price} ₽</div>
                <button className="button button--outline button--add" onClick={onClickAdd}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{addedCount}</i>
                </button>
            </div>
        </div>
    );
}

export default BurgerBlock;
