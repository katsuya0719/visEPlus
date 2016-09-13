var width = 1200,
    height = 600,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.electricity; });

var svg = d3.select("#pie").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

function pieChart(csv){
  d3.csv(csv, type, function(error, data) {
    data.forEach(function(d){
      if (d[""]==" "){
        d.category = d.Subcategory;
      }else if(d[""]!=" "){
        d.category = d[""];
      };
      d.electricity= +d["Electricity [kWh]"];
      //sumArr(data);
    });

  if (error) throw error;
  console.log(data);

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.category); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.category; });
  });
};
/*
function sumArr(obj){

};
*/
function type(d) {
  d.population = +d.population;
  return d;
}

pieChart("static/csv/energy.csv");