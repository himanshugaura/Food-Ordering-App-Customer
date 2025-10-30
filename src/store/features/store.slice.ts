import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
  isOpen: boolean;
}

const initialState: StoreState = {
  isOpen: true,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setStatus } = storeSlice.actions;
export default storeSlice.reducer;
