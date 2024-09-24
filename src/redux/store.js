import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import burgerReducer from './slices/burgerSlice';

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        burgerReducer,
    },
});
