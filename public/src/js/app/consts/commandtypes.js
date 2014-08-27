
define(['app/game'],

function(Game){
	
	"use strict";
	
	var CommandTypes  = function(options){
		
	};
	
	CommandTypes.NSEW = 			0;
	CommandTypes.NSEW_KEYS = 		1;
	CommandTypes.NSEW_45_KEYS = 	2;
	CommandTypes.TURNING_KEYS = 	3;
	
	return CommandTypes;
});
	
	
