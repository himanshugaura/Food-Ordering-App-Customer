const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AuthEndpoints = {
    LOGIN: `${BASE_URL}/user/auth/login`,
    REGISTER: `${BASE_URL}/user/auth/register`,
    PROFILE: `${BASE_URL}/user/auth/profile`,
    LOGOUT: `${BASE_URL}/user/auth/logout`,
}

export const StoreEndpoints = {
    GET_STORE: `${BASE_URL}/store/details`,
}

export const ProductEndpoints = {
    GET_ALL_PRODUCTS: `${BASE_URL}/menu/get-products`,
    GET_PRODUCT_BY_ID: (id: string) => `${BASE_URL}/menu/get-product/${id}`,
}

export const CategoryEndpoints = {
    GET_ALL_CATEGORIES: `${BASE_URL}/menu/get-categories`,
    GET_PRODUCT_BY_CATEGORY: (id : string) => `${BASE_URL}/menu/get-products-by-category/${id}`,
}