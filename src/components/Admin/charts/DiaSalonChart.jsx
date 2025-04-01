import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DiaSalonChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    const svg = d3.select(container);
    svg.selectAll("*").remove(); // Limpia el contenido del SVG

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

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(reservas, (v) => v.length, (d) => d.idSalon);
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({ salon, count }));

    // Configurar el pie chart
    const pie = d3.pie().value((d) => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (d, i) => color(i))
      .transition()
      .duration(800)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(i(t));
        };
      });

    // Agregar etiquetas dentro de cada sección del gráfico
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .text((d) => d.data.salon);

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

export default DiaSalonChart;