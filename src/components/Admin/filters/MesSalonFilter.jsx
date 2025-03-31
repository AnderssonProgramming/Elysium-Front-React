// src/components/Admin/filters/MesSalonFilter.jsx
import React, { useState } from "react";
import styled from "styled-components";

const MesSalonFilter = ({ onBuscar }) => {
  const [mes, setMes] = useState("");

  const handleBuscar = () => {
    if (!mes) return;
    // El valor seleccionado ya viene en formato "YYYY-MM"
    onBuscar({ mes });
  };

  return (
    <Container>
      <Row>
        <Label>Mes:</Label>
        <Select value={mes} onChange={(e) => setMes(e.target.value)}>
          <option value="">-- Selecciona un mes --</option>
          <option value="2025-01">Enero 2025</option>
          <option value="2025-02">Febrero 2025</option>
          <option value="2025-03">Marzo 2025</option>
          <option value="2025-04">Abril 2025</option>
          <option value="2025-05">Mayo 2025</option>
          <option value="2025-06">Junio 2025</option>
          <option value="2025-07">Julio 2025</option>
          <option value="2025-08">Agosto 2025</option>
          <option value="2025-09">Septiembre 2025</option>
          <option value="2025-10">Octubre 2025</option>
          <option value="2025-11">Noviembre 2025</option>
          <option value="2025-12">Diciembre 2025</option>
        </Select>
      </Row>
      <Button onClick={handleBuscar}>Buscar Reservas</Button>
    </Container>
  );
};

export default MesSalonFilter;

/* Estilos */
const Container = styled.div`
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #1e1e1e;
`;
const Select = styled.select`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
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