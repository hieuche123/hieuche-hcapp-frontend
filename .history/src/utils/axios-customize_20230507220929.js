import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance