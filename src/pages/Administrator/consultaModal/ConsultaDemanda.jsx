import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DemandaChart from "../../../components/Admin/charts/DemandaChart";
import { getReservas } from "../../../api/reserva";

const ConsultaDemanda = () => {
  const [reservas, setReservas] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    handleBuscar();
  }, []);

  const handleBuscar = async () => {
    try {
      setErrorMsg("");
      setReservas([]);

      // No se envían filtros; se obtiene el total de reservas
      const data = await getReservas({});
      if (!data || data.length === 0) {
        setErrorMsg("No se encontraron reservas para mostrar la demanda.");
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
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <DemandaChart reservas={reservas} />
      </Body>
    </Container>
  );
};

export default ConsultaDemanda;

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