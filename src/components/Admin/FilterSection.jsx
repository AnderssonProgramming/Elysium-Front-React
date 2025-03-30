import React, { useState } from "react";
import styled from "styled-components";

export function FilterSection({ onBuscar }) {
  // Estados para cada filtro
  const [mes, setMes] = useState("");
  const [salon, setSalon] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleBuscar = () => {
    // Empaquetamos los filtros en un objeto
    onBuscar({ mes, salon, diaSemana, fechaInicio, fechaFin });
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Reservas</Title>
        <MonthSelectWrapper>
          <MonthLabel>Mes:</MonthLabel>
          <MonthSelect value={mes} onChange={(e) => setMes(e.target.value)}>
            <option value="">Selecciona...</option>
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
          </MonthSelect>
        </MonthSelectWrapper>
      </HeaderSection>

      <FiltersRow>
        <FilterGroup>
          <Label htmlFor="salon">Salón</Label>
          <SelectWrapper>
            <Select
              id="salon"
              value={salon}
              onChange={(e) => setSalon(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="A-201">A-201</option>
              <option value="B-103">B-103</option>
              <option value="LAB-1">LAB-1</option>
              {/* Más opciones según tus datos */}
            </Select>
          </SelectWrapper>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="weekday">Día de la semana</Label>
          <SelectWrapper>
            <Select
              id="weekday"
              value={diaSemana}
              onChange={(e) => setDiaSemana(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="LUNES">Lunes</option>
              <option value="MARTES">Martes</option>
              <option value="MIERCOLES">Miércoles</option>
              <option value="JUEVES">Jueves</option>
              <option value="VIERNES">Viernes</option>
              <option value="SABADO">Sábado</option>
              <option value="DOMINGO">Domingo</option>
            </Select>
          </SelectWrapper>
        </FilterGroup>
      </FiltersRow>

      <DateRow>
        <FilterGroup>
          <Label>Fecha Inicio</Label>
          <InputDate
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
          <Label>Fecha Fin</Label>
          <InputDate
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </FilterGroup>
      </DateRow>

      <SearchButton onClick={handleBuscar}>Buscar</SearchButton>
    </Container>
  );
}

/* Estilos para FilterSection */
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 17px;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 23px;
  font-weight: 400;
  letter-spacing: -0.46px;
  margin: 0;
`;

const MonthSelectWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MonthLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #1e1e1e;
`;

const MonthSelect = styled.select`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  appearance: none;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 31px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 16px;
  color: #1e1e1e;
  font-weight: 400;
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

const DateRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const InputDate = styled.input`
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  font-size: 16px;
`;

const SearchButton = styled.button`
  border-radius: 20px;
  background-color: rgba(82, 182, 154, 1);
  margin: 20px auto 0;
  padding: 7px 41px;
  font-size: 13px;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

export default FilterSection;