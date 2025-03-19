import axiosInstance from "../axiosInstance";
import { ApiResponse, AuthResponse, User } from "../../types";
import {
  EMAIL_LOGIN,
  EMAIL_REGISTER,
  EMAIL_SEND_VERIFY,
  FETCH_ME,
  GOOGLE_LOGIN,
  GOOGLE_REGISTER,
  PHONE_LOGIN,
  PHONE_REGISTER,
  PHONE_SEND_VERIFY,
  PHONE_VERIFY,
} from "../apis";

export const emailRegister = async (
  user: User
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post(EMAIL_REGISTER, user);
  return response.data;
};

export const emailLogin = async (
  user: User
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post(EMAIL_LOGIN, user);
  return response.data;
};

export const sendEmailVerify = async (data: {
  token: string;
  email: string;
}): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post(EMAIL_SEND_VERIFY, data);
  return response.data;
};

export const phoneRegister = async (
  user: User
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post(PHONE_REGISTER, user);
  return response.data;
};

export const phoneLogin = async (
  user: User
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post(PHONE_LOGIN, user);
  return response.data;
};

export const phoneSendVerification = async (data: {
  phone: string;
}): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post(PHONE_SEND_VERIFY, data);
  return response.data;
};

export const phoneVerify = async (data: {
  phone: string;
  otp: string;
  id: number;
}): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post(PHONE_VERIFY, data);
  return response.data;
};

export const googleRegister = async (data: {
  code: any;
}): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post(GOOGLE_REGISTER, data);
  return response.data;
};

export const googleLogin = async (data: {
  code: any;
}): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post(GOOGLE_LOGIN, data);
  return response.data;
};

export const fetchMe = async (id: number): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get(FETCH_ME + id);
  return response.data;
};
