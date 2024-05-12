import { request } from '../axios';
import type {
  ICreatePublisherRequest,
  ICreatePublisherResponse,
  IDeletePublisherParams,
  IDeletePublisherResponse,
  IEditPublisherParams,
  IEditPublisherRequest,
  IEditPublisherResponse,
  IGetAllPublisherParams,
  IGetAllPublisherResponse,
  IGetPublisherDetailParams,
  IGetPublisherDetailResponse,
} from './types';

export const getAllPublisherRequest = async (params: IGetAllPublisherParams): Promise<IGetAllPublisherResponse> => {
  const { data } = await request({
    url: '/api/v1/publisher',
    method: 'GET',
    params,
  });

  return data;
};

export const getDetailPublisherRequest = async (
  params: IGetPublisherDetailParams
): Promise<IGetPublisherDetailResponse> => {
  const { data } = await request({
    url: `/api/v1/publisher/${params.id}`,
    method: 'GET',
    params,
  });

  return data;
};

export const deletePublisherRequest = async (params: IDeletePublisherParams): Promise<IDeletePublisherResponse> => {
  const { data } = await request({
    url: `/api/v1/publisher/${params.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};

export const createPublisherRequest = async (body: ICreatePublisherRequest): Promise<ICreatePublisherResponse> => {
  const { data } = await request({
    url: '/api/v1/publisher',
    method: 'POST',
    data: body,
  });

  return data;
};

export const editPublisherRequest = async (req: {
  params: IEditPublisherParams;
  body: IEditPublisherRequest;
}): Promise<IEditPublisherResponse> => {
  const { data } = await request({
    url: `/api/v1/publisher/${req?.params?.id}`,
    method: 'PATCH',
    data: req?.body,
  });

  return data;
};
