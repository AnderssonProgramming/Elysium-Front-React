import api from "./axiosInstance";
const RESERVA_API = '/reserva';

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
export async function getReservas (filtros = {}) {
    try {
        const response = await api.get(RESERVA_API, { params: filtros });
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
export async function consultarReserva (idReserva) {
    try {
        const response = await api.get(`${RESERVA_API}/${idReserva}/reserva`);
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
export async function crearReserva (reserva) {
    try {
        const response = await api.post(RESERVA_API, { params: reserva });
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
export async function actualizarReserva (idReserva, reserva) {
    try {
        await api.patch(`${RESERVA_API}/${idReserva}`, { params: reserva });
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
export async function deleteReserva (idReserva) {
    try {
        const response = await api.put(`${RESERVA_API}/${idReserva}/inactivo`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}