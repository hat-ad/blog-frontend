export interface ApiResponse<T, K> {
  code: number;
  result: T | K;
  message: string;
}
interface IUser {
  name?: string;
  email: string;
  userCode: string;
  password: string;
  token: string | null;
  is_active: boolean;
}
export interface IBlog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  readTime: number;
  slug: string;
  author: string; // This should match the type of the user's identifier, like userCode
  authorInfo?: IUser;
}

export interface IBlogsData {
  blogs: IBlog[];
  limit: number;
  page: number;
  total: number;
}

export interface QueryParamsType {
  limit: number;
  page: number;
}

export interface CreateBlogFormProps {
  visible: boolean;
  onCreate: (blogData: any) => void;
  onCancel: () => void;
}
