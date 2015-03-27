define(

	['phasercomponents', 'base/consts/challengedata',

	'base/assets', 'base/views/popups/challengedone', 'base/models/modelconsts',

	'base/events/events'],

function(PhaserComponents, ChallengeData,

	Assets, ChallengeDone, ModelConsts,

	Events) {
	
	"use strict";
	
	var ChallengeDoneCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChallengeDoneCommand, PhaserComponents.Commands.AbstractCommand);

	ChallengeDoneCommand.prototype.onClick = function(data){
		if(data.index === 2){
			this.alertManager.close();
			this.tryAnother();
		}
		else{
			this.alertManager.close();
		}
	};

	ChallengeDoneCommand.prototype.tryAnother = function(){
		var index, newIndex;
		index = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		newIndex = index + 1;
		this.eventDispatcher.trigger({"type":Events.CHOOSE_CHALLENGE, "data":{"selection":newIndex}});
	};

	ChallengeDoneCommand.prototype.execute = function(){
		var index, num, showNext;
		index = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		num = ChallengeData.TARGETS.length;
		showNext = (index < num - 1);
		this.alertManager.make(ChallengeDone, {"title":"Challenge", "label":ChallengeData.WELL_DONE_MESSAGE, "sfx":Assets.SOUNDS[2], "showNext":showNext}, this.onClick.bind(this));
	};
	
  	return ChallengeDoneCommand;
});

