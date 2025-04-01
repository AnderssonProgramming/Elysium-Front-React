import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PromedioPrioridadChart from "../../../components/Admin/charts/PromedioPrioridadChart";
import { getReservas } from "../../../api/reserva";
import * as d3 from "d3";

const ConsultaPrioridad = () => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    handleBuscar();
  }, []);

  const handleBuscar = async () => {
    try {
      setErrorMsg("");
      setData([]);

      // Consultar TODAS las reservas sin filtros específicos
      const result = await getReservas({});
      if (!result || result.length === 0) {
        setErrorMsg("No se encontraron datos para el promedio de reservas por prioridad.");
        return;
      }

      const reservasPorPrioridad = d3.rollup(
        result,
        (v) => v.length,
        (d) => d.prioridad
      );

      const dataProcesada = Array.from(reservasPorPrioridad, ([priority, count]) => ({
        priority,
        promedio: count / result.length,
      }));

      setData(dataProcesada);
    } catch (error) {
      setErrorMsg(error.message || "Error consultando datos.");
    }
  };

  return (
    <Body>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      <PromedioPrioridadChart data={data} />
    </Body>
  );
};

export default ConsultaPrioridad;

const Body = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 10px 0;
`;