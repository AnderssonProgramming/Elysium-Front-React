import React from "react";
import styled from "styled-components";

const ImageSection = () => {
  return (
    <ImageContainer>
      <BackgroundImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fad4c89a27a82e149fdd2af656717e0ebbd72dd4"
        alt="Background"
      />
      <SchoolLogo
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/65dfeae36c089fb293d93f5d75b9af54ce0a4fbe"
        alt="School Logo"
      />
    </ImageContainer>
  );
};

const ImageContainer = styled.section`
  width: 50%;
  position: relative;
  overflow: hidden;
  @media (max-width: 991px) {
    width: 100%;
    height: 400px;
  }
  @media (max-width: 640px) {
    height: 300px;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 200px;
  margin-left: 1px;
`;

const SchoolLogo = styled.img`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 468px;
  height: 240px;
  @media (max-width: 991px) {
    width: 300px;
    height: auto;
  }
  @media (max-width: 640px) {
    width: 200px;
  }
`;

export default ImageSection;