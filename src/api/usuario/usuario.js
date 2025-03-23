import { BASE_URL } from "../../config/config.js";

const USUARIO_API = `${BASE_URL}/usuario`;

export async function consultarUsuario(id) {
    const response = await fetch(`${USUARIO_API}/${id}`);
    if (!response.ok) throw new Error("Usuario no encontrado");
    return response.json();
}