// src/components/Admin/charts/EstadoChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const EstadoChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpia el SVG

    if (!reservas || reservas.length === 0) return;

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Agrupar reservas por estado (suponiendo que la propiedad 'estado' es una cadena, ej: "ACTIVA" o "INACTIVA")
    const reservasPorEstado = d3.rollup(
      reservas,
      (v) => v.length,
      (d) => d.estado
    );
    const data = Array.from(reservasPorEstado, ([estado, count]) => ({
      estado,
      count,
    }));

    // Configurar el pie/donut chart
    const pie = d3.pie().value((d) => d.count);
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5) // Radio interior para efecto donut
      .outerRadius(radius);
      
    // Escala de colores con una paleta profesional (usamos d3.schemeSet2)
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.estado))
      .range(d3.schemeSet2);

    const arcs = g
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
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
  }, [reservas]);

  return <svg ref={chartRef}></svg>;
};

export default EstadoChart;
