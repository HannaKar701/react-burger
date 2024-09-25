import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 1,
    sortType: {
        name: 'популярности',
        sortProperty: 'rating',
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setPageCount(state, action) {
            state.pageCount = action.payload;
        },
        setFilters(state, action) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.pageCount = Number(action.payload.pageCount);
                state.sortType = action.payload.sortType;
            } else {
                state.categoryId = 0;
                state.pageCount = 1;
                state.sortType = {
                    name: 'популярности',
                    sortProperty: 'rating',
                };
            }
        },
    },
});

export const { setCategoryId, setSearchValue, setSortType, setPageCount, setFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
