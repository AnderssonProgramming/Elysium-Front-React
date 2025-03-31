import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import FormInput from "./FormInput";
import { login } from "../../api/auth";
import { consultarUsuarioPorCorreo } from "../../api/usuario";

function LoginForm({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const token = await login(correo, password);

      if (token) {
        localStorage.setItem("token", token);

        try {
          const usuario = await consultarUsuarioPorCorreo(correo);
          onLogin(usuario);

          if (usuario.isAdmin) {
            navigate("/administrador");
          } else {
            navigate("/home");
          }
        } catch (error) {
          
        }
      } else {
        setErrorMsg("Usuario no encontrado o contraseña incorrecta");
      }
    } catch (error) {
      setErrorMsg("Usuario no encontrado o contraseña incorrecta");
      console.error(error);
    }
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
          value={correo}
        />
        <FormInput
          label="CONTRASEÑA"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <LoginButton type="submit">Ingresar</LoginButton>
      </form>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
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
  border-radius: 10px;
  border: none;
  color:white;
  font-family: "Inter", sans-serif;
  font-size: 19px;
  font-weight: 700;
  margin: 0 auto;
  margin-top: 100px;
  cursor: pointer;
  background-color: rgb(107, 155, 61);
  display: block;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const CvdsLogo = styled.img`
  width: 59px;
  height: 63px;
  margin: 130px auto 0;
`;

export default LoginForm;