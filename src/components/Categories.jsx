import { v4 as uuidv4 } from 'uuid';

function Categories({ value, onClickCategory }) {
    const categories = [
        'Все',
        'Комбо',
        'Бургеры из свинины',
        'Бургеры из говядины',
        'Бургеры из индейки',
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => {
                    return (
                        <li
                            className={value === index ? 'active' : ''}
                            onClick={() => onClickCategory(index)}
                            key={uuidv4()}>
                            {categoryName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Categories;
