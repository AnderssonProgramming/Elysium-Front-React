import React, { useState } from "react";
import styled from "styled-components";
import DiaSalonFilter from "../../../components/Admin/filters/DiaSalonFilter";
import DiaSalonChart from "../../../components/Admin/charts/DiaSalonChart";
import { getReservas } from "../../../api/reserva";

const ConsultaDiaSalon = ({ token }) => {
    const [reservas, setReservas] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const handleBuscar = async (filtros) => {
      try {
        setErrorMsg("");
        setReservas([]);
        if (!filtros.dia) {
          setErrorMsg("Por favor selecciona un día.");
          return;
        }
        // Llama al endpoint de reservas filtrando solo por día de la semana
        const data = await getReservas({diaSemana: filtros.dia}, token);
        if (!data || data.length === 0) {
          setErrorMsg("No se encontraron reservas para el día seleccionado.");
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
          <DiaSalonFilter onBuscar={handleBuscar} />
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <DiaSalonChart reservas={reservas} />
        </Body>
      </Container>
    );
};

export default ConsultaDiaSalon;

/* Estilos del contenedor */
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