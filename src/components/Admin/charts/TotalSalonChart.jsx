import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TotalSalonChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    const svg = d3.select(container);
    svg.selectAll("*").remove(); // Limpiar el contenido del SVG

    if (!reservas || reservas.length === 0) return;

    // Ajustar tamaño dinámico según el contenedor
    const containerWidth = container.clientWidth || 600;
    const containerHeight = containerWidth * 0.6; // Mantener proporción

    svg
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Agrupar reservas por salón
    const reservasPorSalon = d3.rollup(reservas, (v) => v.length, (d) => d.idSalon);
    const data = Array.from(reservasPorSalon, ([salon, count]) => ({ salon, count }));

    if (data.length === 1) {
      // Si solo hay un salón, mostrar gráfico de dona
      const radius = Math.min(containerWidth, containerHeight) / 2 - 40;

      const g = svg
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${containerHeight / 2})`);

      const pie = d3.pie().value((d) => d.count);
      const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);
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

      g.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("font-weight", "bold")
        .attr("fill", "#000")
        .text(`${data[0].count}`);

      svg
        .append("text")
        .attr("x", containerWidth / 2)
        .attr("y", containerHeight - 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("font-weight", "bold")
        .attr("fill", "#000")
        .text(`Salón: ${data[0].salon}`);
    } else {
      // Gráfico de barras horizontales
      const margin = { top: 20, right: 20, bottom: 50, left: 100 };

      const x = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .range([margin.left, containerWidth - margin.right])
        .nice();

      const y = d3.scaleBand()
        .domain(data.map((d) => d.salon))
        .range([margin.top, containerHeight - margin.bottom])
        .padding(0.1);

      svg.append("g")
        .attr("transform", `translate(0, ${containerHeight - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", (d) => y(d.salon))
        .attr("x", margin.left)
        .attr("height", y.bandwidth())
        .attr("width", 0)
        .attr("fill", (d, i) => color(i))
        .transition()
        .duration(800)
        .attr("width", (d) => x(d.count) - margin.left);

      svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("y", (d) => y(d.salon) + y.bandwidth() / 2 + 4)
        .attr("x", (d) => x(d.count) + 5)
        .text((d) => d.count)
        .attr("font-size", "12px")
        .attr("fill", "#000");
    }
  }, [reservas]);

  return <svg ref={chartRef} style={{ width: "100%", height: "auto" }}></svg>;
};

export default TotalSalonChart;