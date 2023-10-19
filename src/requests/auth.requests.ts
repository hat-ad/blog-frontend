import { ApiResponse } from "@/types";
import Api from "../services";

export const login = async (payload: any): Promise<object | string> => {
  try {
    const response: ApiResponse<string, object> = await Api.post(
      "/user/login",
      payload
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const register = async (payload: any): Promise<object | string> => {
  try {
    const response: ApiResponse<string, object> = await Api.post(
      "/user/create",
      payload
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const socialLogin = async (payload: any): Promise<object | string> => {
  try {
    const response: ApiResponse<string, object> = await Api.post(
      "/user/login/social",
      payload
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const socialRegister = async (
  payload: any
): Promise<object | string> => {
  try {
    const response: ApiResponse<string, object> = await Api.post(
      "/user/create/social",
      payload
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};
