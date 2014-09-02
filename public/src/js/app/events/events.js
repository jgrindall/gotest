define('app/events/events',[],

function() {
	
	"use strict";
	
	var Events = function(){
		
	};

	Events.NEW_FILE 		= 		"newFile";
	Events.LOAD 			= 		"load";
	Events.SAVE				= 		"save";
	Events.PRINT			= 		"print";
	Events.UNDO				= 		"undo";
	Events.STOP				= 		"stop";
	Events.TEACHER_LOGIN	= 		"teacherLogin";
	Events.TYPE_CHOICE		= 		"typeChoice";
	Events.GRID_CHOICE		= 		"gridChoice";
	Events.ADD_COMMAND		= 		"addCommand";
	Events.DRAW				= 		"draw";
	Events.REPLAY			= 		"replay";
	Events.FINISHED			= 		"finished";
	Events.STARTUP			= 		"startup";
	
  	return Events;
});




