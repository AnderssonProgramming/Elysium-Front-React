// src/components/Admin/filters/EstadoFilter.js
import React from "react";
import styled from "styled-components";

const EstadoFilter = ({ onBuscar }) => {
  return (
    <Container>
      <SearchButton onClick={onBuscar}>Cargar Datos</SearchButton>
    </Container>
  );
};

export default EstadoFilter;

const Container = styled.div`
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
  cursor: pointer;
`;
