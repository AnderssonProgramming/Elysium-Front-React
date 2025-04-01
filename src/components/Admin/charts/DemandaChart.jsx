import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DemandaChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    const svg = d3.select(container);
    svg.selectAll("*").remove(); // Limpia el SVG

    if (!reservas || reservas.length === 0) return;

    const containerWidth = container.clientWidth || 600; // Usa el tamaño del contenedor
    const containerHeight = containerWidth * 0.7; // Relación de aspecto

    svg
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet"); // Mantiene proporción

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(reservas, (v) => v.length, (d) => d.idSalon);
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({ salon, count }));

    const root = d3.hierarchy({ children: data }).sum((d) => d.count);
    const pack = d3.pack().size([containerWidth, containerHeight]).padding(10);

    const nodes = pack(root).leaves();
    const color = d3.scaleOrdinal(d3.schemeSet3);

    const node = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    node.append("circle").attr("r", 0).attr("fill", (d, i) => color(i))
      .transition().duration(800).attr("r", (d) => d.r);

    node.append("text").attr("text-anchor", "middle").attr("dy", "-0.3em")
      .attr("font-size", (d) => Math.min((2 * d.r) / d.data.salon.length, 18))
      .attr("fill", "#000").text((d) => d.data.salon);

    node.append("text").attr("text-anchor", "middle").attr("dy", "1em")
      .attr("font-size", "12px").attr("fill", "#000").text((d) => d.data.count);

    // Función para actualizar el gráfico cuando se cambia el tamaño de la ventana
    const updateSize = () => {
      const newWidth = container.clientWidth || 600;
      const newHeight = newWidth * 0.7;
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Llama la función al inicio

  }, [reservas]);

  return <svg ref={chartRef} style={{ width: "100%", height: "auto" }}></svg>;
};

export default DemandaChart;
