import React from "react";
import styled from "styled-components";

const FormInput = ({ label, type, onChange, value }) => {
  return (
    <InputWrapper>
      <StyledInput
        type={type}
        onChange={onChange}
        value={value}
        required
      />
      <InputUnderline />
      <InputLabel>{label}</InputLabel>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 60px;
  width: 100%;
  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
`;

const InputLabel = styled.label`
  color: rgb(107, 155, 61);
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-family: "Inter", sans-serif;
  font-size: 16px; /* Tamaño mayor */
  outline: none;
  padding: 0;
  color: #000; /* Texto en negro */

  ::placeholder {
    color: #999; /* Color del placeholder */
  }
`;

const InputUnderline = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
  background-color: #aaba70;
`;

export default FormInput;