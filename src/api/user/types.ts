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
  DateOfBirth: string | null;
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
