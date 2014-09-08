define('app/commands/typechoicecommand',[

	'app/models/modelfacade',

	'phasercomponents', 'app/views/popups/gamescreenmenu', 'app/assets'],

function(ModelFacade,

	PhaserComponents, GameScreenMenu, Assets) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(TypeChoiceCommand, PhaserComponents.Commands.AbstractCommand);

	TypeChoiceCommand.prototype.execute = function(data){
		var screenModel, radioModel, options;
		screenModel = new PhaserComponents.Model.ButtonGridModel();
		radioModel = new PhaserComponents.Model.ButtonGridModel();
		screenModel.set(ModelFacade.getInstance().get(ModelFacade.SCREEN).get());
		radioModel.set(ModelFacade.getInstance().get(ModelFacade.ANGLE).get());
		options = {"screenModel":screenModel, "radioModel":radioModel, "sfx":Assets.SOUNDS[2]};
		PhaserComponents.AlertManager.getInstance().make(GameScreenMenu, options, this.onScreenChosen.bind(this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 0){
			ModelFacade.getInstance().get(ModelFacade.SCREEN).set(data.selection.screenIndex);
			ModelFacade.getInstance().get(ModelFacade.ANGLE).set(data.selection.radioIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	