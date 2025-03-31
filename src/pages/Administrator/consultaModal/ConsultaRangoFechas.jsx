import React, { useState } from "react";
import styled from "styled-components";
import RangoFechasFilter from "../../../components/Admin/filters/RangoFechasFilter";
import RangoFechasChart from "../../../components/Admin/charts/RangoFechasChart";
import { getReservas } from "../../../api/reserva";

const ConsultaRangoFechas = ({ token }) => {
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
      }, token);
      if (!data || data.length === 0) {
        setErrorMsg("No se encontraron reservas en el rango de fechas seleccionado.");
      } else {
        setReservas(data);
      }
    } catch (error) {
      setErrorMsg(error.message || "Error consultando reservas");
    }
  };

  return (
    <Container>
      <Body>
        <RangoFechasFilter onBuscar={handleBuscar} />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <RangoFechasChart reservas={reservas} />
      </Body>
    </Container>
  );
};

export default ConsultaRangoFechas;

/* Estilos */
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