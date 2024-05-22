import { type IMetaPagination } from '@/types/common.type';

export interface IGetAllPostParams {
  isApprove: boolean | undefined;
  search: string;
  page: number;
  limit: number;
}

export interface IGetAllPostResponse {
  posts: IGetAllPostDetail[];
  meta: IMetaPagination;
}

export interface IGetAllPostDetail {
  id: number;
  title: string;
  description: string;
  images: any[];
  isApproved: boolean;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  author: IGetAllPostAuthor;
}

export interface IGetAllPostAuthor {
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

export interface IApprovePostParams {
  id: string;
}

export interface IApprovePostResponse {
  message: string;
  code: number;
}

export interface IGetAllPostByMeParams {
  search: string;
  page: number;
  limit: number;
}

export interface IGetAllPostByMeResponse extends IGetAllPostResponse {}

export interface ICreatePostRequest {
  title: string;
  description: string;
  images: string[];
}

export interface IEditPostRequest extends ICreatePostRequest {}
export interface IEditPostParams {
  id: string;
}

export interface IDeletePostParams extends IEditPostParams {}
export interface IGetPostByIdParams extends IEditPostParams {}
export interface IGetPostByIdResponse extends IGetAllPostDetail {}
