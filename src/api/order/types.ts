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
  status: string;
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

export interface IGetAllOrderParams {
  page: number;
  limit: number;
  search: string;
  status: string;
}

export interface IGetAllOrderResponse {
  orders: IGetAllOrder[];
  meta: IMetaPagination;
}

export interface IGetAllOrder {
  id: number;
  orderAt: string;
  status: string;
  type: string;
  isPaid: string;
  shippedAt: any;
  deliveredAt: any;
  shippingAddress: IGetAllOrderShippingAddress;
  user: User;
  products: IGetAllOrderProduct[];
}

export interface IGetAllOrderShippingAddress extends ICancelOrderShippingAddress {}

export interface IGetAllOrderProduct {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  discount: string;
  title: string;
  images: string[];
  description: string;
  product: ICancelOrderProductDetail;
}

export interface IUpdateStatusOrderParams extends ICancelOrderParams {
  id: string;
}

export interface IUpdateStatusOrderRequest {
  status: string;
}

export interface IUpdateStatusOrderResponse {
  message: string;
  status: number;
}

export interface IGetMonthlyReportParams {
  page: number;
  limit: number;
}

export interface IGetMonthlyReportResponse {
  data: IMonthlyReport[];
  meta: IMetaPagination;
}

export interface IMonthlyReport {
  month: string;
  totalRevenue: number;
}

export interface IGetVnPayUrlParams {
  returnUrlLocal: string;
}

export interface IGetVnPayUrlRequest {
  totalAmount: number;
}

export interface IGetVnPayUrlResponse {
  url: string;
}

export interface IGetVNPAYReturnParams {
  vnp_TransactionStatus: string;
  vnp_TransactionNo: string;
  vnp_ResponseCode: string;
  orderId: string;
}

export interface IGetVNPAYReturnResponse {
  message: string;
  status: number;
  order: IGetVnpayReturnOrder;
}

export interface IGetVnpayReturnOrder {
  id: number;
  orderAt: string;
  status: string;
  type: string;
  isPaid: string;
  shippedAt: any;
  deliveredAt: any;
  shippingAddress: IGetVnpayReturnShippingAddress;
  user: IGetVnpayReturnUser;
  products: IGetVnpayReturnProduct[];
}

export interface IGetVnpayReturnShippingAddress {
  id: number;
  phoneNumber: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface IGetVnpayReturnUser {
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

export interface IGetVnpayReturnProduct {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  discount: string;
  title: string;
  images: string[];
  description: string;
  product: IGetVnpayReturnProductDetail;
}

export interface IGetVnpayReturnProductDetail {
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

export interface IGetDailyRevenueResponse {
  data: IDailyRevenue[];
  meta: IMetaPagination;
}

export interface IDailyRevenue {
  date: string;
  revenue: number;
}
