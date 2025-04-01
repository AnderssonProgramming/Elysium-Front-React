import React, { useState, useEffect, useCallback  } from "react";
import { listarReservas } from "../../api/usuario";
import { getSalonByMnemonico } from "../../api/salon";
import { ReactComponent as Trashcan } from '../../assets/icons/trash-can.svg';
import { ReactComponent as Note } from '../../assets/icons/note-medical_9856368 1.svg';
import imagenQuemada from '../../assets/images/D-310.png';
import AddReservaModal from "../../components/popup/AddReservaModal/AddReservaModal";
import DetalleReservaModal from "../../components/popup/DetalleReservaModal/DetalleReservaModal";
import EliminarReservaModal from "../../components/popup/EliminarReservaModal/EliminarReservaModal";
import './Home.css'

/**
 * Componente Home: muestra la lista de reservas activas de un usuario.
 * 
 * @component
 * @returns {JSX.Element} JSX que representa la interfaz de reservas del usuario.
 */
function Home({ usuario }) {
    const [reservas, setReservas] = useState([]);
    const [salones, setSalones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coloresReservas, setColoresReservas] = useState({});
    const [popup, setPopup] = useState({ tipo: "", reserva: null });

    /**
     * Paleta de colores opacos en formato RGBA.
     * Estos colores se aplicarán aleatoriamente como fondo de cada reserva.
     * 
     * @type {Array<string>}
     */
    const obtenerColorAleatorio = () => {
        const colores = [
            ['rgba(233, 231, 253, 1)', 'rgba(161, 151, 254, 1)'],
            ['rgba(254, 228, 203, 1)', 'rgba(255, 167, 83, 1)'],
            ['rgba(200, 247, 220, 1)', 'rgba(78, 205, 132, 1)'],
            ['rgba(219, 246, 253, 1)', 'rgba(76, 150, 169, 1)'],
            ['rgba(255, 211, 226, 1)', 'rgba(229, 85, 134, 1)'],
        ];
        const indiceAleatorio = Math.floor(Math.random() * colores.length);
        return {
            colorOpaco: colores[indiceAleatorio][0],
            colorOscuro: colores[indiceAleatorio][1]
        };
    };

    const abrirPopup = (tipo, reserva = null) => setPopup({ tipo, reserva });
    const cerrarPopup = () => setPopup({ tipo: "", reserva: null });

    /**
     * Formatea una fecha en formato "YYYY-MM-DD" a "Mes día, año" en español.
     *
     * @param {string} fecha - La fecha en formato "YYYY-MM-DD".
     * @returns {string} La fecha formateada como "Marzo 20, 2025".
     *
     * @example
     * console.log(formatearFecha("2025-03-20")); // "Marzo 20, 2025"
     */
    const formatearFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        const mes = fechaObj.toLocaleString('es-ES', { month: 'long' });
        const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
        const dia = fechaObj.getDate();
        const año = fechaObj.getFullYear();
        return `${mesCapitalizado} ${dia}, ${año}`;
    };

    /**
     * Convierte un número decimal de hora en un formato de 24 horas y calcula el rango de tiempo según la duración.
     *
     * @param {number} hora - La hora en formato decimal (por ejemplo, 14.3 representa las 14:30).
     * @param {boolean} duracionBloque - Indica si la reserva dura 3 horas (true) o 1.5 horas (false).
     * @returns {string} La hora formateada en el formato "HH:MM - HH:MMpm".
     *
     * @example
     * console.log(formatearHora(14.3, true));  // "14:30 - 17:30pm"
     * console.log(formatearHora(14.3, false)); // "14:30 - 16:00pm"
     */
    const formatearHora = (hora, duracionBloque) => {
        const horas = Math.floor(hora);
        const minutos = Math.round((hora % 1) * 60);
        const duracion = duracionBloque ? 180 : 90;
        const fechaInicio = new Date(0, 0, 0, horas, minutos);
        const fechaFin = new Date(fechaInicio.getTime() + duracion * 60000);

        const formatoHora = (date) => 
            `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        return `${formatoHora(fechaInicio)} - ${formatoHora(fechaFin)}pm`;
    };

    /**
     * Obtiene la lista de reservas del usuario desde la API.
     * Se ejecuta solo una vez cuando el componente se monta.
     * 
     * @async
     * @function fetchReservas
     * @returns {Promise<void>}
     */
    const fetchReservas = useCallback(async () => {
        if (!usuario) return;

        try {
            const { reservas } = await listarReservas(usuario.idInstitucional);
            const reservasOrdenadas = reservas.sort((a, b) => {
                const fechaA = new Date(a.fechaReserva);
                const fechaB = new Date(b.fechaReserva);
    
                if (fechaA.getTime() === fechaB.getTime()) {
                    return a.hora - b.hora; 
                }
                return fechaA - fechaB;
            });
    
            setReservas(reservasOrdenadas);
            const nuevosColores = {};
            reservas.forEach(reserva => {
                nuevosColores[reserva.idReserva] = obtenerColorAleatorio();
            });
            setColoresReservas(nuevosColores);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); 
        }
    }, [usuario]);
    
    useEffect(() => {
        fetchReservas();
    }, [fetchReservas]);

    
    useEffect(() => {
        const fetchSalones = async () => {
            if (reservas.length === 0) return;

            try {
                const mnemonicosUnicos = [...new Set(reservas.map(reserva => reserva.idSalon))];
                const salonesData = await Promise.all(mnemonicosUnicos.map(mnemonico => getSalonByMnemonico(mnemonico)));
                const salonesMap = {};
                salonesData.forEach(salon => {
                    salonesMap[salon.mnemonico] = salon;
                });
                setSalones(salonesMap);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSalones();
    }, [reservas]); 

    if (loading) { return <div>Cargando...</div>;}
    if (error) { return <div>{error}</div>;}

    return (
        <div className="home">
            <div className="reservas">
                <div className="title">
                    <h1>Reservas</h1>
                    <span>{reservas.filter(reserva => reserva.estado === "ACTIVA").length} activas</span>
                </div>
                <div className="agregarReserva">
                    <button className="agregarReservaBTN" onClick={() => abrirPopup("nuevaReserva")}>
                        <Note />
                        <span>Nueva reserva</span>
                    </button>
                </div>
            </div>

            <ul className="reserva-lista">
                {reservas
                    .filter(reserva => reserva.estado === "ACTIVA")
                    .map((reserva) => {
                    if (!coloresReservas[reserva.idReserva]) {
                        setColoresReservas((prev) => ({
                            ...prev,
                            [reserva.idReserva]: obtenerColorAleatorio(),
                        }));
                    }
                
                const { colorOpaco, colorOscuro } = coloresReservas[reserva.idReserva];

                return (
                    <li key={reserva.idReserva} className="item-reserva" style={{ backgroundColor: colorOpaco }}>
                        <div
                            className="salon-header"
                            style={{
                                backgroundImage: `url(${imagenQuemada})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="salon-mnemonico">
                                <span style={{ color: colorOscuro }}>{reserva.idSalon}</span>
                            </div>
                        </div>

                        <div className="salon-content">
                            <div className="fecha-reserva">
                                <p className="fecha">{formatearFecha(reserva.fechaReserva)}</p>
                            </div>

                            <div className="datos-reserva">
                                <span className="nombre">{salones[reserva.idSalon]?.nombre || reserva.idSalon}</span>
                                <span className="subtitulo">{reserva.materia ? reserva.materia : "No especificada"}</span>
                            </div>
                        </div>

                        <div className="salon-detalle">
                            <div className="hora-detalle">
                                <div className="horasvg">
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <circle cx="50%" cy="50%" r="40%" fill="white" />
                                        <circle cx="50%" cy="50%" r="20%" fill={colorOscuro} />
                                    </svg>
                                </div>
                                <span className="hora" style={{ color: colorOscuro }} >{formatearHora(reserva.hora, reserva.duracionBloque)}</span>
                            </div>
                            <div className="btns">
                                <button className="detalle" onClick={() => abrirPopup("detalle", reserva)} style={{ color: colorOscuro }}>Ver detalle</button>
                                <button className="trsh" onClick={() => abrirPopup("eliminar", reserva)}><Trashcan width="15" height="15" /></button>
                            </div>
                        </div>
                    </li>
                );
                })}
            </ul>

            {popup.tipo === "nuevaReserva" && <AddReservaModal usuario={usuario} onClose={cerrarPopup} onReservaExitosa={fetchReservas} />}
            {popup.tipo === "detalle" && popup.reserva && <DetalleReservaModal
                reserva={popup.reserva}
                salones={salones} 
                hora={ formatearHora(popup.reserva.hora, popup.reserva.duracionBloque) }
                onClose={cerrarPopup} />}
            {popup.tipo === "eliminar" && popup.reserva &&<EliminarReservaModal
                reserva={popup.reserva}
                onClose={cerrarPopup}
                hora={ formatearHora(popup.reserva.hora, popup.reserva.duracionBloque) }
                onDelete={ fetchReservas }
            />}
        </div>
    );
}

export default Home;