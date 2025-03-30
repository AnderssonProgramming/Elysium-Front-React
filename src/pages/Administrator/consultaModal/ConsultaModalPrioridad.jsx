// src/components/Admin/ConsultaModalPrioridad.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import PrioridadFilter from "../../../components/Admin/filters/PrioridadFilter";
import PromedioPrioridadChart from "../../../components/Admin/charts/PromedioPrioridadChart";
import { getReservas } from "../../../api/reserva"; // Ajusta la ruta según tu estructura

const ConsultaModalPrioridad = ({ onClose }) => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBuscar = async () => {
    try {
      setErrorMsg("");
      setData([]);
      // Se asume que el endpoint interpreta el parámetro "consultarPorPrioridad"
      const filtros = { consultarPorPrioridad: true };
      const result = await getReservas(filtros);
      if (!result || result.length === 0) {
        setErrorMsg("No se encontraron datos para el promedio de reservas por prioridad.");
      } else {
        // Se asume que cada objeto viene con { priority, promedio }
        setData(result);
      }
    } catch (error) {
      setErrorMsg(error.message || "Error consultando datos.");
    }
  };

  return createPortal(
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <h2>Promedio de Reservas por Prioridad</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <PrioridadFilter onBuscar={handleBuscar} />
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <PromedioPrioridadChart data={data} />
        </ModalBody>
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default ConsultaModalPrioridad;

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