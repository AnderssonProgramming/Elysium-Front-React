import React from "react";
import styled from "styled-components";
import ConsultaMesSalon from "./consultaModal/ConsultaMesSalon";
import ConsultaDiaSalon from "./consultaModal/ConsultaDiaSalon";
import ConsultaRangoFechas from "./consultaModal/ConsultaRangoFechas";
import ConsultaEstado from "./consultaModal/ConsultaEstado";
import ConsultaTotalSalon from "./consultaModal/ConsultaTotalSalon";
import ConsultaPrioridad from "./consultaModal/ConsultaPrioridad";
import ConsultaDemanda from "./consultaModal/ConsultaDemanda";

const CONSULTAS = [
  { id: 1, titulo: "Reservas por Mes y Salón", componente: <ConsultaMesSalon /> },
  { id: 2, titulo: "Reservas por Día y Salón", componente: <ConsultaDiaSalon /> },
  { id: 3, titulo: "Reservas por Rango de Fechas", componente: <ConsultaRangoFechas /> },
  { id: 4, titulo: "Comparativo Activas vs Inactivas", componente: <ConsultaEstado /> },
  { id: 5, titulo: "Reservas Totales por Salón", componente: <ConsultaTotalSalon /> },
  { id: 6, titulo: "Promedio de Reservas por Prioridad", componente: <ConsultaPrioridad /> },
  { id: 7, titulo: "Demanda por Laboratorios", componente: <ConsultaDemanda /> },
];

const AdministratorHome = () => {
  return (
    <MainContainer>
      <TitleSection>Centro de Insights</TitleSection>
      <GridContainer>
        {CONSULTAS.map((consulta) => (
          <ConsultaCard key={consulta.id}>
            <h3>{consulta.titulo}</h3>
            <ContentContainer>{consulta.componente}</ContentContainer>
          </ConsultaCard>
        ))}
      </GridContainer>
    </MainContainer>
  );
};

export default AdministratorHome;

/* Estilos */
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: var(--variable-collection-current-color);
`;

const TitleSection = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: flex-start;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ConsultaCard = styled.div`
  padding: 15px;
  border-radius: 10px;
  font-weight: 600;
  text-align: flex-start;
  border: 1px solid #D9D9D9;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px var(--variable-collection-shadow);
`;

const ContentContainer = styled.div`
`;