import API from "./apiService";

const Api = new API({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "",
});

export default Api;
