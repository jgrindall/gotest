
define([], function(){
	
	"use strict";
	
	var LayoutData = function(){
	
	};
	
	LayoutData.getData = function(page, level){
		return LayoutData.PAGES[page][level] || LayoutData.PAGE0_LEVEL0;
	};
	
	LayoutData.PAGE0_LEVEL0 = {"gunners":{"x":450, "y":40},"killareas":{"x":250, "y":100}, "hero":{"x":10, "y":10, "vx":0, "vy":0}, stars: {"x":250, "y":100},	enemies:{"x":50, "y":0, "vx":40, "vy":0}, "tiles":{levelName:'level1', tileImage:'tiles1', layerName:'tileLayer1'}};
	LayoutData.PAGE0_LEVEL1 = LayoutData.PAGE0_LEVEL0;
	LayoutData.PAGE0 = [LayoutData.PAGE0_LEVEL0, LayoutData.PAGE0_LEVEL1];
	
	LayoutData.PAGE1_LEVEL0 = LayoutData.PAGE0_LEVEL0;
	LayoutData.PAGE1_LEVEL1 = LayoutData.PAGE0_LEVEL0;
	LayoutData.PAGE1 = [LayoutData.PAGE1_LEVEL0, LayoutData.PAGE1_LEVEL1];
	
	LayoutData.PAGES = [LayoutData.PAGE0, LayoutData.PAGE1];
	
	return LayoutData;

});

	



