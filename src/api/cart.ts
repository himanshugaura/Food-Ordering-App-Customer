import { ProductEndpoints } from "./apis";
import { apiConnector } from "@/utils/apiConnector";
import { AppDispatch } from "@/store/store";
import { setCart } from "@/store/features/cart.slice";
import type { Product, CartItem } from "@/types/type";

export const fetchCart =
  () =>
  async (): Promise<Array<{ productId: string; quantity: number }> | null> => {
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        return JSON.parse(cartData);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      return null;
    }
  };

export const getProductsByCart =
  () =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const cart = await dispatch(fetchCart());
      if (!cart || cart.length === 0) return false;

      const productIds = cart.map((item) => item.productId);

      const res = await apiConnector(
        "POST",
        ProductEndpoints.GET_PRODUCTS_BY_IDS,
        { productIds }
      );

      if (res.success && res.data) {
        const products: Product[] = res.data as Product[];

        const cartItems: CartItem[] = products.map((product) => {
          const lsItem = cart.find((c) => c.productId === product._id);
          return {
            product,
            quantity: lsItem?.quantity || 1,
          };
        });

        dispatch(setCart(cartItems));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Get products by cart error:", error);
      return false;
    }
  };
