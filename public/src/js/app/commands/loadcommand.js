define('app/commands/loadcommand',['app/models/modelfacade', 'app/components/popups/growl',

	'phasercomponents', 'app/events/events'],

function(ModelFacade, Growl,

	PhaserComponents, Events) {
	
	"use strict";
	
	var LoadCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	LoadCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	LoadCommand.prototype.constructor = LoadCommand;

	LoadCommand.prototype.execute = function(data){
		PhaserComponents.Storage.getInstance().load(this.onLoaded.bind(this));
	};
	
	LoadCommand.prototype.onLoaded = function(data){
		if(data.success){
			try{
				ModelFacade.getInstance().setData(data.json);
				this.eventDispatcher.trigger({"type":Events.REPLAY});
				PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Loaded your file"}, null);
			}
			catch(e){
				PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Format error"}, null);
			}
		}
		else{
			PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Error - unable to load"}, null);
		}
	};
	
  	return LoadCommand;
});
