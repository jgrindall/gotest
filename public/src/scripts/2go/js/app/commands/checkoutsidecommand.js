define(

	['phasercomponents', 

	'base/consts/turtles', 'base/consts/canvaslayout', 'base/views/popups/tooltip'],

function(PhaserComponents,

	Turtles, CanvasLayout, ToolTip) {
	
	"use strict";
	
	var CheckOutsideCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	CheckOutsideCommand.popupShown = false;

	PhaserComponents.Utils.extends(CheckOutsideCommand, PhaserComponents.Commands.AbstractCommand);

	CheckOutsideCommand.prototype.onClick = function(){
		this.alertManager.close();
	};

	CheckOutsideCommand.prototype.execute = function(data){
		var bounds, msg;
		msg = "Oops, it looks like you've gone off\nthe screen.  To get back to the start\nyou can the click rewind button.";
		if(data.x < -Turtles.WIDTH/2 || data.x > CanvasLayout.REF_WIDTH + Turtles.WIDTH/2 || data.y < -Turtles.HEIGHT/2 || data.y > CanvasLayout.REF_HEIGHT + Turtles.HEIGHT/2){
			if(!CheckOutsideCommand.popupShown){
				bounds = {'x':this.game.w - 610, 'y':28};
				this.alertManager.make(ToolTip, {"name":"outside", "title":"Message", "label":msg, "arrow":4, "imageAsset":null}, this.onClick.bind(this), bounds);
				CheckOutsideCommand.popupShown = true;
			}
		}
		else{
			this.alertManager.close(null, "outside");
		}
	};
	
  	return CheckOutsideCommand;
});
