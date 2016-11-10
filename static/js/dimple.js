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

function arrtoObj(arr1,arr2){
	var arr=[];
	var obj={};
	var len=arr1.length;
	console.log(len);
	for(var i=0; i<len; ++i){
		obj["category"]=arr1[i];
		obj["electricity"]=arr2[i];

		arr.push(obj);
	};
	return arr
};
d3.csv("static/csv/Nantou/energy.csv", function (data) {
	var arr=[];
	var category=[];
	var electricity=[];
	data.forEach(function(d){
            if(d.Subcategory=="General"){
                d.category = d[""]
            }else if(d.Subcategory!="General"){
                d.category = d.Subcategory;
            };
            //obj["category"]=d.category;
            category.push(d.category);

          d.electricity= +d["Electricity [kWh]"];
          //obj["electricity"]=d.electricity;
          electricity.push(d.electricity);
        });
	arr=arrtoObj(category,electricity);

    //ObjArraySort(data,"electricity","DESC");

    console.log(arr);

    var myChart = new dimple.chart(svg, arr);

    myChart.setBounds(60, 45, 510, 315)
    myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
    myChart.addMeasureAxis("y", "Unit Sales");
    myChart.addSeries("Owner", dimple.plot.bar);
    myChart.addLegend(200, 10, 380, 20, "right");
    myChart.draw();

});