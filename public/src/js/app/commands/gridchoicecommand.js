define(

	['phasercomponents', 'app/views/popups/gridmenu',

	'app/assets', 'app/models/modelconsts'],

function(PhaserComponents, GridMenu,

	Assets, ModelConsts) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(GridChoiceCommand, PhaserComponents.Commands.AbstractCommand);

	GridChoiceCommand.prototype.execute = function(){
		var options = {"label":"Settings", "sfx":Assets.SOUNDS[2]};
		this.alertManager.make(GridMenu, options, this.onDataChosen.bind(this)); 
	};
	
	GridChoiceCommand.prototype.onDataChosen = function(data){
		var sel0, sel1;
		sel0 = data.selection[0];
		sel1 = data.selection[1];
		this.modelFacade.get(ModelConsts.SCREEN).set(sel0.screenIndex);
		this.modelFacade.get(ModelConsts.ANGLE).set(sel0.radioIndex);
	};

  	return GridChoiceCommand;
});


	