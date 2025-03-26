import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSalones } from "../../api/salon";

const FormGenerarReserva = () => {
    const [fecha, setFecha] = useState(new Date());
    const [hora, setHora] = useState("");
    const [salones, setSalones] = useState([]);
    const [salonSeleccionado, setSalonSeleccionado] = useState("");
    const [bloqueTresHoras, setBloqueTresHoras] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ fecha, hora, salonSeleccionado, bloqueTresHoras, proposito, materia, prioridad });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Fecha:</label>
            <DatePicker selected={fecha} onChange={(date) => setFecha(date)} dateFormat="yyyy-MM-dd" />

            <label>Hora:</label>
            <select value={hora} onChange={(e) => setHora(e.target.value)}>
                <option value="">Seleccione una hora</option>
                {horasDisponibles.map((hora, index) => (
                    <option key={index} value={hora}>{hora}</option>
                ))}
            </select>

            <label>Salón:</label>
            <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc", padding: "5px" }}>
                {salones.map((salon) => (
                    <div key={salon.mnemonico}>
                        <input
                            type="radio"
                            value={salon.mnemonico}
                            checked={salonSeleccionado === salon.mnemonico}
                            onChange={(e) => setSalonSeleccionado(e.target.value)}
                        />
                        {salon.nombre}
                    </div>
                ))}
            </div>

            <label>
                <input type="checkbox" checked={bloqueTresHoras} onChange={() => setBloqueTresHoras(!bloqueTresHoras)} />
                ¿Es bloque de 3 horas?
            </label>

            <label>Propósito:</label>
            <input type="text" value={proposito} onChange={(e) => setProposito(e.target.value)} />

            <label>Materia:</label>
            <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} />

            <label>Prioridad:</label>
            <input type="text" value={prioridad} onChange={(e) => setPrioridad(e.target.value)} />

            <button type="submit">Generar Reserva</button>
        </form>
    );
};

export default FormGenerarReserva;