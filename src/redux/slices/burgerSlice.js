import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
    'burgers/fetchBurgers',
    async ({ category, sort, order, search, pageCount }) => {
        let { data } = await axios.get(
            `https://65fdb143b2a18489b3854828.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`,
        );
        return data;
    },
);

export const fetchItem = createAsyncThunk('burgers/fetchBurger', async (id) => {
    let { data } = await axios.get(`https://65fdb143b2a18489b3854828.mockapi.io/items/${id}`);
    return data;
});

const initialState = {
    item: {
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
        sizes: [],
        types: [],
    },
    items: [],
    status: 'loading',
};

const burgerSlice = createSlice({
    name: 'burgers',
    initialState,
    reducers: {
        setItems(state, action) {
            state.burgers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchItems.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            })
            .addCase(fetchItem.pending, (state) => {
                state.status = 'loading';
                state.item = {
                    title: '',
                    description: '',
                    price: 0,
                    imageUrl: '',
                    sizes: [],
                    types: [],
                };
            })
            .addCase(fetchItem.fulfilled, (state, action) => {
                state.item = action.payload;
                state.status = 'success';
            })
            .addCase(fetchItem.rejected, (state) => {
                state.status = 'error';
                state.item = {
                    title: '',
                    description: '',
                    price: 0,
                    imageUrl: '',
                    sizes: [],
                    types: [],
                };
            });
    },
});

export const { setItems } = burgerSlice.actions;

export default burgerSlice.reducer;
