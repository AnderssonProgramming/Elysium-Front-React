import { BASE_URL } from "../config/config.js";

const RECURSO_API = `${BASE_URL}/recurso`;

export async function consultarRecursos() {
    const response = await fetch(`${RECURSO_API}/consultarRecursos`);
    if (!response.ok) throw new Error("Error al obtener los recursos");
    return response.json();
}

export async function consultarNombre(nombre) {
    const response = await fetch(`${RECURSO_API}/consultarNombre?nombre=${encodeURIComponent(nombre)}`);
    if (!response.ok) throw new Error("Error al obtener el recurso por nombre");
    return response.json();
}

export async function consultarCantidad(cantidad) {
    const response = await fetch(`${RECURSO_API}/consultarCantidad?cantidad=${cantidad}`);
    if (!response.ok) throw new Error("Error al obtener los recursos por cantidad");
    return response.json();
}

export async function consultarEspecificaciones(especificaciones) {
    const response = await fetch(`${RECURSO_API}/consultarEspecificaciones?especificaciones=${encodeURIComponent(especificaciones)}`);
    if (!response.ok) throw new Error("Error al obtener los recursos por especificaciones");
    return response.json();
}

export async function consultarRecurso(id) {
    const response = await fetch(`${RECURSO_API}/consultarRecurso?id=${id}`);
    if (!response.ok) throw new Error("Error al obtener el recurso");
    return response.json();
}

export async function agregarRecurso(recurso) {
    const response = await fetch(`${RECURSO_API}/agregarRecurso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recurso),
    });
    if (!response.ok) throw new Error("Error al agregar el recurso");
}

export async function actualizarRecurso(recurso) {
    const response = await fetch(`${RECURSO_API}/actualizarRecurso`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recurso),
    });
    if (!response.ok) throw new Error("Error al actualizar el recurso");
}

export async function eliminarRecurso(id) {
    const response = await fetch(`${RECURSO_API}/${id}/eliminarRecurso`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar el recurso");
}