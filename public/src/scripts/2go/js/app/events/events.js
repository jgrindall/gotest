define([],

function() {
	
	"use strict";
	
	var Events = function(){
		
	};

	Events.NEW_FILE 			= 		"newFile";
	Events.HIDE_UI 				= 		"hideui";
	Events.BACK 				= 		"back";
	Events.LOAD 				= 		"load";
	Events.SAVE					= 		"save";
	Events.PRINT				= 		"print";
	Events.UNDO					= 		"undo";
	Events.REWIND				= 		"rewind";
	Events.PROG_CHANGE			= 		"progChange";
	Events.TYPE_CHOICE			= 		"typeChoice";
	Events.GRID_CHOICE			= 		"gridChoice";
	Events.ADD_COMMAND			= 		"addCommand";
	Events.SHOW_ALL				=		"showAll";
	Events.DRAW					= 		"draw";
	Events.HELP					= 		"help";
	Events.VIDEO				= 		"video";
	Events.SETTINGS_VIDEO		= 		"settingsvideo";
	Events.REPLAY				= 		"replay";
	Events.REPLAY_SHARE			= 		"replayshare";
	Events.IMG_CAPTURED			= 		"imgIsCaptured";
	Events.OPEN_BG_EDITOR		= 		"openBgEditor";
	Events.EDIT_TURTLE			= 		"editTurtle";
	Events.OPEN_TURTLE_EDITOR	= 		"openTurtleEditor";
	Events.CLOSE_IMG			= 		"closeImg";
	Events.SHOW_TOUCH_IMG		= 		"showTouchImg";
	Events.FINISHED				= 		"finished";
	Events.DOWNLOAD				= 		"download";
	Events.SHARE				= 		"share";
	Events.CHECK_POSITION		=		"checkPosition";
	Events.CHECK_CHALLENGE		=		"checkChallenge";
	Events.STOP					= 		"stop";
	Events.SHOW_CHALLENGES		= 		"showChallenges";
	Events.START_ACTIVITY		= 		"startactivity";
	Events.CHOOSE_CHALLENGE	 	=		"chooseChallenge";
	Events.ROTATE_TURTLE		=		"rotateTurtle";
	Events.CHALLENGE_DONE		=		"challengeDone";

  	return Events;
});

