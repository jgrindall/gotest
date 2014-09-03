define('app/commands/loadcommand',['app/utils/alertmanager',

	'app/utils/storage', 'app/models/modelfacade',

	'phasercomponents', 'app/events/events'],

function(AlertManager,

	Storage, ModelFacade,

	PhaserComponents, Events) {
	
	"use strict";
	
	var LoadCommand = function(){
		
	};
	
	LoadCommand.prototype.execute = function(data){
		Storage.getInstance().load(this.onLoaded.bind(this));
	};
	
	LoadCommand.prototype.onLoaded = function(data){
		if(data.success){
			try{
				ModelFacade.getInstance().setData(data.json);
				PhaserComponents.eventDispatcher.trigger({"type":Events.REPLAY});
				AlertManager.makeGrowl({"label":"Loaded your file"}, null);
			}
			catch(e){
				AlertManager.makeGrowl({"label":"Format error"}, null);
			}
		}
		else{
			AlertManager.makeGrowl({"label":"Error - unable to load"}, null);
		}
	};
	
  	return LoadCommand;
});
