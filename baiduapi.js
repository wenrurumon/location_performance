<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		body, html {width: 100%;height: 100%;margin:0;font-family:"微软雅黑";}
		#allmap{width:100%;height:500px;}
		p{margin-left:5px; font-size:14px;}
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=CahOhKj71xM6v5LOgGhprnEHgGMowHHt"></script>
	<title>圆形区域搜索</title>
</head>
<body>
	<div id="allmap" style="display:none"></div>
	<div id="r-result"></div>
  </body>
</html>
<script type="text/javascript">
	// 百度地图API功能
	var keyword = '餐厅';
	var map = new BMap.Map("allmap");            // 创建Map实例
	var mPoint = new BMap.Point(104.055164, 30.650996);  
	map.enableScrollWheelZoom();
	map.centerAndZoom(mPoint,15);

	var circle = new BMap.Circle(mPoint,500,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false},
 pageCapacity:100, 
 onSearchComplete: function(results){
			// 判断状态是否正确
			if (local.getStatus() == BMAP_STATUS_SUCCESS){
				var s = [];
				for (var i = 0; i < results.getCurrentNumPois(); i ++){
					s.push(results.getPoi(i).title + ", " + results.getPoi(i).address + ", " + 
						results.getPoi(i).point.lat + ", " + results.getPoi(i).point.lng);
					console.log(results.getPoi(i));
				}
				document.getElementById("r-result").innerHTML = s.join("<br/>");
			}
		}});  
    local.searchNearby(keyword,mPoint,250);
</script>
