import api from "./axiosInstance";
const USUARIO_API = '/usuarios';

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
        const response = await api.get(USUARIO_API, { params: filtros });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Consulta un usuario por su correo institucional.
 * @param {string} correo - Correo institucional del usuario.
 * @returns {Promise<Object>} - Datos del usuario.
 * @throws {Error} - Si la consulta falla.
 */
export async function consultarUsuarioPorCorreo(correo) {
    try {
      // Verifica la ruta y el parámetro "correo"
      const response = await api.get(`${USUARIO_API}/correo/${correo}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error consultando usuario");
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
        const response = await api.post(USUARIO_API, usuario);
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
        const response = await api.patch(`${USUARIO_API}/${id}`, actualizacion);
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
        const response = await api.post(`${USUARIO_API}/salones/${id}`, salon);
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
        const response = await api.post(`${USUARIO_API}/${id}/reservas`, reserva);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Consulta un usuario por su ID.
 * @param {number} id - ID del usuario a consultar.
 * @returns {Promise<Object>} - Datos del usuario.
 */
export async function consultarUsuario(id) {
    try {
        const response = await api.get(`${USUARIO_API}/${id}`);
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
        const response = await api.get(`${USUARIO_API}/${id}/reservas`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}