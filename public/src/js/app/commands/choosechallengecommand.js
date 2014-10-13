define(

	['phasercomponents', 'app/consts/defaults', 'app/events/events'],

function(PhaserComponents, Defaults, Events) {
	
	"use strict";
	
	var ChooseChallengeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChooseChallengeCommand, PhaserComponents.Commands.AbstractCommand);

	ChooseChallengeCommand.prototype.execute = function(data){
		var json = Defaults.getChallenge(data.selection);
		this.modelFacade.setData(json);
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		console.log(JSON.stringify(json));
	};
	
  	return ChooseChallengeCommand;
});


	