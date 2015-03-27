
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
	
	CommSpeed.SPEED_FACTOR = 30;

	CommSpeed.ALL = [34, 20, 10, 5, 1];
	
	return CommSpeed;

});
	
