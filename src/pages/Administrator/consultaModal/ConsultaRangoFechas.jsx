import React, { useState, useCallback } from "react";
import styled from "styled-components";
import RangoFechasFilter from "../../../components/Admin/filters/RangoFechasFilter";
import RangoFechasChart from "../../../components/Admin/charts/RangoFechasChart";
import { getReservas } from "../../../api/reserva";

const ConsultaRangoFechas = () => {
  const [reservas, setReservas] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBuscar = useCallback(async (filtros) => {
    try {
      setErrorMsg("");
      setReservas([]);
      if (!filtros.fechaInicio || !filtros.fechaFin) {
        setErrorMsg("Por favor, selecciona ambas fechas.");
        return;
      }
      
      const fechaInicio = new Date(filtros.fechaInicio);
      const fechaFin = new Date(filtros.fechaFin);

      if (fechaInicio > fechaFin) {
        setErrorMsg("La fecha de inicio no puede ser mayor a la fecha de fin.");
        return;
      }

      let currentDate = new Date(fechaInicio);
      const fechasConsulta = [];
      while (currentDate <= fechaFin) {
        fechasConsulta.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const reservasPromises = fechasConsulta.map(fecha =>
        getReservas({ fecha })
      );
      const resultadosDiarios = await Promise.all(reservasPromises);
      
      const reservasAcumuladas = resultadosDiarios.flat();
      
      setReservas(reservasAcumuladas);
    } catch (error) {
      setErrorMsg(error.message || "Error consultando reservas");
    }
  }, []);

  return (
    <Body>
      <RangoFechasFilter onBuscar={handleBuscar} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      <RangoFechasChart reservas={reservas} />
    </Body>
  );
};

export default ConsultaRangoFechas;

const Body = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 10px 0;
`;