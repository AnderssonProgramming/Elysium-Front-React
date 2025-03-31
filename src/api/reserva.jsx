import axios from "axios";
import { BASE_URL } from "../config/config.js";

const RESERVA_API = `${BASE_URL}/reserva`;

/**
 * Obtiene una lista de reservas con filtros opcionales.
 * @param {Object} filtros - Parámetros opcionales para filtrar reservas.
 * @param {string} [filtros.idSalon] - ID del salón.
 * @param {string} [filtros.fecha] - Fecha de la reserva (YYYY-MM-DD).
 * @param {number} [filtros.hora] - Hora de la reserva.
 * @param {string} [filtros.diaSemana] - Día de la semana (ej. LUNES).
 * @param {string} [filtros.estado] - Estado de la reserva.
 * @param {boolean} [filtros.duracionBloque] - Duración del bloque.
 * @returns {Promise<Object[]>} Lista de reservas encontradas.
 * @throws {Error} Si ocurre un error en la solicitud.
 */
export async function getReservas (filtros = {}, token) {
    try {
        const response = await axios.get(RESERVA_API, {
            params: filtros,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Consulta una reserva específica por su ID.
 * @param {string} idReserva - ID de la reserva.
 * @returns {Promise<Object>} Datos de la reserva.
 * @throws {Error} Si la reserva no existe o hay un error en la solicitud.
 */
export async function consultarReserva (idReserva, token) {
    try {
        const response = await axios.get(`${RESERVA_API}/${idReserva}/reserva`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Crea una nueva reserva.
 * @param {Object} reserva - Datos de la reserva.
 * @returns {Promise<string>} Mensaje de confirmación.
 * @throws {Error} Si ocurre un error en la solicitud.
 */
export async function crearReserva (reserva, token) {
    try {
        const response = await axios.post(RESERVA_API, { 
            params: reserva,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Actualiza una reserva existente.
 * @param {string} idReserva - ID de la reserva a actualizar.
 * @param {Object} reserva - Nuevos datos de la reserva.
 * @returns {Promise<void>}
 * @throws {Error} Si la reserva no existe o hay un error en la solicitud.
 */
export async function actualizarReserva (idReserva, reserva, token) {
    try {
        await axios.patch(`${RESERVA_API}/${idReserva}`, {
            params: reserva,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Deshabilita (elimina lógicamente) una reserva.
 * @param {string} idReserva - ID de la reserva a deshabilitar.
 * @returns {Promise<string>} Mensaje de confirmación.
 * @throws {Error} Si la reserva no existe o hay un error en la solicitud.
 */
export async function deleteReserva (idReserva, token) {
    try {
        const response = await axios.put(`${RESERVA_API}/${idReserva}/inactivo`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}