// import axios from "axios";
// const baseUrl = "http://159.65.0.133:8888/api/";

// const config = {
//   baseUrl: baseUrl,
// };

// const api = axios.create(config);

// api.defaults.baseURL = baseUrl;

// // handle before call API
// const handleBefore = (config) => {
//   //handle hanh dong trc khi call API
//   //lay ra cai token va dinh kem theo cai request
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// };

// api.interceptors.request.use(handleBefore, null); 

// export default api;
