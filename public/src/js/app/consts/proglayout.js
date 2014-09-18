
define([],

function(){
	
	"use strict";
	
	var ProgLayout  = function(){
		
	};
	
	ProgLayout.NONE = 			{};
	ProgLayout.LINEAR = 		{"num": 6, "top":70, "bottom":420, "blockTop":60, "gap":55};
	ProgLayout.DBL_LINEAR = 	{"num": 12, "top":70, "leftX":40, "middleX":55, "rightX":95, "bottom":410, "firstY":66, "blockTop":60, "gap":55};
	ProgLayout.LOOP = 			{"num": 6, "top":70, "bottom":420, "paddingTop":65, "paddingBottom":10, "lineWidth":115, "blockTop":60, "gap":55};
	
	ProgLayout.ALL = [ProgLayout.NONE, ProgLayout.LINEAR, ProgLayout.DBL_LINEAR, ProgLayout.LOOP];

	return ProgLayout;
});
	
