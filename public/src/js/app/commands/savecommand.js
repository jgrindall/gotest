define('app/commands/savecommand',['phasercomponents',

	'app/models/modelfacade', 'app/views/popups/growl', 'app/assets'],

function(PhaserComponents,

	ModelFacade, Growl, Assets) {
	
	"use strict";
	
	var SaveCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(SaveCommand, PhaserComponents.Commands.AbstractCommand);

	SaveCommand.prototype.execute = function(data){
		var json = ModelFacade.getInstance().getJson();
		PhaserComponents.Storage.getInstance().save(json, this.onSaved.bind(this));
	};
	
	SaveCommand.prototype.onSaved = function(data){
		if(data.success){
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Saved", "sfx":Assets.SOUNDS[2]}, null);
		}
		else{
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Error saving", "sfx":Assets.SOUNDS[2]}, null);
		}
	};
	
  	return SaveCommand;
});

