import React from "react";
import styled from "styled-components";

export function Header() {
  return (
    <HeaderContainer>
      <TopSection>
        <ControlPanel>Panel de control</ControlPanel>
        <UserSection>
          <UserInfo>
            <UserAvatar
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/58bf04ffc9ee8a8b854720035b7be8730269d7b6?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
              alt="Emily Rincon profile"
            />
            <UserName>Emily Rincon</UserName>
          </UserInfo>
          <NotificationIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1954f6c7c642021490080ffd4c81bc9798bf0beb?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
            alt="Notifications"
          />
        </UserSection>
      </TopSection>
      <WelcomeMessage>
        Buen día, admin <strong>Emily</strong>
      </WelcomeMessage>
      <SubHeading>
        Gestiona las reservas que has agendado últimamente
      </SubHeading>
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
  margin: auto 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: stretch;
  gap: 40px 50px;
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
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 49px;
  border-radius: 50%;
`;

const UserName = styled.span`
  margin: auto 0;
`;

const NotificationIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  margin: auto 0;
`;

const WelcomeMessage = styled.h2`
  color: rgba(82, 182, 154, 1);
  font-size: 21px;
  font-weight: 400;
  letter-spacing: -0.42px;
  margin-top: 10px;
`;

const SubHeading = styled.p`
  color: rgba(82, 182, 154, 1);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.28px;
  margin-top: 20px;
`;
