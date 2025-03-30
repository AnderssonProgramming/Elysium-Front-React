// src/components/Admin/filters/DemandaFilter.jsx
import React from "react";
import styled from "styled-components";

const DemandaFilter = ({ onBuscar }) => {
  return (
    <FilterContainer>
      <SearchButton onClick={onBuscar}>
        Buscar Demanda por Laboratorios
      </SearchButton>
    </FilterContainer>
  );
};

export default DemandaFilter;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const SearchButton = styled.button`
  background-color: #52b69a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;