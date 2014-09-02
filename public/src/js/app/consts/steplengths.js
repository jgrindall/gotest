
define('app/consts/steplengths',[],

function(){
	
	"use strict";
	
	var StepLengths  = function(){
		
	};
	
	StepLengths.VSHORT = 	0;
	StepLengths.SHORT = 	1;
	StepLengths.MED = 		2;
	StepLengths.LONG = 		3;
	StepLengths.VLONG = 	4;

	StepLengths.ALL = [20, 40, 60, 80, 100];
	
	StepLengths.GCD = 20;
	// greatest common divisor

	return StepLengths;

});
	
