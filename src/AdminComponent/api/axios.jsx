import axios from "axios";

const api = axios.create({
  baseURL: " https://localhost:7166/api/",
});

// // Thêm token vào header cho mỗi yêu cầu
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
