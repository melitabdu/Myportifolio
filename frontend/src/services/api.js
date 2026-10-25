
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myportifolio-hvcv.onrender.com/api',
  withCredentials: true,
});

export default api;
