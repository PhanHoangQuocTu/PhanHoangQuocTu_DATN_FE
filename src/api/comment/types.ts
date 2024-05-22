import { type IMetaPagination } from '@/types/common.type';

export interface ICommentRequest {
  postId: number;
  content: string;
}

export interface IDeleteCommentParams {
  id: string;
}

export interface IGetCommentByPostIdParams {
  postId: number;
  page: number;
  limit: number;
}

export interface IGetCommentByPostIdResponse {
  comments: IComment[];
  meta: IMetaPagination;
}

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  deletedAt: any;
  author: IAuthorComment;
}

export interface IAuthorComment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  isActice: boolean;
  verifyCode: any;
}
