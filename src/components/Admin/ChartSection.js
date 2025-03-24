import React from "react";
import styled from "styled-components";

export function ChartSection() {
  return (
    <ChartContainer>
      <ChartContent>
        <ChartHeader>
          <HeaderTitle>Estado de Reservas</HeaderTitle>
          <HeaderControls>
            <Period>Esta semana</Period>
            <ControlIcon
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6a1371b3ef98d40a3dc7814ba7ed6659d35a64c?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
              alt="Controls"
            />
          </HeaderControls>
        </ChartHeader>
        <MainValue>5.000,00</MainValue>
        <SubValue>50 Orders</SubValue>
        <ChartArea>
          <YAxis>
            <AxisValue>60</AxisValue>
            <AxisValue>20</AxisValue>
            <AxisValue>-20</AxisValue>
            <AxisValue>-60</AxisValue>
          </YAxis>
          <ChartContentSection>
            <ChartImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ea036a3d23cc74df29920cd26ef544eb7cd69e8?placeholderIfAbsent=true&apiKey=d9e0070a9dd8432fa5ecd841300d02ae"
              alt="Chart visualization"
            />
            <Timeline>
              <TimeValue>q1</TimeValue>
              <TimeValue>q2</TimeValue>
              <TimeValue>q3</TimeValue>
              <TimeValue>q4</TimeValue>
            </Timeline>
          </ChartContentSection>
        </ChartArea>
        <Legend>
          <LegendItem>
            <ColorDot color="#7987ff" />
            <LegendText>Activas</LegendText>
          </LegendItem>
          <LegendItem>
            <ColorDot color="#e697ff" />
            <LegendText>Cancelada</LegendText>
          </LegendItem>
          <LegendItem>
            <ColorDot color="#ffa5cb" />
            <LegendText>Eliminada</LegendText>
          </LegendItem>
        </Legend>
      </ChartContent>
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  flex: 1;
  min-width: 240px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const ChartContent = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: 16px 24px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
`;

const HeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Period = styled.span`
  font-size: 12px;
`;

const ControlIcon = styled.img`
  width: 24px;
`;

const MainValue = styled.div`
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 32px;
  color: #165baa;
  letter-spacing: -1.2px;
  min-height: 48px;
`;

const SubValue = styled.div`
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 16px;
  color: #000;
  padding-bottom: 16px;
`;

const ChartArea = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

const YAxis = styled.div`
  font-size: 12px;
  width: 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AxisValue = styled.div`
  text-align: right;
`;

const ChartContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChartImage = styled.img`
  flex: 1;
  width: 100%;
  object-fit: contain;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  text-align: center;
`;

const TimeValue = styled.div`
  flex: 1;
`;

const Legend = styled.div`
  display: flex;
  padding: 24px 10px 8px;
  gap: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ColorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const LegendText = styled.span`
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 12px;
  color: #000;
  font-weight: 500;
`;

export default ChartSection;
