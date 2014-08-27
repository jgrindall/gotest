
define(['app/game'],

function(Game){
	
	"use strict";
	
	var CommandTypes  = function(options){
		
	};
	
	CommandTypes.NSEW = 			0;
	CommandTypes.NSEW_KEYS = 		1;
	CommandTypes.DIAG = 			2;
	CommandTypes.DIAG_KEYS = 		3;
	CommandTypes.TURNING_KEYS = 	4;
	
	return CommandTypes;
});
	
	
