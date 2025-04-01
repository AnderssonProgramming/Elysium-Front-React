import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RangoFechasChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    const svg = d3.select(container);
    svg.selectAll("*").remove(); // Limpiar el SVG

    if (!reservas || reservas.length === 0) return;

    // Ajustar tamaño dinámico según el contenedor
    const containerWidth = container.clientWidth || 600;
    const containerHeight = containerWidth * 0.6; // Mantener proporción

    svg
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const margin = { top: 20, right: 20, bottom: 30, left: 100 };

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(reservas, (v) => v.length, (d) => d.idSalon);
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({ salon, count }));

    // Escala X: lineal para la cantidad
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([margin.left, containerWidth - margin.right]);

    // Escala Y: banda para los nombres de los salones
    const y = d3.scaleBand()
      .domain(data.map(d => d.salon))
      .range([margin.top, containerHeight - margin.bottom])
      .padding(0.1);

    // Dibujar eje X
    svg.append("g")
      .attr("transform", `translate(0, ${containerHeight - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Dibujar eje Y
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Escala de colores
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Dibujar las barras horizontales con transición
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.salon))
      .attr("x", margin.left)
      .attr("height", y.bandwidth())
      .attr("width", 0)
      .attr("fill", (d, i) => color(i))
      .transition()
      .duration(800)
      .attr("width", d => x(d.count) - margin.left);

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

    // Función para ajustar el tamaño cuando la pantalla cambie
    const updateSize = () => {
      const newWidth = container.clientWidth || 600;
      const newHeight = newWidth * 0.6;
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Llama a la función al inicio

  }, [reservas]);

  return <svg ref={chartRef} style={{ width: "100%", height: "auto" }}></svg>;
};

export default RangoFechasChart;