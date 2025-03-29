// src/components/Admin/filters/DiaSalonFilter.js
import React, { useState } from "react";
import styled from "styled-components";

const DiaSalonFilter = ({ onBuscar }) => {
  const [dia, setDia] = useState("");

  const handleBuscar = () => {
    if (!dia) {
      alert("Por favor selecciona un día");
      return;
    }
    onBuscar({ dia });
  };

  return (
    <Container>
      <Row>
        <Label>Día de la semana:</Label>
        <Select value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="">-- Selecciona un día --</option>
          <option value="LUNES">Lunes</option>
          <option value="MARTES">Martes</option>
          <option value="MIERCOLES">Miércoles</option>
          <option value="JUEVES">Jueves</option>
          <option value="VIERNES">Viernes</option>
          <option value="SABADO">Sábado</option>
          <option value="DOMINGO">Domingo</option>
        </Select>
      </Row>
      <Button onClick={handleBuscar}>Buscar Reservas</Button>
    </Container>
  );
};

export default DiaSalonFilter;

const Container = styled.div`
  margin-bottom: 20px;
`;

const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #1e1e1e;
`;

const Select = styled.select`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
`;

const Button = styled.button`
  background-color: #52b69a;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
