import axios from "axios";
import { BASE_URL } from "../config/config.js";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    response => response,
    error => {
        console.error("Error en la API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
