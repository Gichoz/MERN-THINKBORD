import axios from "axios";

const BASE_URL = import.meta.env.MODE_ENV === "production" ? "/" : "http://localhost:5000/api";
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;