// import axios from "axios";
// const baseUrl = "https://localhost:7166/api/";

// const config = {
//   baseUrl: baseUrl,
// };

// const api = axios.create(config);

// api.defaults.baseURL = baseUrl;

// const handleBefore = (config) => {
//   //handle hanh dong trc khi call API
//   //lay ra cai token va dinh kem theo cai request
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// };

// api.interceptors.request.use(handleBefore, null);

// export default api;
