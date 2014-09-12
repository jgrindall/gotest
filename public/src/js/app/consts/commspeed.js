
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
	
	CommSpeed.SPEED_FACTOR = 100;

	CommSpeed.ALL = [15, 9, 5, 3, 1];
	
	return CommSpeed;

});
	
