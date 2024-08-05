import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import BurgerBlock from '../components/BurgerBlock/index';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';

const Home = () => {
    const { searchValue } = useContext(SearchContext);

    const categoryId = useSelector((state) => state.filterReducer.categoryId);
    const sortType = useSelector((state) => state.filterReducer.sortType);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sort = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(
            `https://65fdb143b2a18489b3854828.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`,
        )
            .then((res) => {
                if (!res.ok) {
                    setItems([]);
                    setLoading(false);
                    throw new Error('Ошибка при запросе к API');
                }
                return res.json();
            })
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        window.scrollTo(0, 0);
    }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

    const burgers = items.map((burger) => <BurgerBlock key={uuidv4()} {...burger} />);
    const skeletons = [...new Array(6)].map(() => <Skeleton key={uuidv4()} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => dispatch(setCategoryId(id))}
                />
                <Sort value={sortType} onClickSort={(obj) => dispatch(setSortType(obj))} />
            </div>
            <h2 className="content__title">Каталог бургеров</h2>
            <div className="content__items">{isLoading ? skeletons : burgers}</div>
            <Pagination page={currentPage} onChangePage={setCurrentPage} />
        </div>
    );
};

export default Home;
