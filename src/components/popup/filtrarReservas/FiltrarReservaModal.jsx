import React, { useEffect, useState } from "react";
import { getReservas } from "../../../api/reserva";
import { getSalones } from  "../../../api/salon";
import { consultarUsuario } from "../../../api/usuario/estandar";
import { motion } from "framer-motion";
import "./FiltrarReservaModal.css";

const horas = [7, 8.5, 10, 11.5, 13, 14.5, 16, 17.5];
const dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
const diasFormateados = {
    "LUNES": "Lunes",
    "MARTES": "Martes",
    "MIERCOLES": "Miércoles",
    "JUEVES": "Jueves",
    "VIERNES": "Viernes",
    "SABADO": "Sábado"
};

function convertirHora(hora) {
    const horaEntera = Math.floor(hora);
    const minutos = (hora % 1) * 60;
    return `${horaEntera.toString().padStart(2, '0')}:${minutos === 0 ? '00' : '30'}`;
}

function obtenerFechasSemana(offset = 0) {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + offset * 7);
    const diaSemana = hoy.getDay();
    const fechasSemana = [];
    for (let i = 1; i <= 6; i++) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() - diaSemana + i);
        fechasSemana.push(fecha.toISOString().split("T")[0]);
    }
    return fechasSemana;
}

function obtenerRangoSemana(offset = 0) {
    const fechas = obtenerFechasSemana(offset);
    const primeraFecha = new Date(fechas[0]);
    const ultimaFecha = new Date(fechas[fechas.length - 1]);
    return `${primeraFecha.getDate()} - ${ultimaFecha.getDate()} de ${ultimaFecha.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}`;
}

function FiltrarReservaModal({ onClose }) {
    const [reservas, setReservas] = useState([]);
    const [salones, setSalones] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [semanaOffset, setSemanaOffset] = useState(0);
    const [filtro, setFiltro] = useState("general");
    const [salonSeleccionado, setSalonSeleccionado] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");


    const actualizarReservas = async (offset) => {
        try {
            const fechasSemana = obtenerFechasSemana(offset);
            const reservasSemana = await Promise.all(
                fechasSemana.map(fecha => getReservas({ fecha }))
            );
            
            const reservasActivas = await getReservas({ estado: "ACTIVA" });
            const reservasFiltradas = reservasSemana.flat().filter(reserva =>
                reservasActivas.some(activa => activa.id === reserva.id)
            );
            
            setReservas(reservasFiltradas);

            const profesoresPromises = reservasFiltradas.map(reserva => consultarUsuario(reserva.idUsuario));
            const profesoresData = await Promise.all(profesoresPromises);
            
            const profesoresMap = {};
            reservasFiltradas.forEach((reserva, index) => {
                profesoresMap[reserva.idUsuario] = profesoresData[index];
            });
    
            setProfesores(profesoresMap);
        } catch (error) {
            console.error("Error al obtener las reservas:", error);
        }
    };

    useEffect(() => {
        actualizarReservas(semanaOffset);
    }, [semanaOffset]);

    useEffect(() => {
        const fetchSalones = async () => {
            try {
                const response = await getSalones();
                setSalones(response);
            } catch (error) {
                console.error("Error al obtener los salones:", error);
            }
        };
    
        fetchSalones();
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-filtrar-reserva">
                <motion.div
                    key={filtro}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="title">
                        <div className="title-name">
                            {filtro === "idSalon" ? (
                                <span>Reserva por salon: { salones.find(s => s.mnemonico === salonSeleccionado)?.nombre }</span>
                            ) : filtro === "diaSemana" ? (
                                <span>Reserva por día: { diasFormateados[fechaSeleccionada] }</span>
                            ) : (
                                <span>Calendario de reservas</span>
                            )}
                        </div>
                        <button onClick={onClose} className="close-btn">✖</button>
                    </div> 
                    <div className="reserva-content">
                        <div className="controls">
                            <div className="semana-controls">
                                <button onClick={() => setSemanaOffset(prev => {
                                    const nuevoOffset = prev - 1;
                                    actualizarReservas(nuevoOffset);
                                    return nuevoOffset;
                                })}> { "<" } </button>
                                <button onClick={() => setSemanaOffset(prev => {
                                    const nuevoOffset = prev + 1;
                                    actualizarReservas(nuevoOffset);
                                    return nuevoOffset;
                                })}>{ ">" }</button>
                                <span className="semana-rango">{obtenerRangoSemana(semanaOffset)}</span>
                            </div>
                            <div className="filtros">
                                <label>Filtrar por:</label>
                                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                                    <option value="general">General</option>
                                    <option value="diaSemana">Por Día</option>
                                    <option value="idSalon">Por Salón</option>
                                </select>
                                {filtro === "idSalon" && (
                                    <select
                                        value={salonSeleccionado}
                                        onChange={(e) => setSalonSeleccionado(e.target.value)}
                                    >
                                        <option value="">Seleccione un salón</option>
                                        {salones.map(salon => (
                                            <option key={salon.mnemonico} value={salon.mnemonico}>{salon.nombre}</option>
                                        ))}
                                    </select>
                                )}
                                {filtro === "diaSemana" && (
                                    <select
                                        value={fechaSeleccionada}
                                        onChange={(e) => setFechaSeleccionada(e.target.value)}
                                    >
                                        <option value="">Seleccione un día</option>
                                        {dias.map(dia => (
                                            <option key={dia} value={dia}>{diasFormateados[dia]}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                        <div className="event-calendar">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hora</th>
                                        {filtro === "diaSemana"
                                            ? horas.map(hora => <th key={hora}>{convertirHora(hora)}</th>)
                                            : dias.map(dia => <th key={dia}>{diasFormateados[dia]}</th>)
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtro === "diaSemana"
                                        ? salones.map(salon => (
                                            <tr key={salon.mnemonico}>
                                                <td>{salon.nombre}</td>
                                                {horas.map(hora => (
                                                    <td key={hora} className="horario-celda">
                                                        {reservas.filter(r => r.idSalon === salon.mnemonico && r.hora === hora && r.diaSemana === fechaSeleccionada).map(r => (
                                                            <div className="reserva-bloque" key={r.id}>
                                                                <div className="bloque-inside">{r.materia ? r.materia : "Sin definir"}</div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                        : horas.map(hora => (
                                            <tr key={hora}>
                                                <td className="hora-table">{convertirHora(hora)}</td>
                                                {dias.map(dia => (
                                                    <td key={dia} className="horario-celda">
                                                        {reservas.filter(r => r.diaSemana === dia && r.hora === hora && (filtro !== "idSalon" || r.idSalon === salonSeleccionado)).map(r => (
                                                            <div className="reserva-bloque" key={r.id}>
                                                                <div className="bloque-inside">
                                                                    {filtro === "idSalon" ? (r.materia ? r.materia : "Sin definir") : r.idSalon}
                                                                </div>
                                                                {filtro === "idSalon" && (
                                                                    <div className="profesor">
                                                                        {profesores[r.idUsuario] ? profesores[r.idUsuario].nombre : "Sin nombre"}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </motion.div>
            </div>
        </div>
    );
}

export default FiltrarReservaModal;