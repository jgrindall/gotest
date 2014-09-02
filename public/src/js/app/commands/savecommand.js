define('app/commands/savecommand',['app/utils/alertmanager',

	'app/utils/storage', 'app/models/modelfacade'],

function(AlertManager,

	Storage, ModelFacade) {
	
	"use strict";
	
	var SaveCommand = function(){
		
	};
	
	SaveCommand.prototype.execute = function(data){
		var json = ModelFacade.getInstance().getJson();
		Storage.getInstance().save(json, this.onSaved.bind(this));
	};
	
	SaveCommand.prototype.onSaved = function(data){
		if(data.success){
			AlertManager.makeGrowl({"label":"Saved"}, null);
		}
		else{
			AlertManager.makeGrowl({"label":"Error saving"}, null);
		}
	};
	
  	return SaveCommand;
});

