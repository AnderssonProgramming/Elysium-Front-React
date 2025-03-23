import { BASE_URL } from "../../config/config.js";

const ADMIN_API = `${BASE_URL}/administrador`;

export async function consultarUsuarios(activo = null, isAdmin = null) {
    let url = ADMIN_API;
    const params = new URLSearchParams();
    if (activo !== null) params.append("activo", activo);
    if (isAdmin !== null) params.append("isAdmin", isAdmin);
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    return response.json();
}

export async function agregarUsuario(usuario) {
    const response = await fetch(`${ADMIN_API}/agregarUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
    });

    if (!response.ok) throw new Error("Error al agregar usuario");
}

export async function actualizarInformacionUsuario(id, actualizacion) {
    const response = await fetch(`${ADMIN_API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizacion),
    });

    if (!response.ok) throw new Error("Error al actualizar usuario");
}

export async function habilitarUsuario(id) {
    const response = await fetch(`${ADMIN_API}/${id}/habilitarUsuario`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al habilitar usuario");
}

export async function deshabilitarUsuario(id) {
    const response = await fetch(`${ADMIN_API}/${id}/deshabilitarUsuario`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al deshabilitar usuario");
}

export async function hacerAdmin(id) {
    const response = await fetch(`${ADMIN_API}/${id}/hacerAdmin`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al convertir usuario en administrador");
}

export async function quitarAdmin(id) {
    const response = await fetch(`${ADMIN_API}/${id}/quitarAdmin`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al remover privilegios de administrador");
}