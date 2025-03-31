"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const siteColors = {
  background: "#ffffff",
  marker: "#FCD34D",
  link: "#FCD34D",
  mapLand: "#1E3A8A",
  mapBorder: "#ffffff",
};

type Country = {
  name: string;
  coordinates: [number, number];
  color: string;
};

type Connection = {
  from: [number, number];
  to: [number, number];
};

const countries: Country[] = [
  { name: "États-Unis", coordinates: [-100.0, 37.8], color: siteColors.marker },
  { name: "France", coordinates: [2.35, 48.86], color: siteColors.marker },
  { name: "Australie", coordinates: [133.78, -25.27], color: siteColors.marker },
];

const connections: Connection[] = [
  { from: countries[0].coordinates, to: countries[1].coordinates },
  { from: countries[1].coordinates, to: countries[2].coordinates },
  { from: countries[0].coordinates, to: countries[2].coordinates },
];

export default function MapChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const renderMap = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr("width", width).attr("height", height).style("background", siteColors.background);

    const projection = d3.geoMercator()
      .scale(width / 6)
      .translate([width / 2, height / 1.5]);

    const pathGenerator = d3.geoPath().projection(projection);

    d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then((worldData: any) => {
      const land = topojson.feature(worldData, worldData.objects.countries);

      svg
        .selectAll(".country")
        .data(land.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator as any)
        .attr("fill", siteColors.mapLand)
        .attr("stroke", siteColors.mapBorder);

      svg
        .selectAll(".line")
        .data(connections)
        .enter()
        .append("line")
        .attr("x1", (d) => projection(d.from)?.[0] || 0)
        .attr("y1", (d) => projection(d.from)?.[1] || 0)
        .attr("x2", (d) => projection(d.to)?.[0] || 0)
        .attr("y2", (d) => projection(d.to)?.[1] || 0)
        .attr("stroke", siteColors.link)
        .attr("stroke-width", 2);

      svg
        .selectAll(".dot")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", (d) => projection(d.coordinates)?.[0] || 0)
        .attr("cy", (d) => projection(d.coordinates)?.[1] || 0)
        .attr("r", 6)
        .attr("fill", (d) => d.color);
    });
  };

  useEffect(() => {
    renderMap();
    window.addEventListener("resize", renderMap);
    return () => window.removeEventListener("resize", renderMap);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height: "80vh" }} 
    >
      <svg ref={svgRef} className="block mx-auto" />
    </div>
  );
}
