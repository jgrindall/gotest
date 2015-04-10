define(

	['phasercomponents', 

	'base/consts/turtles', 'base/consts/canvaslayout', 'base/views/popups/tooltip',

	'base/utils/translation', 'base/utils/translationconsts', 'base/models/modelconsts'],

function(PhaserComponents,

	Turtles, CanvasLayout, ToolTip,

	Translation, TranslationConsts, ModelConsts) {
	
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
		var replaying, bounds, msg;
		replaying = this.modelFacade.get(ModelConsts.REPLAYING).get();
		if(replaying){
			return;
		}
		msg = Translation.getForKey(TranslationConsts.Keys.OOPS_OFF_SCREEN);
		if(data.x < -Turtles.WIDTH/2 || data.x > CanvasLayout.REF_WIDTH + Turtles.WIDTH/2 || data.y < -Turtles.HEIGHT/2 || data.y > CanvasLayout.REF_HEIGHT + Turtles.HEIGHT/2){
			if(!CheckOutsideCommand.popupShown){
				bounds = {'x':this.game.w - 610, 'y':28};
				this.alertManager.make(ToolTip, {"name":"outside", "title":Translation.getForKey(TranslationConsts.Keys.MESSAGE_TITLE), "label":msg, "arrow":4, "imageAsset":null}, this.onClick.bind(this), bounds);
				CheckOutsideCommand.popupShown = true;
			}
		}
		else{
			this.alertManager.close(null, "outside");
		}
	};
	
  	return CheckOutsideCommand;
});

