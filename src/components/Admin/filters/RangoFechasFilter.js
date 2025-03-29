// src/components/Admin/filters/RangoFechasFilter.js
import React, { useState } from "react";
import styled from "styled-components";

const RangoFechasFilter = ({ onBuscar }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleBuscar = () => {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
    onBuscar({ fechaInicio, fechaFin });
  };

  return (
    <Container>
      <Row>
        <Label>Fecha Inicio:</Label>
        <Input 
          type="date" 
          value={fechaInicio} 
          onChange={(e) => setFechaInicio(e.target.value)} 
        />
      </Row>
      <Row>
        <Label>Fecha Fin:</Label>
        <Input 
          type="date" 
          value={fechaFin} 
          onChange={(e) => setFechaFin(e.target.value)} 
        />
      </Row>
      <Button onClick={handleBuscar}>Buscar Reservas</Button>
    </Container>
  );
};

export default RangoFechasFilter;

const Container = styled.div`
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #1e1e1e;
`;
const Input = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Button = styled.button`
  background-color: #52b69a;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
