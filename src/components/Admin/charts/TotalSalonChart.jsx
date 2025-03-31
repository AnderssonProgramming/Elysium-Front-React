// src/components/Admin/charts/TotalSalonChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TotalSalonChart = ({ reservas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpiar el contenido del SVG

    if (!reservas || reservas.length === 0) return;

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

    // Dimensiones generales
    const width = 600;
    const height = 400;
    svg.attr("width", width).attr("height", height);

    if (data.length === 1) {
      // Si solo hay un salón, mostrar gráfico de dona (donut chart)
      const radius = Math.min(width, height) / 2 - 40; // Ajusta el margen interno

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // Configurar el pie/donut chart
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

      // Etiqueta en el centro con el total de reservas
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("font-weight", "bold")
        .attr("fill", "#000")
        .text(`${data[0].count}`);

      // Etiqueta debajo del gráfico para indicar el salón
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("font-weight", "bold")
        .attr("fill", "#000")
        .text(`Salón: ${data[0].salon}`);
    } else {
      // Si hay más de un salón, mostrar gráfico de barras horizontal
      const margin = { top: 20, right: 20, bottom: 50, left: 100 };

      // Escala X: lineal para la cantidad de reservas
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .range([margin.left, width - margin.right])
        .nice();

      // Escala Y: de banda para los nombres de los salones
      const y = d3
        .scaleBand()
        .domain(data.map((d) => d.salon))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

      // Dibujar eje X
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      // Dibujar eje Y
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Dibujar barras horizontales con transición
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => y(d.salon))
        .attr("x", margin.left)
        .attr("height", y.bandwidth())
        .attr("width", 0)
        .attr("fill", (d, i) => color(i))
        .transition()
        .duration(800)
        .attr("width", (d) => x(d.count) - margin.left);

      // Agregar etiquetas de cantidad al final de cada barra
      svg
        .selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("y", (d) => y(d.salon) + y.bandwidth() / 2 + 4)
        .attr("x", (d) => x(d.count) + 5)
        .text((d) => d.count)
        .attr("font-size", "12px")
        .attr("fill", "#000");
    }
  }, [reservas]);

  return <svg ref={chartRef}></svg>;
};

export default TotalSalonChart;