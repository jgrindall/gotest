define(

	['phasercomponents', 'app/consts/defaults', 'app/events/events',

	'app/views/popups/growl', 'app/assets'],

function(PhaserComponents, Defaults, Events, 

Growl, Assets) {
	
	"use strict";
	
	var ChooseChallengeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChooseChallengeCommand, PhaserComponents.Commands.AbstractCommand);

	ChooseChallengeCommand.prototype.execute = function(data){
		var json, that = this;
		json = Defaults.getChallenge(data.selection);
		console.log("json is ", JSON.stringify(json));
		this.modelFacade.setData(json);
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.alertManager.make(Growl, {"title":"Challenge", "label":Defaults.MESSAGES[data.selection], "sfx":Assets.SOUNDS[2]}, null);
		}, 300);
	};
	
  	return ChooseChallengeCommand;
});


	