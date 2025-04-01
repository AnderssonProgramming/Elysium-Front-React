import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MesSalonChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    const svg = d3.select(container);
    svg.selectAll("*").remove(); // Limpia el SVG

    if (!reservas || reservas.length === 0) return;

    // Ajustar tamaño dinámico según el contenedor
    const containerWidth = container.clientWidth || 600;
    const containerHeight = containerWidth * 0.5; // Mantener proporción

    svg
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const margin = { top: 20, right: 20, bottom: 60, left: 50 };

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(reservas, (v) => v.length, (d) => d.idSalon);
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({ salon, count }));

    // Escala X: nombres de salón
    const x = d3.scaleBand()
      .domain(data.map(d => d.salon))
      .range([margin.left, containerWidth - margin.right])
      .padding(0.1);

    // Escala Y: cantidad de reservas
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .nice()
      .range([containerHeight - margin.bottom, margin.top]);

    // Eje X
    svg.append("g")
      .attr("transform", `translate(0, ${containerHeight - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Eje Y
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Dibujar barras con transición
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.salon))
      .attr("y", y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .transition()
      .duration(800)
      .attr("y", d => y(d.count))
      .attr("height", d => y(0) - y(d.count));

    // Función para ajustar el tamaño cuando la pantalla cambie
    const updateSize = () => {
      const newWidth = container.clientWidth || 600;
      const newHeight = newWidth * 0.5;
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Llama a la función al inicio

  }, [reservas]);

  return <svg ref={chartRef} style={{ width: "100%", height: "auto" }}></svg>;
};

export default MesSalonChart;