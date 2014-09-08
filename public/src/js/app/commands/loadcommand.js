define('app/commands/loadcommand',['app/models/modelfacade', 'app/views/popups/growl',

	'phasercomponents', 'app/events/events'],

function(ModelFacade, Growl,

	PhaserComponents, Events) {
	
	"use strict";
	
	var LoadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(LoadCommand, PhaserComponents.Commands.AbstractCommand);

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
