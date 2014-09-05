define('app/commands/savecommand',['phasercomponents',

	'app/models/modelfacade', 'app/components/popups/growl'],

function(PhaserComponents,

	ModelFacade, Growl) {
	
	"use strict";
	
	var SaveCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	SaveCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	SaveCommand.prototype.constructor = SaveCommand;

	SaveCommand.prototype.execute = function(data){
		var json = ModelFacade.getInstance().getJson();
		PhaserComponents.Storage.getInstance().save(json, this.onSaved.bind(this));
	};
	
	SaveCommand.prototype.onSaved = function(data){
		if(data.success){
			PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Saved"}, null);
		}
		else{
			PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Error saving"}, null);
		}
	};
	
  	return SaveCommand;
});

