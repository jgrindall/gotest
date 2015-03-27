define(

	['phasercomponents', 'base/consts/defaults', 'base/events/events'],

function(PhaserComponents, Defaults, Events) {
	
	"use strict";
	
	var ChooseChallengeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChooseChallengeCommand, PhaserComponents.Commands.AbstractCommand);

	ChooseChallengeCommand.prototype.execute = function(data){
		var json, that = this;
		json = Defaults.getChallenge(data.selection);
		this.eventDispatcher.trigger({"type":Events.REWIND});
		this.modelFacade.setData(json);
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.eventDispatcher.trigger({"type":Events.HELP});
		}, 100);
	};
	
  	return ChooseChallengeCommand;
});


	