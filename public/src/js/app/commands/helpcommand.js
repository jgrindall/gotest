define(['phasercomponents', 'app/views/popups/growl',

	'app/models/modelconsts', 'app/consts/challengedata', 'app/assets'],

function(PhaserComponents, Growl,

	ModelConsts, ChallengeData, Assets) {
	
	"use strict";
	
	var HelpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(HelpCommand, PhaserComponents.Commands.AbstractCommand);

	HelpCommand.prototype.execute = function(){
		var index = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		if(index !== null){
			this.alertManager.make(Growl, {"title":"Challenge", "label":ChallengeData.MESSAGES[index], "sfx":Assets.SOUNDS[2]}, null);
		}
	};
	
  	return HelpCommand;
});
