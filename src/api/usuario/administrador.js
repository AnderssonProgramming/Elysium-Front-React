import axios from "axios";
import { BASE_URL } from "../../config/config.js";

const ADMIN_API = `${BASE_URL}/administrador`;

/**
 * Consulta usuarios con filtros opcionales.
 * 
 * @param {Object} filtros - Filtros opcionales para la consulta.
 * @param {boolean} [filtros.activo] - Filtrar usuarios activos/inactivos.
 * @param {boolean} [filtros.isAdmin] - Filtrar usuarios administradores/no administradores.
 * @returns {Promise<Object[]>} - Lista de usuarios filtrados.
 * @throws {Error} - Si la consulta falla.
 */
export async function consultarUsuarios(filtros) {
    try {
        const response = await axios.get(`${ADMIN_API}/usuarios`, { params: filtros });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Agrega un nuevo usuario al sistema.
 * @param {Object} usuario - Datos del usuario a agregar.
 * @returns {Promise<void>} Promesa resuelta si el usuario se agrega correctamente.
 * @throws {Error} Si hay un problema al agregar el usuario.
 */
export async function agregarUsuario(usuario) {
    try {
        const response = await axios.post(`${ADMIN_API}/usuario`, usuario);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Actualiza parcialmente la información de un usuario.
 * @param {number} id - ID del usuario a actualizar.
 * @param {Object} actualizacion - Datos a actualizar.
 * @returns {Promise<void>} Promesa resuelta si la actualización es exitosa.
 * @throws {Error} Si hay un problema al actualizar el usuario.
 */
export async function actualizarInformacionUsuario(id, actualizacion) {
    try {
        const response = await axios.patch(`${ADMIN_API}/usuario/${id}`, actualizacion);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Agrega un nuevo salón al sistema.
 * @param {number} id - ID del administrador que agrega el salón.
 * @param {Object} salon - Datos del salón a agregar.
 * @returns {Promise<void>} Promesa resuelta si el salón se agrega correctamente.
 * @throws {Error} Si hay un problema al agregar el salón.
 */
export async function agregarSalon(id, salon) {
    try {
        const response = await axios.post(`${ADMIN_API}/${id}/salon`, salon);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Crea una nueva reserva en el sistema.
 * @param {number} id - ID del usuario que realiza la reserva.
 * @param {Object} reserva - Datos de la reserva a crear.
 * @returns {Promise<string>} Mensaje de éxito.
 * @throws {Error} Si hay un problema al crear la reserva.
 */
export async function crearReserva(id, reserva) {
    try {
        const response = await axios.post(`${ADMIN_API}/${id}/reserva`, reserva);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}