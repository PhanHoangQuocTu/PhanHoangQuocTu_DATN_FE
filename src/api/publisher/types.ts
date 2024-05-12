import { type IMetaPagination } from '@/types/common.type';

export interface IGetAllPublisherParams {
  page: number;
  limit: number;
  search: string;
}

export interface IGetAllPublisherResponse {
  publishers: IGetAllPublisherDetail[];
  meta: IMetaPagination;
}

export interface IGetAllPublisherDetail {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreatePublisherRequest {
  name: string;
  description: string;
}

export interface ICreatePublisherResponse {
  name: string;
  description: string;
  addedBy: ICreatePublisherAddedBy;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreatePublisherAddedBy {
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

export interface IGetPublisherDetailParams {
  id: string;
}

export interface IGetPublisherDetailResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  addedBy: IGetPublisherDetailAddedBy;
}

export interface IGetPublisherDetailAddedBy {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
}

export interface IEditPublisherRequest extends ICreatePublisherRequest {}
export interface IEditPublisherParams extends IGetPublisherDetailParams {}
export interface IEditPublisherResponse extends IGetPublisherDetailResponse {}
export interface IDeletePublisherParams extends IGetPublisherDetailParams {}

export interface IDeletePublisherResponse {
  status: number;
  message: string;
}
