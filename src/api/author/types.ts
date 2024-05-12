import { type IMetaPagination } from '@/types/common.type';

export interface IGetAllAuthorParams {
  page: number;
  limit: number;
  search: string;
}

export interface IGetAllAuthorResponse {
  authors: IGetAllAuthorDetail[];
  meta: IMetaPagination;
}

export interface IGetAllAuthorDetail {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateAuthorRequest {
  name: string;
  gender: string;
  dateOfBirth: string;
}

export interface ICreateAuthorResponse {
  name: string;
  gender: string;
  dateOfBirth: string;
  addedBy: IAddedByCreateAuthor;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IAddedByCreateAuthor {
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

export interface IGetDetailAuthorParams {
  id: string;
}

export interface IGetDetailAuthorResponse {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  addedBy: IAddedByGetDetailAuthor;
}

export interface IAddedByGetDetailAuthor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IEditAuthorParams extends IGetDetailAuthorParams {}
export interface IEditAuthorRequest extends ICreateAuthorRequest {}
export interface IEditAuthorResponse extends IGetDetailAuthorResponse {}
export interface IDeleteAuthorParams extends IGetDetailAuthorParams {}

export interface IDeleteAuthorResponse {
  status: number;
  message: string;
}
