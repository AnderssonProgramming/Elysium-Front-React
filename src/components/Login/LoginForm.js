import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí realiza la llamada a tu API de login con fetch o axios.
    // Por ejemplo:
    /*
    try {
      const response = await fetch('https://localhost:8443/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      if (!response.ok) throw new Error('Error en la autenticación');
      const data = await response.json();
      // Guarda el token en localStorage o maneja la cookie según corresponda
      localStorage.setItem('token', data.token);
      // Redirige a la pantalla de administrador
      navigate('/adminhome');
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error en la UI
    }
    */
    // Para la demostración, simulamos un login exitoso:
    localStorage.setItem("token", "dummy-token");
    navigate("/adminhome");
  };

  return (
    <FormContainer>
      <LogoImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19837d48e4d4d7edc67669c3478e546d719fa809"
        alt="Logo"
      />
      <form onSubmit={handleSubmit}>
        <FormInput
          label="CORREO INSTITUCIONAL"
          type="email"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <FormInput
          label="CONTRASEÑA"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Ingresar</LoginButton>
      </form>
      <CvdsLogo
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a04bfa90ef84cb31360009a48d4d01c2ac370589"
        alt="CVDS Logo"
      />
    </FormContainer>
  );
};

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 155px 153px;
  width: 50%;
  position: relative;
  @media (max-width: 991px) {
    width: 100%;
    padding: 40px 20px;
  }
  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const LogoImage = styled.img`
  width: 226px;
  height: 151px;
  margin: 0 auto 137px;
  @media (max-width: 640px) {
    width: 180px;
    height: 120px;
    margin-bottom: 60px;
  }
`;

const LoginButton = styled.button`
  width: 246px;
  height: 54px;
  border-radius: 2px;
  border: none;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 19px;
  font-weight: 700;
  margin: 0 auto;
  cursor: pointer;
  background-color: #d9ed92;
  display: block;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const CvdsLogo = styled.img`
  width: 59px;
  height: 63px;
  margin: 130px auto 0;
`;

export default LoginForm;
