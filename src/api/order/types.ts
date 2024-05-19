import { type IMetaPagination } from '@/types/common.type';

export interface ICreateOrderRequest {
  shippingAddress: IShippingAddressRequest;
  orderedProducts: IOrderedProductRequest[];
  type: string;
  isPaid: string;
}

export interface IShippingAddressRequest {
  phoneNumber: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface IOrderedProductRequest {
  id: number;
  product_unit_price: number;
  product_quanity: number;
  title: string;
  description: string;
  discount: number;
  images: string[];
}

export interface ICreateOrderResponse {
  id: number;
  orderAt: string;
  status: string;
  type: string;
  isPaid: string;
  shippedAt: any;
  deliveredAt: any;
  shippingAddress: IShippingAddressResponse;
  user: IUserResponse;
  products: IProductResponse[];
}

export interface IShippingAddressResponse {
  id: number;
  phoneNumber: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: any;
  gender: any;
  dateOfBirth: any;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  isActice: boolean;
  verifyCode: any;
}

export interface IProductResponse {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  discount: string;
  title: string;
  images: string[];
  description: string;
  product: IProductDetailResponse;
}

export interface IProductDetailResponse {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface IGetMyOrdersResponse {
  data: IGetMyOrderDetail[];
  meta: IMetaPagination;
}

export interface IGetMyOrderDetail {
  id: number;
  orderAt: string;
  status: string;
  type: string;
  isPaid: string;
  shippedAt: any;
  deliveredAt: any;
  shippingAddress: IGetMyOrderShippingAddress;
  user: IGetMyOrderUser;
  products: IGetMyOrderProduct[];
}

export interface IGetMyOrderShippingAddress {
  id: number;
  phoneNumber: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface IGetMyOrderUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: any;
  gender: any;
  dateOfBirth: any;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  isActice: boolean;
  verifyCode: any;
}

export interface IGetMyOrderParams {
  page: number;
  limit: number;
}

export interface IGetMyOrderProduct {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  discount: string;
  title?: string;
  images?: string[];
  description?: string;
  product: IGetMyOrderProductDetail;
}

export interface IGetMyOrderProductDetail {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
export interface ICancelOrderParams {
  id: string;
}

export interface ICancelOrderResponse {
  id: number;
  orderAt: string;
  status: string;
  type: string;
  isPaid: string;
  shippedAt: any;
  deliveredAt: any;
  shippingAddress: ICancelOrderShippingAddress;
  user: User;
  products: ICancelOrderProduct[];
  updatedBy: ICancelOrderUpdatedBy;
}

export interface ICancelOrderShippingAddress {
  id: number;
  phoneNumber: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: any;
  gender: any;
  dateOfBirth: any;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  isActice: boolean;
  verifyCode: any;
}

export interface ICancelOrderProduct {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  discount: string;
  title: string;
  images: string[];
  description: string;
  product: ICancelOrderProductDetail;
}

export interface ICancelOrderProductDetail {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface ICancelOrderUpdatedBy {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: any;
  gender: any;
  dateOfBirth: any;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  isActice: boolean;
  verifyCode: any;
}
