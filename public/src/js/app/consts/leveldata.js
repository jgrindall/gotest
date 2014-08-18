
define([], function(){
	
	"use strict";
	
	var LevelData = function(){
	
	};
	
	LevelData.getLevel = function(page, level){
		var data = LevelData.PAGES[page][level];
		return data;
	};
	
	LevelData.getIndents = function(type){
		return (LevelData.INDENTS_TYPES.indexOf(type) >= 0);
	};
	
	LevelData.getUnindents = function(type){
		return (LevelData.UNINDENTS_TYPES.indexOf(type) >= 0);
	};
	
	LevelData.TILE_TYPE_FD = 		0;
	LevelData.TILE_TYPE_BACK = 		1;
	LevelData.TILE_TYPE_RPT = 		2;
	LevelData.TILE_TYPE_ENDRPT = 	3;
	LevelData.TILE_TYPE_JUMPBACK = 	4;
	LevelData.TILE_TYPE_REPEAT2 = 	5;
	LevelData.TILE_TYPE_REPEAT3 = 	6;
	LevelData.TILE_TYPE_REPEAT4 = 	7;
	LevelData.TILE_TYPE_REPEAT5 = 	8;
	LevelData.TILE_TYPE_FN1 = 		9;
	LevelData.TILE_TYPE_FN2 = 		10;
	LevelData.TILE_TYPE_FN3 = 		11;
	
	LevelData.INDENTS_TYPES = 		[2];
	LevelData.UNINDENTS_TYPES = 	[3];
	
	LevelData.BLOCK0 = "assets/images/blocks/block0.png";
	LevelData.BLOCK1 = "assets/images/blocks/block1.png";
	LevelData.BLOCK2 = "assets/images/blocks/block2.png";
	LevelData.BLOCK3 = "assets/images/blocks/block3.png";

	LevelData.BLOCK = [LevelData.BLOCK0, LevelData.BLOCK1];

	LevelData.PAGE0_LEVEL0 = {"tiles": [3, 4, 3, 3], "tabs":3};
	LevelData.PAGE0_LEVEL1 = {"tiles": [2, 2, 3, 3], "tabs":2};
	LevelData.PAGE0 = [LevelData.PAGE0_LEVEL0, LevelData.PAGE0_LEVEL1];
	
	LevelData.PAGE1_LEVEL0 = {"tiles": [3, 4, 3, 3], "tabs":3};
	LevelData.PAGE1_LEVEL1 = {"tiles": [2, 2, 3, 3], "tabs":2};
	LevelData.PAGE1 = [LevelData.PAGE1_LEVEL0, LevelData.PAGE1_LEVEL1];
	
	LevelData.PAGES = [LevelData.PAGE0, LevelData.PAGE1];
	
	return LevelData;

});






