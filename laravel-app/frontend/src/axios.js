import axios from 'axios';
import router from './router.js';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api',
    withCredentials: true, //send the cookies
    withXSRFToken: true  //send the header X-XSRF-TOKEN
});

axiosClient.interceptors.request.use(config => {//automatically adds the JWT token to every request
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {//handle responses (or errors) globally for all requests
    return response;
},error => {

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('TOKEN')
      router.push({ name: 'Login' });

    }

    throw error;
})

export default axiosClient;