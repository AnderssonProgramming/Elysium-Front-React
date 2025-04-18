import React, { useState, useCallback } from "react";
import styled from "styled-components";
import MesSalonFilter from "../../../components/Admin/filters/MesSalonFilter";
import MesSalonChart from "../../../components/Admin/charts/MesSalonChart";
import { getReservas } from "../../../api/reserva";

const ConsultaMesSalon = () => {
  const [reservas, setReservas] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBuscar = useCallback(async (filtros) => {
    try {
      setErrorMsg("");
      setReservas([]);

      if (!filtros.mes) {
        setErrorMsg("Por favor selecciona un mes.");
        return;
      }
      const data = await getReservas({ mes: filtros.mes });
      if (!data || data.length === 0) {
        setErrorMsg("No se encontraron reservas para el mes seleccionado.");
      } else {
        setReservas(data);
      }
    } catch (error) {
      setErrorMsg(error.message || "Error consultando reservas");
    }
  }, []);

  return (
    <Body>
      <MesSalonFilter onBuscar={handleBuscar} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      <MesSalonChart reservas={reservas} />
    </Body>
  );
};

export default ConsultaMesSalon;

const Body = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 10px 0;
`;