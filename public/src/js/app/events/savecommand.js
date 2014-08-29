define(['app/utils/alertmanager', 'app/utils/storage'],

function(AlertManager, Storage) {
	
	"use strict";
	
	var SaveCommand = function(){
		
	};
	
	SaveCommand.prototype.execute = function(data){
		Storage.getInstance().save($.proxy(this.onSaved, this));
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

