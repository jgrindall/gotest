
define([], function() {
	
	"use strict";
	
   	var Defaults = function (){
			
    };

	Defaults.MESSAGES = 				[];
	Defaults.MESSAGES.push("Guide the fish to the treasure!");
	Defaults.MESSAGES.push("Guide the car to bank, and then to the hospital!");
	Defaults.MESSAGES.push("Fly to both of the poppies!");
	Defaults.MESSAGES.push("Get to the cheese!");
	Defaults.MESSAGES.push("Drive the car around the track!");
	Defaults.MESSAGES.push("Write a program to draw a star shape!");
	

	Defaults.CHALLENGE_BG = 			[4, 2, 0, 6, 5, 9];
	Defaults.CHALLENGE_SCREEN = 		[0, 1, 2, 2, 3, 3];
	Defaults.CHALLENGE_COLOR = 			[0, 0, 2, 0, 0, 9];
	Defaults.CHALLENGE_STEP_LENGTH = 	[4, 2, 2, 2, 2, 2];
	Defaults.CHALLENGE_GRID = 			[1, 1, 1, 1, 1, 0];
	Defaults.CHALLENGE_PROG = 			[0, 0, 1, 2, 2, 3];
	Defaults.CHALLENGE_ALLOW_PROG = 	[0, 0, 1, 1, 1, 1];
	Defaults.CHALLENGE_TURTLE = 		[1, 2, 6, 7, 2, 8];
	Defaults.CHALLENGE_DIAG = 			[0, 0, 1, 1, 1, 1];
	Defaults.CHALLENGE_START_POS = 		[{'x':0.8, 'y':0.1}, {'x':0.8, 'y':0.2}, {'x':0.2, 'y':0.9}, {'x':0.05, 'y':0.8}, {'x':0.5, 'y':0.1}, {'x':0.5, 'y':0.5}];

	Defaults.DEFAULT_SETTINGS = {
		'bg':0,
		'screen':0,
		'speed':2,
		'color':0,
		'angle':0,
		'stepLength':4,
		'width':2,
		'grid':0,
		'prog':0,
		'turtlePng':null,
		'bgPng':null,
		'progNum':0,
		'allowProg':0,
		'turtle':6,
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
		settings.bg = 			Defaults.CHALLENGE_BG[i];
		settings.screen = 		Defaults.CHALLENGE_SCREEN[i];
		settings.color = 		Defaults.CHALLENGE_COLOR[i];
		settings.stepLength = 	Defaults.CHALLENGE_STEP_LENGTH[i];
		settings.grid = 		Defaults.CHALLENGE_GRID[i];
		settings.prog = 		Defaults.CHALLENGE_PROG[i];
		settings.allowProg = 	Defaults.CHALLENGE_ALLOW_PROG[i];
		settings.turtle = 		Defaults.CHALLENGE_TURTLE[i];
		settings.diag = 		Defaults.CHALLENGE_DIAG[i];
		settings.startPos = 	Defaults.CHALLENGE_START_POS[i];
		return {
			'settings':settings,
			'commands':[],
			'prog':[]
		};
	};

	return Defaults;
});

