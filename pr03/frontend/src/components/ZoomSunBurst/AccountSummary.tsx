import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3';
import data from './sunburst_data.json';

const SIZE = 700;
const RADIUS = SIZE / 6;

const AccountSummary = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      // Create the color scale.
      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

      // Compute the layout.
      const hierarchy = d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value);
      const root = d3.partition()
          .size([2 * Math.PI, hierarchy.height + 1])
        (hierarchy);
      root.each(d => d.current = d);

      // Create the arc generator.
      const arc = d3.arc()
          .startAngle(d => d.x0)
          .endAngle(d => d.x1)
          .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
          .padRadius(RADIUS * 1.5)
          .innerRadius(d => d.y0 * RADIUS)
          .outerRadius(d => Math.max(d.y0 * RADIUS, d.y1 * RADIUS - 1))

      // Create the SVG container.
      const svg = d3.select(svgRef.current)
       .attr("viewBox", [-SIZE / 2, -SIZE / 2, SIZE, SIZE])
       .style("font", "10px sans-serif");
      svg.selectAll("*").remove();

      // Append the arcs.
      const path = svg.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
          .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
          .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

          .attr("d", d => arc(d.current));

      // Make them clickable if they have children.
      path.filter(d => d.children)
          .style("cursor", "pointer")
          .on("click", clicked);

      const format = d3.format(",d");
      path.append("title")
          .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

      const label = svg.append("g")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", d => +labelVisible(d.current))
          .attr("transform", d => labelTransform(d.current))
          .text(
              d => (
                  d.data.name +
                  (d.data.value ? 
                      ` (${Math.floor(d.data.value/60)} mins)` : 
                      (d.data.sum !== (
                          data.sum/data.children.length) ?
                          ` (${Math.floor(d.data.sum/60)}  mins)` :
                          "")
                  )
              )
          );

      const parent = svg.append("circle")
          .datum(root)
          .attr("r", RADIUS)
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("click", clicked);

      // Handle zoom on click.
      function clicked(event, p) {
        parent.datum(p.parent || root);

        root.each(d => d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        });

        const t = svg.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween("data", d => {
              const i = d3.interpolate(d.current, d.target);
              return t => d.current = i(t);
            })
          .filter(function(d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none") 

            .attrTween("d", d => () => arc(d.current));

        label.filter(function(d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
          }).transition(t)
            .attr("fill-opacity", d => +labelVisible(d.target))
            .attrTween("transform", d => () => labelTransform(d.current));
      }
      
      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }

      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }

      function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * RADIUS;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }
    }, []);

    return (
        <div>
            <svg width={SIZE} height={SIZE} ref={svgRef} />
        </div>
    );
}

export default AccountSummary;