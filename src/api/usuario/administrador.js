import api from "../../api/axiosInstance";

const ADMIN_API = "/administrador"; // Ya no necesitas BASE_URL aquí

export async function consultarUsuarios(filtros) {
    try {
        const response = await api.get(`${ADMIN_API}/usuarios`, { params: filtros });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al consultar usuarios");
    }
}

export const agregarUsuario = async (datosUsuario) => {
    try {
      const response = await api.post('/api/administrador/usuario', datosUsuario);
      return response.data;
    } catch (error) {
      // Extraer la información de error detallada
      const mensaje = error.response?.data?.message || 'Error al agregar usuario';
      const codigo = error.response?.data?.code || 'UNKNOWN_ERROR';
      const status = error.response?.status || 500;
      
      // Crear un error enriquecido para mejor manejo en UI
      const errorEnriquecido = new Error(mensaje);
      errorEnriquecido.codigo = codigo;
      errorEnriquecido.status = status;
      errorEnriquecido.data = error.response?.data;
      
      console.error('Error detallado:', {
        codigo,
        status,
        mensaje,
        respuestaCompleta: error.response?.data
      });
      
      throw errorEnriquecido;
    }
  };

export async function actualizarInformacionUsuario(id, actualizacion) {
    try {
        const response = await api.patch(`${ADMIN_API}/usuario/${id}`, actualizacion);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al actualizar usuario");
    }
}

export async function agregarSalon(id, salon) {
    try {
        const response = await api.post(`${ADMIN_API}/${id}/salon`, salon);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al agregar salón");
    }
}

export async function crearReserva(id, reserva) {
    try {
        const response = await api.post(`${ADMIN_API}/${id}/reserva`, reserva);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear reserva");
    }
}
