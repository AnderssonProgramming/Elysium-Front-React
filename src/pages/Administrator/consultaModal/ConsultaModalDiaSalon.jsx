// src/components/Admin/ConsultaModalDiaSalon.js
import React, { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import DiaSalonFilter from "../../../components/Admin/filters/DiaSalonFilter";
import DiaSalonChart from "../../../components/Admin/charts/DiaSalonChart";
import { getReservas } from "../../../api/reserva"; // Asegúrate de que la ruta es correcta

const ConsultaModalDiaSalon = ({ onClose }) => {
    const [reservas, setReservas] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const handleBuscar = async (filtros) => {
      try {
        setErrorMsg("");
        setReservas([]);
        if (!filtros.dia) {
          setErrorMsg("Por favor selecciona un día.");
          return;
        }
        // Llama al endpoint de reservas filtrando solo por día de la semana
        const data = await getReservas({ diaSemana: filtros.dia });
        if (!data || data.length === 0) {
          setErrorMsg("No se encontraron reservas para el día seleccionado.");
        } else {
          setReservas(data);
        }
      } catch (error) {
        setErrorMsg(error.message || "Error consultando reservas");
      }
    };

    return createPortal(
      <Overlay>
        <ModalContainer>
          <ModalHeader>
            <h2>Reservas por Día</h2>
            <CloseButton onClick={onClose}>X</CloseButton>
          </ModalHeader>
          <ModalBody>
            <DiaSalonFilter onBuscar={handleBuscar} />
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <DiaSalonChart reservas={reservas} />
          </ModalBody>
        </ModalContainer>
      </Overlay>,
      document.body
    );
  };

  export default ConsultaModalDiaSalon;

  /* Estilos del modal */
  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  const ModalContainer = styled.div`
    background-color: #fff;
    width: 700px;
    max-width: 90%;
    border-radius: 8px;
    padding: 20px;
  `;

  const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
  `;

  const ModalBody = styled.div`
    margin-top: 10px;
  `;

  const ErrorMessage = styled.div`
    color: red;
    font-weight: bold;
    margin: 10px 0;
  `;