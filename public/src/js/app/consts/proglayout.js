
define([],

function(){
	
	"use strict";
	
	var ProgLayout  = function(){
		
	};
	
	ProgLayout.NONE = 			{};
	ProgLayout.LINEAR = 		{"num": 6, "top":70, "bottom":420};
	ProgLayout.DBL_LINEAR = 	{"num": 12, "top":70, "leftX":30, "middleX":55, "rightX":119, "bottom":410, "firstY":66};
	ProgLayout.LOOP = 			{"num": 6, "top":70, "bottom":420, "paddingTop":65, "paddingBottom":10, "lineWidth":115};
	
	ProgLayout.ALL = [ProgLayout.NONE, ProgLayout.LINEAR, ProgLayout.DBL_LINEAR, ProgLayout.LOOP];

	return ProgLayout;
});
	
