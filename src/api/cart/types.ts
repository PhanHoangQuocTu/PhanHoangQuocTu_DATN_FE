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
