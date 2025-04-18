import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EstadoChart from "../../../components/Admin/charts/EstadoChart";
import { getReservas } from "../../../api/reserva";

const ConsultaEstado = () => {
  const [reservas, setReservas] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
      handleBuscar();
    }, []);

  const handleBuscar = async () => {
    try {
      setErrorMsg("");
      setReservas([]);
      // Llamar al endpoint de reservas sin filtro específico de estado
      const data = await getReservas({});
      if (!data || data.length === 0) {
        setErrorMsg("No se encontraron reservas.");
      } else {
        setReservas(data);
      }
    } catch (error) {
      setErrorMsg(error.message || "Error consultando reservas");
    }
  };

  return (
    <Body>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {reservas.length > 0 && <EstadoChart reservas={reservas} />}
    </Body>
  );
};

export default ConsultaEstado;

const Body = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 10px 0;
`;