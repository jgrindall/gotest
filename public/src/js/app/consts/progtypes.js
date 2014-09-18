
define([],

function(){
	
	"use strict";
	
	var ProgTypes  = function(){
		
	};
	
	ProgTypes.NONE = 			0;
	ProgTypes.LINEAR = 			1;
	ProgTypes.DBL_LINEAR = 		2;
	ProgTypes.LOOP = 			3;
	
	ProgTypes.ALL = [ProgTypes.NONE, ProgTypes.LINEAR, ProgTypes.DBL_LINEAR, ProgTypes.LOOP];

	return ProgTypes;
});
	
	
