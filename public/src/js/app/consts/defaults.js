
define('app/consts/defaults',[], function() {
	
	"use strict";
	
   	var Defaults = function (){
			
    };
	
	Defaults.SETTINGS = {
		'bg':0,
		'screen':0,
		'speed':2,
		'color':0,
		'stepLength':2,
		'width':2,
		'grid':0,
		'diag':0,
	};

	Defaults.DEFAULT_JSON = {
		'settings':Defaults.SETTINGS,
		'commands':[]
	};
	
	return Defaults;
});






