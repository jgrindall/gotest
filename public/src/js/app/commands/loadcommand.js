define('app/commands/loadcommand',['jquery', 'app/utils/alertmanager',

	'app/utils/storage', 'app/models/modelfacade',

	'app/events/eventdispatcher', 'app/events/events'],

function($, AlertManager,

	Storage, ModelFacade,

	eventDispatcher, Events) {
	
	"use strict";
	
	var LoadCommand = function(){
		
	};
	
	LoadCommand.prototype.execute = function(data){
		Storage.getInstance().load($.proxy(this.onLoaded, this));
	};
	
	LoadCommand.prototype.onLoaded = function(data){
		if(data.success){
			ModelFacade.getInstance().setData(data.json);
			eventDispatcher.trigger({"type":Events.REPLAY});
			AlertManager.makeGrowl({"label":"Loaded your file"}, null);
		}
		else{
			AlertManager.makeGrowl({"label":"Error loading"}, null);
		}
	};
	
  	return LoadCommand;
});
