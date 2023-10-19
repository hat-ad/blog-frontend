import { ApiResponse } from "@/types";
import Api from "../services";

export const upload = async (payload: any): Promise<any | string> => {
  try {
    const response: ApiResponse<string, object> = await Api.postForm(
      "/upload/single",
      payload
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};
