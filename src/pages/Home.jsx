import { useState, useEffect, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { popUpList } from '../components/Sort';
import BurgerBlock from '../components/BurgerBlock/index';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sortType, pageCount } = useSelector((state) => state.filterReducer);

    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const onChangePage = (num) => {
        dispatch(setPageCount(num));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.slice(1));
            const sortType = popUpList.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sortType,
                }),
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sort = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        if (!isSearch.current) {
            fetch(
                `https://65fdb143b2a18489b3854828.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`,
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
        }
        isSearch.current = false;
    }, [categoryId, sortType.sortProperty, searchValue, pageCount]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                pageCount,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType.sortProperty, pageCount, navigate]);

    const burgers = items.map((burger) => <BurgerBlock key={uuidv4()} {...burger} />);
    const skeletons = [...new Array(6)].map(() => <Skeleton key={uuidv4()} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => dispatch(setCategoryId(id))}
                />
                <Sort />
            </div>
            <h2 className="content__title">Каталог бургеров</h2>
            <div className="content__items">{isLoading ? skeletons : burgers}</div>
            <Pagination page={pageCount} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
