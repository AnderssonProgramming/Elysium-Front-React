// src/components/Admin/charts/RangoFechasChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RangoFechasChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("*").remove(); // Limpiar el SVG

    if (!reservas || reservas.length === 0) return;

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 100 };

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(
      reservas,
      (v) => v.length,
      (d) => d.idSalon
    );
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({
      salon,
      count,
    }));

    svg.attr("width", width).attr("height", height);

    // Escala X: lineal para la cantidad
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([margin.left, width - margin.right]);

    // Escala Y: banda para los nombres de los salones
    const y = d3.scaleBand()
      .domain(data.map(d => d.salon))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    // Dibujar eje X
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Dibujar eje Y
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Dibujar las barras horizontales
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.salon))
        .attr("x", margin.left)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.count) - margin.left)
        .attr("fill", (d, i) => color(i)); // Asigna un color diferente a cada barra


    // Agregar etiquetas de la cantidad al final de cada barra
    svg.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("y", d => y(d.salon) + y.bandwidth() / 2 + 4)
      .attr("x", d => x(d.count) + 5)
      .text(d => d.count)
      .attr("font-size", "12px")
      .attr("fill", "#000");
  }, [reservas]);

  return <svg ref={chartRef}></svg>;
};

export default RangoFechasChart;
