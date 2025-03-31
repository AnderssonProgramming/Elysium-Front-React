import axios from "axios";
import { BASE_URL } from "../config/config.js";

export async function login(correo="", contraseña="") {
    if (correo === "" || contraseña === "") {
        throw new Error("El correo y la contraseña son obligatorios.");
    }
    try {
        const data = {
            correoInstitucional: correo,
            password: contraseña
        }
        const response = await axios.post(`${BASE_URL}/login`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}

export async function register(usuario = {}) {
    try {
        const response = await axios.post(`${BASE_URL}/register`, usuario );
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}