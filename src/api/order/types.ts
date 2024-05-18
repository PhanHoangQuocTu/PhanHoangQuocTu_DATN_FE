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
