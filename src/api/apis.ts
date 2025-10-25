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
    GET_PRODUCTS_BY_IDS: `${BASE_URL}/menu/get-products-by-ids`,
}

export const CategoryEndpoints = {
    GET_ALL_CATEGORIES: `${BASE_URL}/menu/get-categories`,
    GET_PRODUCT_BY_CATEGORY: (id : string) => `${BASE_URL}/menu/get-products-by-category/${id}`,
}

export const OrderEndpoints = {
    PLACE_CASH_ORDER: `${BASE_URL}/order/place/cash`,
    PLACE_ONLINE_ORDER: `${BASE_URL}/order/place/online`,
}

export const RazorpayEndpoints = {
    VERIFY_PAYMENT: `${BASE_URL}/payment/verify`,
    CANCEL_UNPAID_ORDER: `${BASE_URL}/order/cancel`,
}