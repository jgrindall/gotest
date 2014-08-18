define(['app/scenes/comms/block'], function(Block){
	
	"use strict";
	
	var BlockTypes = function(){
	
	};

	BlockTypes.create = function(type){
		if(type === 0){
			return new Block(0, 'block0');
		}
		else if(type === 1){
			return new Block(1, 'block1');
		}
		else if(type === 2){
			return new Block(2, 'block2');
		}
		else{
			return new Block(3, 'block3');
		}
	};
	
	return BlockTypes;
	
});




