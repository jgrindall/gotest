define([],

function() {
	
	"use strict";
	
	var Events = function(){
		
	};

	Events.NEW_FILE 			= 		"newFile";
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
	Events.REPLAY				= 		"replay";
	Events.IMG_CAPTURED			= 		"imgCaptured";
	Events.OPEN_BG_EDITOR		= 		"openBgEditor";
	Events.EDIT_TURTLE			= 		"editTurtle";
	Events.OPEN_TURTLE_EDITOR	= 		"openTurtleEditor";
	Events.IMG_CAPTURED			= 		"imgCaptured";
	Events.CLOSE_IMG			= 		"closeImg";
	Events.SHOW_TOUCH_IMG		= 		"showTouchImg";
	Events.FINISHED				= 		"finished";
	Events.DOWNLOAD				= 		"download";
	Events.STOP					= 		"stop";
	Events.SHOW_CHALLENGES		= 		"showChallenges";
	Events.START_ACTIVITY		= 		"startactivity";
	Events.CHOOSE_CHALLENGE	 	=		"chooseChallenge";
	Events.ROTATE_TURTLE		=		"rotateTurtle";
	Events.BG_EDITOR_DONE		=		"bgEditorDone";
	Events.TURTLE_EDITOR_DONE	=		"turtleEditorDone";
	
  	return Events;
});

