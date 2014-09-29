define([],

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
	Events.PROG_CHANGE		= 		"progChange";
	Events.TYPE_CHOICE		= 		"typeChoice";
	Events.GRID_CHOICE		= 		"gridChoice";
	Events.ADD_COMMAND		= 		"addCommand";
	Events.DRAW				= 		"draw";
	Events.ENTER_FS			= 		"enterFs";
	Events.EXIT_FS			= 		"exitFs";
	Events.REPLAY			= 		"replay";
	Events.FINISHED			= 		"finished";
	Events.STARTUP			= 		"startup";
	Events.DESIGN_IMG		=		"designImg";
	Events.ROTATE_TURTLE	=		"rotateTurtle";
	
  	return Events;
});

