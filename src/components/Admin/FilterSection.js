import React from "react";
import styled from "styled-components";

export function FilterSection() {
  return (
    <FilterContainer>
      <HeaderSection>
        <Title>Reservas</Title>
        <Period>Deciembre 2025</Period>
      </HeaderSection>
      <FiltersContainer>
        <FilterColumn>
          <FilterGroup>
            <Label htmlFor="salon">Salon</Label>
            <SelectWrapper>
              <Select id="salon">
                <option>Seleccionar...</option>
              </Select>
              <SelectIcon
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0e980bbfa3fd613fdaa0fbc8027968755d13692?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
                alt=""
              />
            </SelectWrapper>
            <SearchButton>Buscar</SearchButton>
          </FilterGroup>
        </FilterColumn>
        <FilterColumn>
          <FilterGroup>
            <Label htmlFor="weekday">Dia de la semana</Label>
            <SelectWrapper>
              <Select id="weekday">
                <option>Seleccionar...</option>
              </Select>
              <SelectIcon
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0e980bbfa3fd613fdaa0fbc8027968755d13692?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
                alt=""
              />
            </SelectWrapper>
            <SearchButton>Buscar</SearchButton>
          </FilterGroup>
        </FilterColumn>
      </FiltersContainer>
    </FilterContainer>
  );
}

/* Contenedor general para toda la sección de filtros */
const FilterContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

/* Fila donde están 'Reservas' y 'Diciembre 2025' */
const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 17px; /* Espacio lateral si lo deseas */
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(82, 182, 154, 1);
  gap: 20px;
`;

/* Reservas queda a la izquierda */
const Title = styled.h2`
  font-size: 23px;
  font-weight: 400;
  letter-spacing: -0.46px;
  margin: 0;
`;

/* Diciembre 2025 se empuja automáticamente a la derecha */
const Period = styled.div`
  margin-left: auto;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.38px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 31px;
  padding: 0 17px; /* Si quieres alinear con el HeaderSection */
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const FilterColumn = styled.div`
  flex: 1;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #1e1e1e;
  font-weight: 400;
  line-height: 1.4;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  width: 100%;
  padding: 12px 16px;
  appearance: none;
  font-size: 16px;
`;

const SelectIcon = styled.img`
  position: absolute;
  right: 12px;
  width: 16px;
  pointer-events: none;
`;

const SearchButton = styled.button`
  border-radius: 20px;
  background-color: rgba(82, 182, 154, 1);
  align-self: center;
  margin-top: 34px;
  width: 181px;
  padding: 7px;
  font-size: 13px;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.26px;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 7px 20px;
  }
`;
