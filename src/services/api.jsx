import axios from "axios";

const apiClientBlog = axios.create({
  baseURL: "http://127.0.0.1:3002/blog/v1",
  timeout: 5000,
});

apiClientBlog.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

export const login = async (data) => {
  try {
    return await apiClientBlog.post("/auth/login", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
