import type { AppDispatch } from "@/store/store";
import type { Category, Product } from "@/types/type";
import { apiConnector } from "@/utils/apiConnector";
import { CategoryEndpoints, ProductEndpoints } from "./apis";
import { setCategories, setProducts } from "@/store/features/product.slice";

export const fetchAllProducts = () => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', ProductEndpoints.GET_ALL_PRODUCTS);
        
        if (res.success && res.data) {
            dispatch(setProducts(res.data as Product[]));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch products error:", error);
        return false;
    }
}   

export const fetchAllCategories = () => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', CategoryEndpoints.GET_ALL_CATEGORIES);
        
        if (res.success && res.data) {
            dispatch(setCategories(res.data as Category[]));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch categories error:", error);
        return false;
    }
}   

export const fetchProductsByCategory = (categoryId: string) => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', CategoryEndpoints.GET_PRODUCT_BY_CATEGORY(categoryId));
        
        if (res.success && res.data) {
            dispatch(setProducts(res.data as Product[]));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch products by category error:", error);
        return false;
    }
};