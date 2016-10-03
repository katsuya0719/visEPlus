var svg = dimple.newSvg("#chartContainer", 590, 400);

d3.tsv("static/csv/Nantou/energy.csv", function (data) {
      var myChart = new dimple.chart(svg, data);
      myChart.setBounds(60, 45, 510, 315)
      myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
      myChart.addMeasureAxis("y", "Unit Sales");
      myChart.addSeries("Owner", dimple.plot.bar);
      myChart.addLegend(200, 10, 380, 20, "right");
      myChart.draw();
    });