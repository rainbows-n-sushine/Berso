import axios from "axios";

const api = axios.create({
  baseURL: "https://berso.onrender.com:8000/",
  timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
});

export default api;
