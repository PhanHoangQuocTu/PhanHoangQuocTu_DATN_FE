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
  discount: number;
  stock: number;
  images: string[];
  categoryId: number;
  authorId: number;
  publisherId: number;
}

export interface IGetDetailBookParams {
  id: number;
}

export interface IGetDetailBookResponse {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  stock: number;
  images: any[];
  createdAt: string;
  updatedAt: string;
  addedBy: AddedBy;
  category: Category;
  author: Author;
  publisher: Publisher;
}

export interface AddedBy {
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

export interface Category {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Author {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Publisher {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface ICreateProductResponse extends IGetAllProductDetail {}
export interface IEditProductRequest extends ICreateProductRequest {}
export interface IEditProductParams extends IGetDetailBookParams {}
export interface IEditProductResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  addedBy: AddedBy;
  category: Category;
  author: Author;
  publisher: Publisher;
  categoryId: number;
  authorId: number;
  publisherId: number;
}

export interface IDeleteProductParams extends IGetDetailBookParams {}
export interface IDeleteProductResponse {
  status: number;
  message: string;
}
