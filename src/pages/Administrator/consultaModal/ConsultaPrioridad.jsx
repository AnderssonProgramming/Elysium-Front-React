import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PromedioPrioridadChart from "../../../components/Admin/charts/PromedioPrioridadChart";
import { getReservas } from "../../../api/reserva";

const ConsultaPrioridad = ({ token }) => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
        handleBuscar();
      }, []);
  
  const handleBuscar = async () => {
    try {
      setErrorMsg("");
      setData([]);
      // Se asume que el endpoint interpreta el parámetro "consultarPorPrioridad"
      const filtros = { consultarPorPrioridad: true };
      const result = await getReservas(filtros, token);
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

  return (
    <Container>
      <Body>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <PromedioPrioridadChart data={data} />
      </Body>
    </Container>
  );
};

export default ConsultaPrioridad;

const Container = styled.div`
`;

const Body = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 10px 0;
`;