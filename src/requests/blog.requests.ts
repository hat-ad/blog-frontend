import { ApiResponse, IBlog, IBlogsData } from "@/types";
import Api from "../services";

export const getAllBlogs = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<IBlogsData | string> => {
  try {
    const response: ApiResponse<string, IBlogsData> = await Api.get(
      `/blog?limit=${limit}&page=${page}&slug=`
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const getBlog = async ({
  slug,
}: {
  slug: string;
}): Promise<{ blog: IBlog } | string> => {
  try {
    const response: ApiResponse<string, { blog: IBlog }> = await Api.get(
      `/blog?slug=${slug}`
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const deleteBlog = async ({
  slug,
}: {
  slug: string;
}): Promise<string> => {
  try {
    const response: ApiResponse<string, { blog: IBlog }> = await Api.post(
      `/blog/delete`,
      {
        slug,
      }
    );
    return response.code ? "File deleted successfully!" : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const createBlog = async ({
  title,
  content,
  readTime,
  image,
}: {
  title: string;
  content: string;
  readTime: number;
  image: string;
}): Promise<{ blog: IBlog } | string> => {
  try {
    const response: ApiResponse<string, { blog: IBlog }> = await Api.post(
      `/blog/`,
      {
        title,
        content,
        readTime,
        image,
      }
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const updateBlog = async ({
  title,
  content,
  readTime,
  slug,
  image,
}: {
  title: string;
  content: string;
  readTime: number;
  slug: string;
  image: string;
}): Promise<{ blog: IBlog } | string> => {
  try {
    const response: ApiResponse<string, { blog: IBlog }> = await Api.update(
      `/blog/`,
      {
        title,
        content,
        readTime,
        slug,
        image,
      }
    );
    return response.result ? response.result : response.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};
