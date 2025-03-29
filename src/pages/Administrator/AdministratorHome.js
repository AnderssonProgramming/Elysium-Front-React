// src/pages/Admin/AdministratorHome.js
import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Admin/Header";
import { Sidebar } from "../../components/Admin/Sidebar";
// Importa los modales específicos para cada consulta
import ConsultaModalMesSalon from "./consultaModal/ConsultaModalMesSalon";
import ConsultaModalDiaSalon from "./consultaModal/ConsultaModalDiaSalon";
import ConsultaModalRangoFechas from "./consultaModal/ConsultaModalRangoFechas";
import ConsultaModalEstado from "./consultaModal/ConsultaModalEstado";
import ConsultaModalTotalSalon from "./consultaModal/ConsultaModalTotalSalon";
import ConsultaModalPrioridad from "./consultaModal/ConsultaModalPrioridad";
import ConsultaModalDemanda from "./consultaModal/ConsultaModalDemanda"; // Asegúrate de que la ruta sea correcta
// Si tienes más modales para otros tipos, impórtalos aquí

const CONSULTAS = [
  { id: 1, titulo: "Reservas por Mes y Salón", tipo: "mesSalon" },
  { id: 2, titulo: "Reservas por Día y Salón", tipo: "diaSalon" },
  { id: 3, titulo: "Reservas por Rango de Fechas", tipo: "rangoFechas" },
  { id: 4, titulo: "Comparativo Activas vs Inactivas", tipo: "estado" },
  { id: 5, titulo: "Reservas Totales por Salón", tipo: "totalSalon" },
  { id: 6, titulo: "Promedio de Reservas por Prioridad", tipo: "prioridad" },
  { id: 7, titulo: "Demanda por Laboratorios", tipo: "demanda" },
];

const AdministratorHome = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);

  const handleOpenModal = (consulta) => {
    setConsultaSeleccionada(consulta);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setConsultaSeleccionada(null);
  };

  // Selecciona y renderiza el modal correspondiente según el tipo de consulta
  const renderModal = () => {
    if (!consultaSeleccionada) return null;
    switch (consultaSeleccionada.tipo) {
      case "mesSalon":
        return (
          <ConsultaModalMesSalon
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      case "diaSalon":
        return (
          <ConsultaModalDiaSalon
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      case "rangoFechas":
        return (
          <ConsultaModalRangoFechas
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      case "estado":
        return (
          <ConsultaModalEstado
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      case "totalSalon":
        return (
          <ConsultaModalTotalSalon
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      case "prioridad":
        return (
          <ConsultaModalPrioridad
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      case "demanda":
        return (
          <ConsultaModalDemanda
            consulta={consultaSeleccionada}
            onClose={handleCloseModal}
          />
        );
      // Agrega otros casos para "rangoFechas", "estado", "totalSalon", "prioridad", "demanda" según lo necesites.
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentArea>
        <Sidebar />
        <DashboardContent>
          <Section>
            <TitleSection>Listado de Consultas</TitleSection>
            <ConsultaList>
              {CONSULTAS.map((consulta) => (
                <ConsultaItem
                  key={consulta.id}
                  onClick={() => handleOpenModal(consulta)}
                >
                  {consulta.titulo}
                </ConsultaItem>
              ))}
            </ConsultaList>
            {modalOpen && renderModal()}
          </Section>
        </DashboardContent>
      </ContentArea>
    </MainContainer>
  );
};

export default AdministratorHome;

/* Estilos */
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #f2f3ec;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 20px 38px 0;
  box-sizing: border-box;
`;

const ContentArea = styled.div`
  display: flex;
  gap: 26px;
  padding: 20px 38px 74px;
  flex: 1;
  box-sizing: border-box;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const DashboardContent = styled.div`
  flex: 1;
  border-radius: 30px;
  background-color: #fff;
  padding: 25px 56px;
  word-wrap: break-word;
  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const Section = styled.section`
  width: 100%;
`;

const TitleSection = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ConsultaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const ConsultaItem = styled.li`
  background-color: #eff2e7;
  margin-bottom: 10px;
  padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #dfe5d7;
  }
`;
