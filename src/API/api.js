import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL:" localhost:5000/api"//'https://rcet.herokuapp.com/'
    // baseURL: "http://localhost:5000/api"
   baseURL:"https://tender-gear-cod.cyclic.app/api"
});
export default axiosInstance;

