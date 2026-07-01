import axios from "axios";

const api = axios.create({
  baseURL: "https://client-lead-management-system-olive.vercel.app/api",
});

export default api;