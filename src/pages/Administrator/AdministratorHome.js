import React from "react";
import styled from "styled-components";
import { Header } from "../../components/Admin/Header";
import { Sidebar } from "../../components/Admin/Sidebar";
import { FilterSection } from "../../components/Admin/FilterSection";

const AdministratorHome = () => {
  return (
    <MainContainer>
      {/* Sección del header en la parte superior */}
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      {/* Sección de contenido principal */}
      <ContentArea>
        <Sidebar />
        <DashboardContent>
          <section>
            <FilterSection />
          </section>
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
  min-height: 100vh;  /* Para que ocupe la altura de la pantalla */
  background-color: #f2f3ec;
`;

/* Aquí situamos el Header en la parte superior */
const HeaderWrapper = styled.div`
  width: 100%;
  padding: 20px 38px 0; 
  box-sizing: border-box; /* Asegura que el padding se compute adecuadamente */
`;

/* Área principal (sidebar + dashboard) */
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
  flex: 1; /* Se expande para ocupar todo el espacio disponible */
  border-radius: 30px;
  background-color: #fff;
  padding: 25px 56px;
  word-wrap: break-word; 
  @media (max-width: 991px) {
    padding: 20px;
  }
`;
