
define(['app/consts/challengedata'], function(ChallengeData) {
	
	"use strict";
	
   	var Defaults = function (){
			
    };

	Defaults.TURTLE_MAP = [6, 3, 2, 5, 1, 2, 2, 7, 4, 6, 0, 8, 0, 0, 0, 0, 9];

	Defaults.DEFAULT_SETTINGS = {
		'bg':0,
		'screen':0,
		'speed':2,
		'color':0,
		'angle':0,
		'stepLength':3,
		'width':2,
		'grid':0,
		'prog':0,
		'turtlePng':null,
		'bgPng':null,
		'progNum':0,
		'allowProg':0,
		'turtle':6,
		'diag':1,
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
		settings.bg = 			ChallengeData.CHALLENGE_BG[i];
		settings.screen = 		ChallengeData.CHALLENGE_SCREEN[i];
		settings.color = 		ChallengeData.CHALLENGE_COLOR[i];
		settings.angle =		ChallengeData.ANGLE[i];
		settings.stepLength = 	ChallengeData.CHALLENGE_STEP_LENGTH[i];
		settings.grid = 		ChallengeData.CHALLENGE_GRID[i];
		settings.prog = 		ChallengeData.CHALLENGE_PROG[i];
		settings.allowProg = 	ChallengeData.CHALLENGE_ALLOW_PROG[i];
		settings.turtle = 		ChallengeData.CHALLENGE_TURTLE[i];
		settings.diag = 		ChallengeData.CHALLENGE_DIAG[i];
		settings.startPos = 	ChallengeData.CHALLENGE_START_POS[i];
		return {
			'settings':settings,
			'commands':[],
			'prog':[]
		};
	};

	return Defaults;
});

