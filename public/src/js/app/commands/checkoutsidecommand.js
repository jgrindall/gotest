define(

	['phasercomponents', 'app/models/modelconsts', 

	'app/consts/turtles', 'app/consts/canvaslayout'],

function(PhaserComponents, ModelConsts,

	Turtles, CanvasLayout) {
	
	"use strict";
	
	var CheckOutsideCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(CheckOutsideCommand, PhaserComponents.Commands.AbstractCommand);

	CheckOutsideCommand.prototype.execute = function(data){
		if(data.x < -Turtles.WIDTH/2 || data.x > CanvasLayout.REF_WIDTH + Turtles.WIDTH/2 || data.y < -Turtles.HEIGHT/2 || data.y > CanvasLayout.REF_HEIGHT + Turtles.HEIGHT/2){
			console.log("outside! ", data);
		}
	};
	
  	return CheckOutsideCommand;
});

