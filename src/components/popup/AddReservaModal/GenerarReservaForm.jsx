import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { getSalones } from "../../../api/salon";
import { crearReserva } from "../../../api/usuario";
import { getReservas } from "../../../api/reserva";
import "react-day-picker/style.css";
import "./GenerarReservaForm.css";

const FormGenerarReserva = ({ usuario, onClose , onReservaExitosa }) => {
    const [fechaReserva, setFecha] = useState(new Date());
    const [hora, setHora] = useState("");
    const [salones, setSalones] = useState([]);
    const [idSalon, setSalonSeleccionado] = useState("");
    const [duracionBloque, setBloqueTresHoras] = useState(false);
    const [proposito, setProposito] = useState("");
    const [materia, setMateria] = useState("");
    const [prioridad, setPrioridad] = useState("1");
    const [reservas, setReservas] = useState([]);

    const horasDisponibles = [
        { hora: "07:00 AM", valor: 7 },
        { hora: "08:30 AM", valor: 8.5 },
        { hora: "10:00 AM", valor: 10 },
        { hora: "11:30 AM", valor: 11.5 },
        { hora: "01:00 PM", valor: 13 },
        { hora: "02:30 PM", valor: 14.5 },
        { hora: "04:00 PM", valor: 16 },
        { hora: "05:30 PM", valor: 17.5 }
    ];

    const generarFechasDelMes = (mes, año) => {
        const fechas = [];
        const fechaBase = new Date(año, mes - 1, 1);
    
        while (fechaBase.getMonth() === mes - 1) {
            fechas.push(fechaBase.toISOString().split("T")[0]);
            fechaBase.setDate(fechaBase.getDate() + 1); 
        }
    
        return fechas;
    };

    useEffect(() => {
        const cargarSalones = async () => {
            const data = await getSalones();
            setSalones(data);
        };
        cargarSalones();
    }, []);

    useEffect(() => {
        const cargarReservasPorDia = async () => {
            if (idSalon && fechaReserva) {
                try {
                    const filtros = {
                        fecha: fechaReserva.toISOString().split("T")[0],
                    };
                    const data = await getReservas(filtros);
                    const reservasFiltradas = data.filter((reserva) => reserva.idSalon === idSalon);
                    setReservas(reservasFiltradas);
                } catch (error) {
                    console.error("Error al cargar reservas por día:", error);
                }
            }
        };
    
        cargarReservasPorDia();
    }, [idSalon, fechaReserva]);

    const isHoraDisponible = (horaValor) => {
        const ahora = new Date();
        const esHoy = fechaReserva.toDateString() === ahora.toDateString();
        if (esHoy && horaValor <= ahora.getHours() + (ahora.getMinutes() >= 30 ? 0.5 : 0)) {
            return false;
        }
        return !reservas.some(
            (reserva) =>
                reserva.hora === horaValor ||
                (reserva.duracionBloque && reserva.hora === horaValor)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reservaData = {
            fechaReserva: fechaReserva.toISOString().split("T")[0],
            hora: horasDisponibles.find((h) => h.hora === hora).valor,
            diaSemana: fechaReserva.toLocaleDateString('es-ES', { weekday: 'long' }).toUpperCase(),
            proposito,
            materia,
            idSalon,
            duracionBloque,
            prioridad,
        };

        try {
            await crearReserva(usuario.idInstitucional, reservaData);
            onReservaExitosa();
            onClose();
        } catch (error) {
            alert("Error al crear la reserva: " + error.message);
        }
    };

    const areFieldsValid = () => {
        return (
            fechaReserva &&
            hora &&
            idSalon &&
            proposito &&
            materia &&
            prioridad
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="columns">
                <div className="column">
                    <label className={idSalon === "" ? "disabled-label" : ""}>Fecha:</label>
                    <DayPicker
                        mode="single"
                        selected={fechaReserva}
                        onSelect={setFecha}
                        locale={es}
                        footer={
                            fechaReserva ? `Seleccionado: ${fechaReserva.toLocaleDateString('es-ES')}` : "Selecciona un día."
                        }
                        disabled={(date) => idSalon === "" || date.getDay() === 0 || date < new Date(new Date().setHours(0, 0, 0, 0))}
                        disableNavigation={idSalon === ""}
                    />
                </div>
                <div className="column">
                    <label className={idSalon === "" ? "disabled-label" : ""}>Hora:</label>
                    <select value={hora} onChange={(e) => setHora(e.target.value)} disabled={idSalon === ""}>
                        <option value="">Seleccione una hora</option>
                        {horasDisponibles.map((horaDisponible, index) => (
                            <option
                                key={index}
                                value={horaDisponible.hora}
                                disabled={!isHoraDisponible(horaDisponible.valor)}
                            >
                                {horaDisponible.hora}
                            </option>
                        ))}
                    </select>

                    <label>Salón:</label>
                    <div className="salon-picker">
                        {salones.map((salon) => (
                            <div className="item-salon" key={salon.mnemonico}>
                                <input
                                    type="radio"
                                    value={salon.mnemonico}
                                    checked={idSalon === salon.mnemonico}
                                    onChange={(e) => setSalonSeleccionado(e.target.value)}
                                />
                                {salon.nombre}
                            </div>
                        ))}
                        {idSalon === "" && (
                            <p className="error-message">Por favor seleccionar un salón</p>
                        )}
                    </div>
                </div>

                <div className="column">
                    <label className={`checkbox ${idSalon === "" ? "disabled-label" : ""}`}>
                        <input type="checkbox" checked={duracionBloque} onChange={() => setBloqueTresHoras(!duracionBloque)} disabled={idSalon === "" || hora === "05:30 PM"} />
                        Bloque de 3 horas
                    </label>

                    <label className={idSalon === "" ? "disabled-label" : ""}>Propósito:</label>
                    <textarea className="proposito" type="text" value={proposito} onChange={(e) => setProposito(e.target.value)} disabled={idSalon === ""} />

                    <label className={idSalon === "" ? "disabled-label" : ""}>Materia:</label>
                    <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} disabled={idSalon === ""} />

                    <label className={idSalon === "" ? "disabled-label" : ""}>Prioridad:</label>
                    <input 
                        type="number" 
                        value={prioridad} 
                        onChange={(e) => setPrioridad(e.target.value)} 
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }} 
                        min="1" 
                        max="5" 
                        step="1" 
                        disabled={idSalon === ""} 
                    />
                </div>
            </div>
            <button className="reservarBTN" type="submit" disabled={!areFieldsValid()}>Generar Reserva</button>
        </form>
    );
};

export default FormGenerarReserva;