import { type IMetaPagination } from '@/types/common.type';

export interface IGetReviewByBookIdParams {
  productId: number;
  page: number;
  limit: number;
}

export interface IGetReviewByBookIdResponse {
  reviews: IReview[];
  meta: IMetaPagination;
}

export interface IReview {
  id: number;
  ratings: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: IGetReviewByBookIdUser;
  product: IGetReviewByBookIdProduct;
}

export interface IGetReviewByBookIdUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  isActice: boolean;
  verifyCode: any;
}

export interface IGetReviewByBookIdProduct {
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
  category: IGetReviewByBookIdCategory;
}

export interface IGetReviewByBookIdCategory {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface ICreateReviewRequest {
  productId: number;
  ratings: number;
  comment: string;
}

export interface ICreateReviewResponse {
  ratings: number;
  comment: string;
  user: IGetReviewByBookIdUser;
  product: IGetReviewByBookIdProduct;
  id: number;
  createdAt: string;
  updatedAt: string;
}
