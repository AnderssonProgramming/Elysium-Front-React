import axios from "axios";
import { BASE_URL } from "../config/config.js";

const RECURSO_API = `${BASE_URL}/recurso`;

/**
 * Obtiene la lista de todos los recursos disponibles.
 * @returns {Promise<Object[]>} Lista de recursos.
 * @throws {Error} Si la solicitud falla.
 */
export async function getRecursos(filtros) {
    try {
        const response = await axios.get(RECURSO_API, { params: filtros });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Obtiene un recurso por su identificador.
 * @param {string} id - Identificador único del recurso.
 * @returns {Promise<Object>} Datos del recurso encontrado.
 * @throws {Error} Si la solicitud falla.
 */
export async function consultarRecurso(id) {
    try {
        const response = await axios.get(`${RECURSO_API}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Agrega un nuevo recurso.
 * @param {Object} recurso - Datos del recurso a agregar.
 * @param {string} recurso.nombre - Nombre del recurso.
 * @param {number} recurso.cantidad - Cantidad disponible.
 * @param {string[]} recurso.especificaciones - Lista de especificaciones del recurso.
 * @returns {Promise<void>}
 * @throws {Error} Si la solicitud falla.
 */
export async function agregarRecurso(recurso) {
    try {
        const response = await axios.post(RECURSO_API, recurso);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Actualiza un recurso existente.
 * @param {string} id - Identificador del recurso a actualizar.
 * @param {Object} recurso - Datos actualizados del recurso.
 * @returns {Promise<void>}
 * @throws {Error} Si la solicitud falla.
 */
export async function actualizarRecurso(id, recurso) {
    try {
        const response = await axios.patch(`${RECURSO_API}/${id}`, recurso);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Deshabilita un recurso existente.
 * @param {string} id - Identificador del recurso a deshabilitar.
 * @returns {Promise<void>}
 * @throws {Error} Si la solicitud falla.
 */
export async function deshabilitarRecurso(id) {
    try {
        const response = await axios.put(`${RECURSO_API}/${id}/inactivo`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}