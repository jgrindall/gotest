define(['app/utils/alertmanager', 'app/utils/storage'],

function(AlertManager, Storage) {
	
	"use strict";
	
	var LoadCommand = function(){
		
	};
	
	LoadCommand.prototype.execute = function(data){
		Storage.getInstance().load($.proxy(this.onLoaded, this));
	};
	
	LoadCommand.prototype.onLoaded = function(){
		AlertManager.makeGrowl({"label":"Loaded your file"}, null);
	};
	
  	return LoadCommand;
});
