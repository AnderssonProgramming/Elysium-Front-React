import { BASE_URL } from "../config/config.js";

const SALON_API = `${BASE_URL}/salones`;

export async function getSalones(filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    const response = await fetch(`${SALON_API}?${queryParams}`);
    if (!response.ok) throw new Error("Error al obtener los salones");
    return response.json();
}

export async function getSalonByMnemonico(mnemonico) {
    const response = await fetch(`${SALON_API}/${mnemonico}`);
    if (!response.ok) throw new Error("Error al obtener el salón");
    return response.json();
}

export async function agregarSalon(salon) {
    const response = await fetch(`${SALON_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salon),
    });
    if (!response.ok) throw new Error("Error al agregar el salón");
}

export async function deshabilitarSalon(mnemonico) {
    const response = await fetch(`${SALON_API}/${mnemonico}/deshabilitar`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al deshabilitar el salón");
}

export async function habilitarSalon(mnemonico) {
    const response = await fetch(`${SALON_API}/${mnemonico}/habilitar`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al habilitar el salón");
}

export async function getDisponible(mnemonico) {
    const response = await fetch(`${SALON_API}/${mnemonico}/disponible`);
    if (!response.ok) throw new Error("Error al consultar la disponibilidad del salón");
    return response.json();
}

export async function setDisponible(mnemonico) {
    const response = await fetch(`${SALON_API}/${mnemonico}/disponible`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al marcar el salón como disponible");
}

export async function setNoDisponible(mnemonico) {
    const response = await fetch(`${SALON_API}/${mnemonico}/noDisponible`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al marcar el salón como no disponible");
}

export async function actualizarSalon(mnemonico, datosActualizados) {
    const response = await fetch(`${SALON_API}/${mnemonico}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados),
    });
    if (!response.ok) throw new Error("Error al actualizar el salón");
}