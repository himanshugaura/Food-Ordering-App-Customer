import type { Orders } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: Orders[] | null;
  pendingOrders: Orders[] | null;
}

const initialState: OrderState = {
  orders: null,
  pendingOrders: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Orders[] | null>) {
      state.orders = action.payload;
    },
    setPendingOrders(state , action: PayloadAction<Orders[] | null>)
    {
      state.pendingOrders = action.payload;
    }
  },
});

export const { setOrders , setPendingOrders } = orderSlice.actions;
export default orderSlice.reducer;
