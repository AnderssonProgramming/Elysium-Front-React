import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const EstadoChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    const svg = d3.select(container);
    svg.selectAll("*").remove(); // Limpia el SVG

    if (!reservas || reservas.length === 0) return;

    // Ajustar tamaño dinámico según el contenedor
    const containerWidth = container.clientWidth || 500;
    const containerHeight = containerWidth * 0.7; // Mantener proporción

    svg
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const radius = Math.min(containerWidth, containerHeight) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${containerWidth / 2}, ${containerHeight / 2})`);

    // Agrupar reservas por estado
    const reservasPorEstado = d3.rollup(reservas, (v) => v.length, (d) => d.estado);
    const data = Array.from(reservasPorEstado, ([estado, count]) => ({ estado, count }));

    // Configurar el pie/donut chart
    const pie = d3.pie().value((d) => d.count);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);
    const color = d3.scaleOrdinal().domain(data.map((d) => d.estado)).range(d3.schemeSet2);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (d) => color(d.data.estado))
      .transition()
      .duration(800)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(i(t));
        };
      });

    // Agregar etiquetas dentro del gráfico
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#000")
      .text((d) => `${d.data.estado}: ${d.data.count}`);

    // Función para ajustar el tamaño cuando la pantalla cambie
    const updateSize = () => {
      const newWidth = container.clientWidth || 500;
      const newHeight = newWidth * 0.7;
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Llama a la función al inicio

  }, [reservas]);

  return <svg ref={chartRef} style={{ width: "100%", height: "auto" }}></svg>;
};

export default EstadoChart;