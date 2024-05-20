import { type IMetaPagination } from '@/types/common.type';

export interface IIsAdminResponse {
  data: boolean;
}

export interface IIsAdminParams {
  token: string;
}

export interface IGetAllUserParams {
  isActive?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

export interface IUserGetAllDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActice: boolean;
  verifyCode: string | null;
}

export interface IGetAllUserResponse {
  users: IUserGetAllDetail[];
  meta: IMetaPagination;
}

export interface IDeleteUserParams {
  id: number;
}

export interface IDeleteUserResponse {
  status: number;
  message: string;
}

export interface IUserDetailResponse extends IUserGetAllDetail {}
export interface IUserDetailParams extends IDeleteUserParams {}

export interface IEditProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  email: string;
}

export interface IEditProfileResponse {
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

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponse {
  message: string;
  code: number;
}

export interface ISendVerifyCodeResponse {
  message: string;
}
export interface IVerifyAccountRequest {
  verifyCode: string;
}

export interface IVerifyAccountResponse {
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
  verifyCode: string;
}
