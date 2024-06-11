import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.208.37:8000/",
  // timeout: 5000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // baseURL: "http://192.168.1.3:8000/",
  //   timeout: 5000,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
});

export default api;
