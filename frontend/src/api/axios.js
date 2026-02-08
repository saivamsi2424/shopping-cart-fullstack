import axios from "axios";

const api = axios.create({
  baseURL: "https://shopping-cart-fullstack-zzyo.onrender.com",
});

export default api;
