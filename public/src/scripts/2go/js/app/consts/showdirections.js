
define([], function() {
	
	"use strict";
	
   	var ShowDirections = function (){
			
    };
	
	ShowDirections.DOWN = 0;
	ShowDirections.UP = 1;
	ShowDirections.LEFT = 2;
	ShowDirections.RIGHT = 3;
	
	ShowDirections.DIR = [[0, -1], [0, 1], [1, 0], [-1, 0]];

	return ShowDirections;
});






