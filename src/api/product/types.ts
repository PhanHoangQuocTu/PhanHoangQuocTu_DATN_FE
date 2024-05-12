import { type IMetaPagination } from '@/types/common.type';

export interface IGetAllProductParams {
  maxRating?: number;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  publisherId?: number;
  authorId?: number;
  categoryId?: number;
  search: string;
  page: number;
  limit: number;
}
export interface IGetAllProductResponse {
  products: IGetAllProductDetail[];
  meta: IMetaPagination;
}

export interface IGetAllProductDetail {
  id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: any;
  author?: IAuthorProductDetail;
  publisher?: IPublisherProductDetail;
}

export interface ICategoryProductDetail {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  addedBy: ICategoryAddedBy;
}

export interface ICategoryAddedBy {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IAuthorProductDetail {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface IPublisherProductDetail {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface ICreateProductRequest {
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  authorId: number;
  publisherId: number;
}

export interface ICreateProductResponse extends IGetAllProductDetail {}
