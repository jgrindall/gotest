define(

	['phasercomponents', 'app/models/modelconsts', 

	'app/consts/turtles', 'app/consts/canvaslayout', 'app/views/popups/tooltip', 'app/assets'],

function(PhaserComponents, ModelConsts,

	Turtles, CanvasLayout, ToolTip, Assets) {
	
	"use strict";
	
	var CheckOutsideCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(CheckOutsideCommand, PhaserComponents.Commands.AbstractCommand);

	CheckOutsideCommand.prototype.execute = function(data){
		var bounds, msg;
		msg = "Oops, it looks like you've gone off\nthe screen!  To get back to the start\nyou can the click rewind button.";
		if(data.x < -Turtles.WIDTH/2 || data.x > CanvasLayout.REF_WIDTH + Turtles.WIDTH/2 || data.y < -Turtles.HEIGHT/2 || data.y > CanvasLayout.REF_HEIGHT + Turtles.HEIGHT/2){
			bounds = {'x':this.game.w - 558, 'y':30};
			this.alertManager.make(ToolTip, {"name":"outside", "title":"Message", "label":msg, "arrow":4, "imageAsset":null}, null, bounds);
			//Assets.TOOLTIP_IMAGES[0]
		}
		else{
			this.alertManager.close(null, "outside");
		}
	};
	
  	return CheckOutsideCommand;
});

