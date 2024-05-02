import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.24.80.1:8000/',
//   timeout: 5000, 
//   headers: {
//     'Content-Type': 'application/json',
//   },
});

export default api;