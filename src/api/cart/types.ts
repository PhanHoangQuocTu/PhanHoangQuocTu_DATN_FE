export interface IAddToCartParams {
  productId: number;
}

export interface IAddToCartRequest {
  quantity: number;
}

export interface IAddToCartResponse {
  message: string;
  cart: ICartDetail;
}

export interface ICartDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  isOrdered: boolean;
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  quantity: number;
  product: ICartProductDetail;
}

export interface ICartProductDetail {
  id: number;
  title: string;
  price: string;
  category: ICartCategoryDetail;
  stock: number;
  images: string[];
}

export interface ICartCategoryDetail {
  id: number;
  title: string;
}

export interface IGetCartByCurrentUserResponse {
  cart: ICart;
}

export interface ICart {
  id: number;
  isOrdered: boolean;
  createdAt: string;
  updatedAt: string;
  items: ICartItemByCurrentUser[];
}

export interface ICartItemByCurrentUser {
  id: number;
  quantity: number;
  product: ICartProductByCurrentUser;
}

export interface ICartProductByCurrentUser {
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
  category: ICartCategoryByCurrentUser;
}

export interface ICartCategoryByCurrentUser {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface IUpdateCartParams {
  cartItemId: number;
}

export interface IUpdateCartRequest {
  quantity: number;
}

export interface IUpdateCartResponse {
  message: string;
}

export interface IDeleteCartItemParams extends IUpdateCartParams {}
export interface IDeleteCartItemResponse extends IUpdateCartResponse {}
