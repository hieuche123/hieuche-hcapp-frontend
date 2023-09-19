import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL
const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance