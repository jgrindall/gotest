
define([],

function(){
	
	"use strict";
	
	var CommSpeed  = function(){
		
	};
	
	CommSpeed.VSLOW = 	0;
	CommSpeed.SLOW = 	1;
	CommSpeed.MED = 	2;
	CommSpeed.FAST = 	3;
	CommSpeed.VFAST = 	4;
	
	CommSpeed.SPEED_FACTOR = 80;

	CommSpeed.ALL = [20, 10, 6, 3, 1];
	
	return CommSpeed;

});
	
