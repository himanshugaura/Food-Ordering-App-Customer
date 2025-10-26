import { FoodType, OrderStatus, PaymentMethod } from "@/constants/typeConstants";


declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface User {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  _id: string;
  name: string;
  address: string;
  logo: {
    publicId: string;
    url: string;
  };
  isOpen: boolean;
  orderCounter: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface Category  {
  _id: string;
  name: string;
  image: {
    publicId: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product  {
  _id: string;
  name: string;
  description: string;
  foodType: FoodType;
  isAvailable: boolean;
  price: number;
  category: Category;
  image: {
    publicId: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


export interface OrderItem {
  product: string;   
  quantity: number;          
}

export interface Orders  {
  _id: string;
  user: string;
  orderItems: OrderItem[];  
  orderNo: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod : PaymentMethod;
  isPaid : boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  method: {
    upi: boolean;
    card: boolean;
    netbanking: boolean;
    wallet: boolean;
  };
  handler: (paymentResponse: PaymentResponse) => void | Promise<void>;
  modal: {
    ondismiss: () => void | Promise<void>;
  };
}

export interface RazorpayInstance {
  open: () => void;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OnlineOrderResponse {
  totalAmount: number;
  razorpayOrderId: string;
}