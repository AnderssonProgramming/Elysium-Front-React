import { BASE_URL } from "../config/config.js";

const RESERVA_API = `${BASE_URL}/reserva`;

export async function consultarReservas() {
    const response = await fetch(`${RESERVA_API}/consultarReservas`);
    if (!response.ok) throw new Error("Error al obtener las reservas");
    return response.json();
}

export async function consultarReservasPorSalon(idSalon) {
    const response = await fetch(`${RESERVA_API}/consultarReservasPorSalon?idSalon=${idSalon}`);
    if (!response.ok) throw new Error("Error al obtener las reservas por salón");
    return response.json();
}

export async function consultarReservasPorFecha(fecha) {
    const response = await fetch(`${RESERVA_API}/consultarReservasPorFecha?fecha=${fecha}`);
    if (!response.ok) throw new Error("Error al obtener las reservas por fecha");
    return response.json();
}

export async function consultarReservasPorDiaSemana(diaSemana) {
    const response = await fetch(`${RESERVA_API}/consultarReservasPorDiaSemana?diaSemana=${diaSemana}`);
    if (!response.ok) throw new Error("Error al obtener las reservas por día de la semana");
    return response.json();
}

export async function consultarReservasPorEstado(estado) {
    const response = await fetch(`${RESERVA_API}/consultarReservasPorEstado?estado=${estado}`);
    if (!response.ok) throw new Error("Error al obtener las reservas por estado");
    return response.json();
}

export async function consultarReservasPorDuracionBloque(duracionBloque) {
    const response = await fetch(`${RESERVA_API}/consultarReservasPorDuracionBloque?duracionBloque=${duracionBloque}`);
    if (!response.ok) throw new Error("Error al obtener las reservas por duración de bloque");
    return response.json();
}

export async function consultarReserva(idReserva) {
    const response = await fetch(`${RESERVA_API}/consultarReserva?idReserva=${idReserva}`);
    if (!response.ok) throw new Error("Error al obtener la reserva");
    return response.json();
}

export async function crearReserva(reserva) {
    const response = await fetch(`${RESERVA_API}/crearReserva`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
    });
    if (!response.ok) throw new Error("Error al crear la reserva");
}

export async function actualizarReserva(reserva) {
    const response = await fetch(`${RESERVA_API}/actualizarReserva`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
    });
    if (!response.ok) throw new Error("Error al actualizar la reserva");
}

export async function deleteReserva(idReserva) {
    const response = await fetch(`${RESERVA_API}/${idReserva}/deleteReserva`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar la reserva");
}

export async function cancelReserva(idReserva) {
    const response = await fetch(`${RESERVA_API}/${idReserva}/cancelReserva`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al cancelar la reserva");
}

export async function rechazarReserva(idReserva) {
    const response = await fetch(`${RESERVA_API}/${idReserva}/rechazarReserva`, { method: "PUT" });
    if (!response.ok) throw new Error("Error al rechazar la reserva");
}