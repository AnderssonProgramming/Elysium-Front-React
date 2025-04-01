import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import TotalSalonFilter from "../../../components/Admin/filters/TotalSalonFilter";
import TotalSalonChart from "../../../components/Admin/charts/TotalSalonChart";
import { getReservas } from "../../../api/reserva";

const ConsultaTotalSalon = () => {
  const [reservas, setReservas] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBuscar =  useCallback(async (filtros) => {
    try {
      setErrorMsg("");
      setReservas([]);
      // Si se envía un filtro de idSalon, se usa; si no, se obtiene la data de todos los salones.
      const data = await getReservas({ ...(filtros.idSalon && { idSalon: filtros.idSalon }) });
      if (!data || data.length === 0) {
        setErrorMsg("No se encontraron reservas para el salón seleccionado.");
      } else {
        setReservas(data);
      }
    } catch (error) {
      setErrorMsg(error.message || "Error consultando reservas");
    }
  }, []);

  useEffect(() => {
    handleBuscar("");
  }, [handleBuscar]);

  return (
    <Container>
      <TotalSalonFilter onBuscar={handleBuscar} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {reservas.length > 0 && <TotalSalonChart reservas={reservas} />}
    </Container>
  );
};

export default ConsultaTotalSalon;

/* Estilos */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 10px 0;
`;