define([

	'base/events/events', 'phasercomponents', 'base/consts/playingstate',

	'base/models/modelconsts', 'base/logocommands/logocommandfactory'], function(

	Events, PhaserComponents, PlayingState,

	ModelConsts, LogoCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(AddCommandCommand, PhaserComponents.Commands.AbstractCommand);

	AddCommandCommand.prototype.execute = function(data){
		var command, playingModel;
		if(data.type === "turn" && data.direction === 5){
			data.direction = 3;
		}
		else if(data.type === "move" && data.direction === 7){
			data.direction = 1;
		}
		data.color = 				this.modelFacade.get(ModelConsts.COLOR).get();
		data.width = 				this.modelFacade.get(ModelConsts.WIDTH).get();
		data.diag = 				this.modelFacade.get(ModelConsts.DIAG).get();
		data.angle = 				this.modelFacade.get(ModelConsts.ANGLE).get();
		data.stepLength = 			this.modelFacade.get(ModelConsts.STEPLENGTH).get();
		command = LogoCommandFactory.fromJson(data);
		this.modelFacade.get(ModelConsts.COMM).add(command);
		this.eventDispatcher.trigger({"type":Events.DRAW});
		playingModel = this.modelFacade.get(ModelConsts.PLAYING);
		if(playingModel.get() !== PlayingState.PLAYING){
			this.eventDispatcher.trigger({"type":Events.DRAW});
		}
	};
	
  	return AddCommandCommand;
});

