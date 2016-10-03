var svg = dimple.newSvg("#bar", 590, 400);

    function ObjArraySort(ary, key, order) {
        var reverse = 1;
        if(order && order.toLowerCase() == "desc") 
            reverse = -1;
        ary.sort(function(a, b) {
            if(a[key] < b[key])
                return -1 * reverse;
            else if(a[key] == b[key])
                return 0;
            else
                return 1 * reverse;
        });
    }

d3.csv("static/csv/Nantou/energy.csv", function (data) {
	data.forEach(function(d){
            if(d.Subcategory=="General"){
                d.category = d[""]
            }else if(d.Subcategory!="General"){
                d.category = d.Subcategory;
            };
            /*
          if (d[""]==" "){
            d.category = d.Subcategory;
          }else if(d[""]!=" "){
            d.category = d[""];
          };
          */
          d.electricity= +d["Electricity [kWh]"];
          
        });
        /*
        var data = data.filter(function(item){
                if (item.electricity>0){
                    return true;
                    }
                });
        */

    ObjArraySort(data,"electricity","DESC");

    console.log(data);
    
    var myChart = new dimple.chart(svg, data);

    myChart.setBounds(60, 45, 510, 315)
    myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
    myChart.addMeasureAxis("y", "Unit Sales");
    myChart.addSeries("Owner", dimple.plot.bar);
    myChart.addLegend(200, 10, 380, 20, "right");
    myChart.draw();

});