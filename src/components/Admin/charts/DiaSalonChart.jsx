import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DiaSalonChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpia el contenido del SVG

    if (!reservas || reservas.length === 0) return;

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(
      reservas,
      (v) => v.length,
      (d) => d.idSalon
    );
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({ salon, count }));

    // Configurar el pie chart
    const pie = d3.pie().value((d) => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = g
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .transition()
      .duration(800)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(i(t));
        };
      });

    // Agregar etiquetas para cada salón
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .text((d) => d.data.salon);
  }, [reservas]);

  return <svg ref={chartRef}></svg>;
};

export default DiaSalonChart;