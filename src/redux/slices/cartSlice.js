import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem && action.payload.count > 1) {
                findItem.count--;
                state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
            }
        },
        removeItem(state, action) {
            if (window.confirm('Вы точно хотите удалить бургер из корзины?')) {
                state.items = state.items.filter((obj) => obj.id !== action.payload);
                state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
            }
        },
        clearItems(state) {
            if (window.confirm('Вы точно хотите очистить корзину?')) {
                state.items = [];
                state.totalPrice = 0;
            }
        },
    },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
