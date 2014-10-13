
define(['jquery'], function($) {
	
	"use strict";
	
   	var Defaults = function (){
			
    };
	
	Defaults.CHALLENGE_BG = [6, 2, 4, 10];	

	Defaults.DEFAULT_SETTINGS = {
		'bg':0,
		'screen':0,
		'speed':2,
		'color':0,
		'angle':0,
		'stepLength':2,
		'width':2,
		'grid':0,
		'prog':0,
		'turtlePng':null,
		'bgPng':null,
		'progNum':0,
		'allowProg':0,
		'turtle':0,
		'diag':0,
		'startPos':{'x':0.5, 'y':0.5},
	};
	
	Defaults.getDefaults = function(){
		var settings = $.extend({}, Defaults.DEFAULT_SETTINGS);
		return {
			'settings':settings,
			'commands':[],
			'prog':[]
		};
	};

	Defaults.getChallenge = function(i){
		var settings = $.extend({}, Defaults.DEFAULT_SETTINGS);
		settings.bg = Defaults.CHALLENGE_BG[i];
		return {
			'settings':settings,
			'commands':[],
			'prog':[]
		};
	};

	return Defaults;
});






