import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../store"; // Assuming you have defined RootState in your store file
import { ApiResponse } from "@/types";

export default class API {
  private axiosInstance: AxiosInstance;

  constructor(options: { baseUrl: string }) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
    });
  }

  public get(
    endpoint: string,
    header?: Record<string, string>
  ): Promise<ApiResponse<string, any>> {
    return this.httpRequest("GET", endpoint, undefined, header);
  }

  public post(
    endpoint: string,
    params: any,
    header?: Record<string, string>
  ): Promise<ApiResponse<string, any>> {
    return this.httpRequest("POST", endpoint, params, header);
  }

  public update(
    endpoint: string,
    params: any,
    header?: Record<string, string>
  ): Promise<ApiResponse<string, any>> {
    return this.httpRequest("PUT", endpoint, params, header);
  }

  public postForm(
    endpoint: string,
    params: any,
    header?: Record<string, string>
  ): Promise<ApiResponse<string, any>> {
    return this.httpRequest("POST", endpoint, params, {
      ...header,
      "Content-Type": "multipart/form-data",
    });
  }

  public updateForm(
    endpoint: string,
    params: any,
    header?: Record<string, string>
  ): Promise<ApiResponse<string, any>> {
    return this.httpRequest("PUT", endpoint, params, {
      ...header,
      "Content-Type": "multipart/form-data",
    });
  }

  private async httpRequest<T>(
    method: string,
    url: string,
    params?: any,
    header: Record<string, string> | null = null
  ): Promise<T> {
    const state: any = store.getState();
    const clientToken = state.auth.clientToken;
    return new Promise<T>((resolve, reject) => {
      const options: AxiosRequestConfig = {
        url: url,
        headers: {
          Authorization: clientToken ? `Bearer ${clientToken}` : undefined,
          "Content-Type": "application/json",
          ...(header ? header : {}),
        },
        method: method,
        data: params,
      };

      this.axiosInstance
        .request(options)
        .then((response: AxiosResponse<T>) => {
          resolve({
            status: response.status,
            ...response.data,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
