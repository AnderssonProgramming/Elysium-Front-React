import api from "./axiosInstance";
const SALON_API = "/salones";

/**
 * Obtiene la lista de salones con filtros opcionales.
 * @param {Object} filtros - Filtros opcionales para la consulta.
 * @param {boolean} [filtros.activo] - Filtrar por estado activo.
 * @param {boolean} [filtros.disponible] - Filtrar por disponibilidad.
 * @param {string} [filtros.nombre] - Filtrar por nombre.
 * @param {string} [filtros.ubicacion] - Filtrar por ubicación.
 * @param {number} [filtros.capacidadMin] - Filtrar por capacidad mínima.
 * @param {number} [filtros.capacidadMax] - Filtrar por capacidad máxima.
 * @returns {Promise<Object[]>} Lista de salones.
 * @throws {Error} Error al obtener los salones.
 */
export async function getSalones(filtros = {}) {
    try {
        const response = await api.get(SALON_API, filtros );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Obtiene un salón por su mnemónico.
 * @param {string} mnemonico - Mnemónico del salón.
 * @returns {Promise<Object>} Datos del salón.
 * @throws {Error} Error al obtener el salón.
 */
export async function getSalonByMnemonico(mnemonico) {
    try {
        const response = await api.get(`${SALON_API}/${mnemonico}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Verifica la disponibilidad de un salón.
 * @param {string} mnemonico - Mnemónico del salón.
 * @returns {Promise<boolean>} Estado de disponibilidad del salón.
 * @throws {Error} Error al obtener la disponibilidad.
 */
export async function getDisponible(mnemonico) {
    try {
        const response = await api.get(`${SALON_API}/${mnemonico}/disponible`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Agrega un nuevo salón.
 * @param {Object} salon - Datos del salón a agregar.
 * @param {string} salon.name - Nombre del salón.
 * @param {string} salon.mnemonic - Mnemónico del salón.
 * @param {string} salon.description - Descripción del salón.
 * @param {string} salon.location - Ubicación del salón.
 * @param {number} salon.capacity - Capacidad del salón.
 * @param {Object[]} salon.resources - Recursos del salón.
 * @returns {Promise<Object>} Respuesta del servidor.
 * @throws {Error} Error al agregar el salón.
 */
export async function agregarSalon(salon) {
    try {
        const response = await api.post(SALON_API, salon );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Actualiza la información de un salón.
 * @param {string} mnemonico - Mnemónico del salón a actualizar.
 * @param {Object} salon - Datos actualizados del salón.
 * @returns {Promise<Object>} Respuesta del servidor.
 * @throws {Error} Error al actualizar el salón.
 */
export async function actualizarSalon(mnemonico, salon) {
    try {
        await api.patch(`${SALON_API}/${mnemonico}`, salon );
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}