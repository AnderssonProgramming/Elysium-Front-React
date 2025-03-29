import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar el token o hacer la lógica de logout
    navigate("/"); // Redirige a la página principal (login)
  };

  return (
    <HeaderContainer>
      <TopSection>
        <ControlPanel>Panel de control</ControlPanel>
        <UserSection>
          <UserInfo>
            <UserAvatar
              src="https://img.freepik.com/vector-gratis/establecimiento-circulos-usuarios_78370-4704.jpg?ga=GA1.1.204243624.1732496744&semt=ais_hybrid" //Imagen extraída de juicy_fish Freepik
              alt="Generic user icon"
            />
            <UserName>Admin</UserName>
          </UserInfo>
          <LogoutIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1954f6c7c642021490080ffd4c81bc9798bf0beb?placeholderIfAbsent=true&apiKey=/." 
            alt="Logout"
            onClick={handleLogout}
          />
        </UserSection>
      </TopSection>
      <WelcomeMessage>Buen día, admin</WelcomeMessage>
      <SubHeading>Gestiona las reservas que has agendado últimamente</SubHeading>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ControlPanel = styled.h1`
  color: rgba(82, 182, 154, 1);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.42px;
  padding: 0 210px;
  margin: auto 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 16px;
  color: #52b69a;
  font-weight: 400;
  letter-spacing: -0.32px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
`;

const UserName = styled.span`
  margin: auto 0;
  color: rgba(82, 182, 154, 1);
  font-weight: 500;
`;

const LogoutIcon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const WelcomeMessage = styled.h2`
  color: rgba(82, 182, 154, 1);
  font-size: 21px;
  padding: 0 210px;
  font-weight: 400;
  letter-spacing: -0.42px;
  margin-top: 10px;
`;

const SubHeading = styled.p`
  color: rgba(82, 182, 154, 1);
  font-size: 17px;
  font-weight: 300;
  padding: 0 210px;
  letter-spacing: -0.28px;
  margin-top: 20px;
`;
