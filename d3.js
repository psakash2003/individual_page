const data = [
  { stateName: 'Andhra Pradesh', useCount: 57 },
  { stateName: 'Assam', useCount: 50 },
  { stateName: 'Bihar', useCount: 24 },
  { stateName: 'Chandigarh', useCount: 36 },
  { stateName: 'Chattisgarh', useCount: 34 },
  { stateName: 'Delhi', useCount: 33 },
  { stateName: 'Goa', useCount: 20 },
  { stateName: 'Gujarat', useCount: 31 },
  { stateName: 'Maharashtra', useCount: 21 },
  { stateName: 'West Bengal', useCount: 39 }
];

const width = 900;
const height = 500;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, 57])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", 'blue')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.useCount, b.useCount)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.useCount))
    .attr('title', (d) => d.useCount)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.useCount))
    .attr("width", x.bandwidth());

svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "middle")
  .attr("fill","white")
  .attr("font-size", 20)
  .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom - 52) + ")")
  .text("STATES");

svg.append("text")
  .attr("class", "y label")
  .attr("fill","white")
  .attr("font-size", 20)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90) translate(" + (-height/2) + "," + (-margin.left + 20) + ")")
  .text("AVERAGE USAGE");

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].stateName))
    .attr("font-size", '20px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
