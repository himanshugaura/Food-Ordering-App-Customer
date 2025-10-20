import type { Category, Product } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[] | null;
  categories: Category[] | null;
}

const initialState: ProductState = {
  products: null,
  categories: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[] | null>) {
      state.products = action.payload;
    },
    setCategories(state , action: PayloadAction<Category[] | null>)
    {
      state.categories = action.payload;
    }
  },
});

export const { setProducts , setCategories } = productSlice.actions;
export default productSlice.reducer;
