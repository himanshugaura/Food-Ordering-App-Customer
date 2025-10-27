import type { OrderItem, Product } from "@/types/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CartState {
  CartItems: OrderItem[];
}

const initialState: CartState = {
  CartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const existingItem = state.CartItems.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.CartItems.push({ product, quantity: 1 });
      }

      const lsData = state.CartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(lsData));
      toast.success("Added to cart");
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.CartItems.find(
        (cartItem) => cartItem.product._id === action.payload
      );
      if (item) {
        item.quantity += 1;
        const lsData = state.CartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        }));
        localStorage.setItem("cart", JSON.stringify(lsData));
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.CartItems.find(
        (cartItem) => cartItem.product._id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const lsData = state.CartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        }));
        localStorage.setItem("cart", JSON.stringify(lsData));
      }
    },

    removeCartItem(state, action: PayloadAction<string>) {
      state.CartItems = state.CartItems.filter(
        (cartItem) => cartItem.product._id !== action.payload
      );
      const lsData = state.CartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(lsData));
    },

    setCart(state, action: PayloadAction<OrderItem[]>) {
      state.CartItems = action.payload;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeCartItem, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
