define(

	['phasercomponents', 'app/consts/defaults', 'app/events/events',

	'app/models/modelconsts'],

function(PhaserComponents, Defaults, Events, 

ModelConsts) {
	
	"use strict";
	
	var ChooseChallengeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChooseChallengeCommand, PhaserComponents.Commands.AbstractCommand);

	ChooseChallengeCommand.prototype.execute = function(data){
		var json, that = this;
		console.log("ccc ", data.selection);
		json = Defaults.getChallenge(data.selection);
		this.eventDispatcher.trigger({"type":Events.REWIND});
		this.modelFacade.setData(json);
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.eventDispatcher.trigger({"type":Events.HELP});
		}, 50);
	};
	
  	return ChooseChallengeCommand;
});


	