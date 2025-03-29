// src/components/Admin/charts/PromedioPrioridadChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PromedioPrioridadChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    // Limpia el contenido anterior
    svg.selectAll("*").remove();

    if (!data || data.length === 0) return;

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    svg.attr("width", width).attr("height", height);

    // Dominio de prioridades: se asume que siempre serán 1 a 5
    const priorities = data.map((d) => d.priority);

    // Escala X: categorías (prioridad)
    const x = d3
      .scaleBand()
      .domain(priorities)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    // Escala Y: promedio de reservas
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.promedio)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Dibujar eje X
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((d) => `Prioridad ${d}`));

    // Dibujar eje Y
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Escala de colores para cada barra
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Dibujar las barras
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.priority))
      .attr("y", y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => color(i))
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.promedio))
      .attr("height", (d) => y(0) - y(d.promedio));

    // Agregar etiquetas con el promedio encima de cada barra
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.priority) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.promedio) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#000")
      .text((d) => (d.promedio !== undefined ? d.promedio.toFixed(2) : "0.00"));
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default PromedioPrioridadChart;
