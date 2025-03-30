import axios from "axios";
import { BASE_URL } from "../../config/config.js";

const ESTANDAR_API = `${BASE_URL}/estandar`;

/**
 * Consulta un usuario por su ID.
 * @param {number} id - ID del usuario a consultar.
 * @returns {Promise<Object>} - Datos del usuario.
 */
export async function consultarUsuario(id) {
    try {
        const response = await axios.get(`${ESTANDAR_API}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}


/**
 * Crea una reserva para un usuario.
 * @param {number} id - ID del usuario que realiza la reserva.
 * @param {Object} reservaData - Datos de la reserva.
 * @returns {Promise<string>} - Mensaje de éxito.
 */
export async function crearReserva(id, reservaData) {
    try {
        const response = await axios.post(`${ESTANDAR_API}/${id}/reserva`, reservaData, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Lista todas las reservas de un usuario.
 * @param {number} id - ID del usuario.
 * @returns {Promise<Object[]>} - Lista de reservas.
 */
export async function listarReservas(id) {
    try {
        const response = await axios.get(`${ESTANDAR_API}/${id}/reserva`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}