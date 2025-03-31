import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { getSalones } from "../../../api/salon";
import { crearReserva } from "../../../api/usuario";
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
    const [prioridad, setPrioridad] = useState("");

    useEffect(() => {
        const cargarSalones = async () => {
            const data = await getSalones();
            setSalones(data);
        };
        cargarSalones();
    }, []);

    const horasDisponibles = [
        "07:00 AM", "08:30 AM", "10:00 AM", "11:30 AM",
        "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const convertirHoraANumero = (horaStr) => {
            if (!horaStr) return null;
            const [time, meridiem] = horaStr.split(" ");
            let [horas, minutos] = time.split(":").map(Number);
    
            if (meridiem === "PM" && horas !== 12) horas += 12;
            if (meridiem === "AM" && horas === 12) horas = 0;
    
            return minutos === 0 ? horas : horas + minutos / 60;
        };

        const obtenerDiaSemana = (fechaStr) => {
            const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
            return diasSemana[fechaStr.getDay()];
        };
    
        const reservaData = {
            fechaReserva: fechaReserva.toISOString().split("T")[0],
            hora: convertirHoraANumero(hora),
            diaSemana: obtenerDiaSemana(fechaReserva),
            proposito,
            materia,
            idSalon,
            duracionBloque,
            prioridad,
        };

        try {
            const response = await crearReserva(usuario.idInstitucional, reservaData);
            onReservaExitosa();
            onClose();
        } catch (error) {
            alert("Error al crear la reserva: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="columns">
                <div className="column">
                    <label>Fecha:</label>
                    <DayPicker
                        mode="single"
                        selected={fechaReserva}
                        onSelect={setFecha}
                        locale={es}
                        footer={
                            fechaReserva ? `Seleccionado: ${fechaReserva.toLocaleDateString('es-ES')}` : "Selecciona un dia."
                        } />
                </div>
                <div className="column">
                    <label>Hora:</label>
                    <select value={hora} onChange={(e) => setHora(e.target.value)}>
                        <option value="">Seleccione una hora</option>
                        {horasDisponibles.map((hora, index) => (
                            <option key={index} value={hora}>{hora}</option>
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
                    </div>
                </div>

                <div className="column">
                    <label className="checkbox">
                        <input type="checkbox" checked={duracionBloque} onChange={() => setBloqueTresHoras(!duracionBloque)} />
                        Bloque de 3 horas
                    </label>

                    <label>Propósito:</label>
                    <textarea className="proposito" type="text" value={proposito} onChange={(e) => setProposito(e.target.value)} />

                    <label>Materia:</label>
                    <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} />

                    <label>Prioridad:</label>
                    <input type="text" value={prioridad} onChange={(e) => setPrioridad(e.target.value)} />
                </div>
            </div>
            <button className="reservarBTN" type="submit">Generar Reserva</button>
        </form>
    );
};

export default FormGenerarReserva;