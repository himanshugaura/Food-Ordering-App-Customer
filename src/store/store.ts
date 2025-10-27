import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth.slice';
import storeReducer from './features/store.slice';
import productReducer from './features/product.slice';
import cartReducer from './features/cart.slice';
import orderReducer from './features/orders.slice';

export const store = configureStore({
  reducer: {
    auth : userReducer,
    store: storeReducer,
    product: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;