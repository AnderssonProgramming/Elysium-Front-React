import React, { useState } from "react";
import styled from "styled-components";
import ConsultaMesSalon from "./consultaModal/ConsultaMesSalon";
import ConsultaDiaSalon from "./consultaModal/ConsultaDiaSalon";
import ConsultaRangoFechas from "./consultaModal/ConsultaRangoFechas";
import ConsultaEstado from "./consultaModal/ConsultaEstado";
import ConsultaTotalSalon from "./consultaModal/ConsultaTotalSalon";
import ConsultaPrioridad from "./consultaModal/ConsultaPrioridad";
import ConsultaDemanda from "./consultaModal/ConsultaDemanda";
import FiltrarReservaModal from "../../components/popup/filtrarReservas/FiltrarReservaModal";
import { ReactComponent as CalendarSVG} from '../../assets/icons/calendar-lines-svgrepo-com.svg';

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
  const [popup, setPopup] = useState({ tipo: "" });
  const abrirPopup = (tipo) => setPopup({ tipo });
  const cerrarPopup = () => setPopup({ tipo: ""});
  
  return (
    <>
      <MainContainer>
        <TopPanel>
          <TitleSection>Centro de Insights</TitleSection>
          <CalendarBTN onClick={() => abrirPopup("calendario")}>
            <CalendarSVG style={{ width: '24px', height: '24px'}} />
            Calendario de Reservas
          </CalendarBTN>
        </TopPanel>
        <GridContainer>
          {CONSULTAS.map((consulta) => (
            <ConsultaCard key={consulta.id}>
              <h3>{consulta.titulo}</h3>
              <ContentContainer>{consulta.componente}</ContentContainer>
            </ConsultaCard>
          ))}
        </GridContainer>
      </MainContainer>
      {popup.tipo === "calendario" && <FiltrarReservaModal onClose={cerrarPopup} />}
    </>
  );
};

export default AdministratorHome;

/* Estilos */
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  color: var(--variable-collection-current-color);
`;

const TopPanel = styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  justify-content: space-between;
  align-items: center;
`;

const TitleSection = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: flex-start;
`;

const CalendarBTN = styled.button`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: var(--variable-collection-current-color);
  color: white;
  padding: 10px;
  font-weight:600;
  border: none;
  cursor: pointer;
  gap: 10px;
  align-items: center;
  justify-content: center;
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
  max-width: 95%;
  width:100%;
  border: 1px solid #D9D9D9;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px var(--variable-collection-shadow);
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 100%;
  flex-grow= 1;
  overflow: hidden;
`;