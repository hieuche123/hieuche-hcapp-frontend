import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL
const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance