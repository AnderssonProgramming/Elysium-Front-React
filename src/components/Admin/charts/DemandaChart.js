// src/components/Admin/charts/DemandaChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DemandaChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpia el SVG

    if (!reservas || reservas.length === 0) return;

    const width = 600;
    const height = 500;

    svg.attr("width", width).attr("height", height);

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(
      reservas,
      (v) => v.length,
      (d) => d.idSalon
    );
    // Convertir a arreglo de objetos
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({
      salon,
      count,
    }));

    // Usamos d3.hierarchy para crear una estructura para el pack layout.
    const root = d3.hierarchy({ children: data })
      .sum(d => d.count);

    // Configurar el pack layout
    const pack = d3.pack()
      .size([width, height])
      .padding(10);

    const nodes = pack(root).leaves();

    // Escala de colores
    const color = d3.scaleOrdinal(d3.schemeSet3);

    // Dibujar las burbujas
    const node = svg.selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    node.append("circle")
      .attr("r", 0)
      .attr("fill", (d, i) => color(i))
      .transition()
      .duration(800)
      .attr("r", d => d.r);

    // Agregar etiquetas dentro de cada burbuja (nombre del salón y cantidad)
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      .attr("font-size", d => Math.min(2 * d.r / d.data.salon.length, 18))
      .attr("fill", "#000")
      .text(d => d.data.salon);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("font-size", "12px")
      .attr("fill", "#000")
      .text(d => d.data.count);
  }, [reservas]);

  return <svg ref={chartRef}></svg>;
};

export default DemandaChart;
