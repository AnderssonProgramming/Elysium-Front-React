// src/components/Admin/filters/PrioridadFilter.jsx
import React from "react";
import styled from "styled-components";

const PrioridadFilter = ({ onBuscar }) => {
  return (
    <FilterContainer>
      <Button onClick={onBuscar}>
        Consultar Promedio por Prioridad
      </Button>
    </FilterContainer>
  );
};

export default PrioridadFilter;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #52b69a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;