import React, { useState, useEffect } from "react";
import { listarReservas } from "../../api/usuario/estandar.js";
import './Home.css'

/**
 * Componente Home: muestra la lista de reservas activas de un usuario.
 * 
 * @component
 * @returns {JSX.Element} JSX que representa la interfaz de reservas del usuario.
 */
function Home() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Obtiene la lista de reservas del usuario desde la API.
     * Se ejecuta solo una vez cuando el componente se monta.
     * 
     * @async
     * @function fetchReservas
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const fetchReservas = async () => {
            try {
                // TODO: Reemplazar el ID de usuario con un valor dinámico basado en autenticación
                const data = await listarReservas(1000098);
                setReservas(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        }

        fetchReservas();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home">
            <div className="reservas">
                <h1>Reservas</h1>
                <span>{reservas.length} activas</span>
            </div>
            <div className="reserva-lista">
                <ul>
                    {reservas.map((reserva) => (
                        <li key={reserva.idReserva}>
                            <p><strong>Salon:</strong> {reserva.idSalon}</p>
                            <p><strong>Hora:</strong> {reserva.hora}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;