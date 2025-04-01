// src/components/Admin/filters/DiaSalonFilter.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DiaSalonFilter = ({ onBuscar }) => {
  const [dia, setDia] = useState("");

  // Función para obtener el día actual
  useEffect(() => {
    const obtenerDiaHoy = () => {
      const diasSemana = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
      const hoy = new Date().getDay();

      if (hoy === 0) {
        setDia("LUNES");
      } else {
        setDia(diasSemana[hoy - 1]);
      }
    };

    obtenerDiaHoy();
  }, []);
  
  useEffect(() => {
    if (dia) {
      onBuscar({ dia });
    }
  }, [dia, onBuscar]);

  return (
    <Container>
      <Row>
        <Label>Día de la semana:</Label>
        <Select value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="">Selecciona un día</option>
          <option value="LUNES">Lunes</option>
          <option value="MARTES">Martes</option>
          <option value="MIERCOLES">Miércoles</option>
          <option value="JUEVES">Jueves</option>
          <option value="VIERNES">Viernes</option>
          <option value="SABADO">Sábado</option>
        </Select>
      </Row>
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
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
`;