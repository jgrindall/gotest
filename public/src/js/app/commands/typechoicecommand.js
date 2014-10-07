define([

	'app/models/modelfacade',

	'phasercomponents', 'app/views/popups/gamescreenmenu', 'app/assets'],

function(ModelFacade,

	PhaserComponents, GameScreenMenu, Assets) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(TypeChoiceCommand, PhaserComponents.Commands.AbstractCommand);

	TypeChoiceCommand.prototype.execute = function(){
		var screenModel, radioModel, options;
		screenModel = new PhaserComponents.Model.ButtonGridModel();
		radioModel = new PhaserComponents.Model.ButtonGridModel();
		screenModel.set(this.modelFacade.get(ModelFacade.SCREEN).get());
		radioModel.set(this.modelFacade.get(ModelFacade.ANGLE).get());
		options = {"screenModel":screenModel, "radioModel":radioModel, "sfx":Assets.SOUNDS[2]};
		this.alertManager.make(GameScreenMenu, options, this.onScreenChosen.bind(this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 0){
			this.modelFacade.get(ModelFacade.SCREEN).set(data.selection.screenIndex);
			this.modelFacade.get(ModelFacade.ANGLE).set(data.selection.radioIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	