import { FoodType } from "@/constants/typeConstants";

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