// Login
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
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
  isActice: boolean | false;
}

export interface ILoginResponse {
  token: IToken;
  user: IUser;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IRegisterResponse {
  user: IUser;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
}
