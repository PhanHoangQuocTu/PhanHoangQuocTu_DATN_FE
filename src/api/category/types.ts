import { type IMetaPagination } from '@/types/common.type';

export interface IGetAllCategoryParams {
  page: number;
  limit: number;
  search: string;
}

export interface IGetAllCategoryResponse {
  categories: CategorDetail[];
  meta: IMetaPagination;
}

export interface CategorDetail {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDeleteCategoryResponse {
  status: number;
  message: string;
}

export interface IDeleteCategoryParams {
  id: number;
}

export interface ICreateCategoryRequest {
  title: string;
  description: string;
}

export interface IAddedByCreateCategory {
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

export interface ICreateCategoryResponse {
  title: string;
  description: string;
  addedBy: IAddedByCreateCategory;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IEditCategoryRequest extends ICreateCategoryRequest {}
export interface IEditCategoryParams extends IDeleteCategoryParams {}
export interface IAddedByEditCategory {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IEditCategoryResponse {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  addedBy: IAddedByEditCategory;
}

export interface IGetDetailCategoryParams extends IDeleteCategoryParams {}
export interface IGetDetailCategoryResponse extends IEditCategoryResponse {}
