import React, { Component } from "react";
import * as d3 from "d3";
import './App.css'

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    var div = d3.select("body").selectAll(".tooltip").data([0]).join('div').attr('class', "tooltip").style("opacity", [0])

    
    const margin = { top: 50, right: 10, bottom: 50, left: 30 },
      w = 500 - margin.left - margin.right,
      h = 400 - margin.top - margin.bottom;

    const data = this.props.data2;
    var flat_data = d3.flatRollup(
        data,
        (v) => d3.mean(v, (d) => d.tip),
        (d) => d.day
    );


    const x_data = flat_data.map(item => item[0])


    const y_data = flat_data.map(item => item[1])

    const container = d3.selectAll(".child2_svg")
        .attr("width", w+margin.left+margin.right)
        .attr("height", h+margin.bottom+margin.top)
        .select(".g_2")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    var xscale = d3.scaleBand().domain(x_data).range([30,w]).padding(0.1)

    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(xscale));

    container.append("text")
    .attr("class", "x_axis_g")
    .attr("text-anchor", "end")
    .attr("x", w - 200)
    .attr("y", h + 35)
    .text("Day");

    container.append("text")
    .attr("class", "x_axis_g")
    .attr("text-anchor", "end")
    .attr("x", w - 150)
    .attr("y", h - 310)
    .text("Average Tip by Day");

    var yscale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0])

    

    container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'y_axis_g')
    .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(yscale));

    container.append("text")
    .attr("class", "y_axis_g")
    .attr("text-anchor", "end")
    .attr("x", w - 575)
    .attr("y", h - 305)
    .attr("transform", "rotate(-90)")
    .text("Average Tip");
    
    container.selectAll('.bar').data(flat_data)
      .join('rect')
      .attr('className', 'bar')
      .attr('x', d => xscale(d[0])).attr('width', xscale.bandwidth())
      .attr('y', d => yscale(d[1])).attr('height', d => h-yscale(d[1]))
      .attr('fill', "#69b3a2")
      .on("mousemove", (event, d) => {
        div.style("opacity", 1).html(d[0] + ": " + d[1]).style("left", (event.pageX) + "px").style("top", (event.pageY) + "px")
      })
      .on('mouseout', () => {
        div.style('opacity', 0)})

    
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;