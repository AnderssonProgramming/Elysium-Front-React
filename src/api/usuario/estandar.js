import { BASE_URL } from "../../config/config.js";

const ESTANDAR_API = `${BASE_URL}/estandar`;

export async function crearReserva(id, fechaInicio, proposito, mnemonico) {
    const formData = new URLSearchParams();
    formData.append("id", id);
    formData.append("fechaInicio", fechaInicio);
    formData.append("proposito", proposito);
    formData.append("mnemonico", mnemonico);

    const response = await fetch(`${ESTANDAR_API}/crearReserva`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    });

    if (!response.ok) throw new Error("Error al crear la reserva");
    return response.json();
}