import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL
const instance = axios.create({
    baseURL: baseUrl,
});

export default instance