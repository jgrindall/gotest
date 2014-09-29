
define([], function() {
	
	"use strict";
	
   	var Defaults = function (){
			
    };
	
	Defaults.SETTINGS = {
		'bg':0,
		'screen':0,
		'speed':2,
		'color':0,
		'angle':0,
		'stepLength':2,
		'width':2,
		'grid':0,
		'prog':0,
		'progNum':0,
		'allowProg':0,
		'turtle':0,
		'diag':0,
		'startPos':{'x':0.5, 'y':0.5},
	};

	Defaults.DEFAULT_JSON = {
		'settings':Defaults.SETTINGS,
		'commands':[],
		'prog':[]
	};
	
	return Defaults;
});






