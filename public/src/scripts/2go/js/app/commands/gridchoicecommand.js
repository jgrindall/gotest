define(

	['phasercomponents', 'base/views/popups/gridmenu',

	'base/assets', 'base/models/modelconsts', 'base/events/events'],

function(PhaserComponents, GridMenu,

	Assets, ModelConsts, Events) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(GridChoiceCommand, PhaserComponents.Commands.AbstractCommand);

	GridChoiceCommand.prototype.execute = function(){
		var options = {"label":"Settings", "sfx":Assets.SOUNDS[2]};
		options.screenModel = this.modelFacade.get(ModelConsts.SCREEN);
		options.radioModel = new PhaserComponents.Model.ButtonGridModel();
		options.radioModel.set(this.modelFacade.get(ModelConsts.ANGLE).get());
		this.alertManager.make(GridMenu, options, this.onDataChosen.bind(this)); 
	};
	
	GridChoiceCommand.prototype.onDataChosen = function(data){
		var sel0, sel1;
		if(data.index === 2){
			this.eventDispatcher.trigger({"type":Events.SETTINGS_VIDEO});
		}
		else if(data.index === 1){
			this.alertManager.close();
			sel0 = data.selection[0];
			sel1 = data.selection[1];
			this.modelFacade.get(ModelConsts.ANGLE).set(sel0.radioIndex);
		}
		else if(data.index === 0){
			this.alertManager.close();
		}
	};

  	return GridChoiceCommand;
});


	