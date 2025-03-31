import React from "react";
import { ReactComponent as Trashcan } from '../../../assets/icons/trash-can.svg';
import { deleteReserva } from "../../../api/reserva";
import './EliminarReservaModal.css';

function EliminarReservaModal({ reserva, onClose, hora, onDelete }) {

    const eliminarReserva = async (e, id) => {
        e.preventDefault();

        try {
            const response = await deleteReserva(id);
            onDelete();
            onClose();
        } catch (error) {
            alert("Error eliminando la reserva: " + error.message);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-delete">
                <form onSubmit={(e) => eliminarReserva(e, reserva.idReserva)}>
                    <div className="verification">
                        <div className="header">
                            <span>¿Está seguro que desea eliminar esta reserva?</span>
                        </div>
                        <div className="data">
                            <span><strong>Salón:</strong> {reserva.idSalon}</span>
                            <span><strong>Fecha:</strong> {reserva.fechaReserva}</span>
                            <span><strong>Hora:</strong> {hora}</span>
                        </div>
                    </div>
                    <div className="btns">
                        <button onClick={onClose} className="cancelarBTN">Cancelar</button>
                        <button className="deleteBTN" type="submit" >
                            <Trashcan width="15" height="15"/>
                            Eliminar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EliminarReservaModal;