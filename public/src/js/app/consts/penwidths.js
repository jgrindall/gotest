
define([],

function(){
	
	"use strict";
	
	var PenWidths  = function(){
		
	};
	
	PenWidths.VTHIN = 	0;
	PenWidths.THIN = 	1;
	PenWidths.MED = 	2;
	PenWidths.THICK = 	3;
	PenWidths.VTHICH = 	4;

	// need to be even to look nice
	PenWidths.ALL = [16, 12, 6, 4, 2];
	
	return PenWidths;

});
	
