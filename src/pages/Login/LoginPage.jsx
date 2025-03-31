import React from "react";
import styled from "styled-components";
import LoginForm from "../../components/Login/LoginForm";
import ImageSection from "../../components/Login/ImageSection";

function LoginPage({ onLogin }) {
  return (
    <PageContainer>
      <LoginForm onLogin={onLogin} />
      <ImageSection />
    </PageContainer>
  );
};

const PageContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color:rgb(242, 245, 229);
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export default LoginPage;