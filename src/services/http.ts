import axios from 'axios';

export const http = axios.create({
    baseURL: import.meta.env.VITE_HTTP_API,
});