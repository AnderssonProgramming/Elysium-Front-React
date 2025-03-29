// src/components/Admin/ConsultaModalRangoFechas.js
import React, { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import RangoFechasFilter from "../../../components/Admin/filters/RangoFechasFilter";
import RangoFechasChart from "../../../components/Admin/charts/RangoFechasChart";
import { getReservas } from "../../../api/reserva"; // Ajusta la ruta según tu estructura

const ConsultaModalRangoFechas = ({ onClose }) => {
  const [reservas, setReservas] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBuscar = async (filtros) => {
    try {
      setErrorMsg("");
      setReservas([]);
      if (!filtros.fechaInicio || !filtros.fechaFin) {
        setErrorMsg("Por favor, selecciona ambas fechas.");
        return;
      }
      // Se llama al endpoint con los parámetros fechaInicio y fechaFin
      const data = await getReservas({ 
        fechaInicio: filtros.fechaInicio, 
        fechaFin: filtros.fechaFin 
      });
      if (!data || data.length === 0) {
        setErrorMsg("No se encontraron reservas en el rango de fechas seleccionado.");
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
          <h2>Reservas por Rango de Fechas</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <RangoFechasFilter onBuscar={handleBuscar} />
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <RangoFechasChart reservas={reservas} />
        </ModalBody>
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default ConsultaModalRangoFechas;

/* Estilos del modal */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
