define(

	['phasercomponents', 'app/consts/challengedata',

	'app/assets', 'app/views/popups/growl'],

function(PhaserComponents, ChallengeData,

	Assets, Growl) {
	
	"use strict";
	
	var ChallengeDoneCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChallengeDoneCommand, PhaserComponents.Commands.AbstractCommand);

	ChallengeDoneCommand.prototype.execute = function(){
		this.alertManager.make(Growl, {"title":"Challenge", "label":ChallengeData.WELL_DONE_MESSAGE, "sfx":Assets.SOUNDS[2]}, null);
	};
	
  	return ChallengeDoneCommand;
});

