define(

	['phasercomponents', 'base/events/events', 'base/assets', 'base/models/modelconsts',

	'base/views/popups/turtlemenu'],

function(PhaserComponents, Events, Assets, ModelConsts,

	TurtleMenu) {
	
	"use strict";

	var EditTurtleCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(EditTurtleCommand, PhaserComponents.Commands.AbstractCommand);

	EditTurtleCommand.prototype.onButtonChosen = function(data){
		var turtleIndex;
		if(data.index === 6 || data.index === 7){
			data.index = 2;
		}
		if(data.index === 0){
			turtleIndex = data.selection.index;
			this.modelFacade.get(ModelConsts.TURTLE).set(turtleIndex);
		}
		else if(data.index === 1){
			this.eventDispatcher.trigger({"type":Events.OPEN_TURTLE_EDITOR});	
		}
		this.alertManager.close();
	};
		
	EditTurtleCommand.prototype.execute = function(){
		var options = {"sfx":Assets.SOUNDS[2], "model": new PhaserComponents.Model.ButtonGridModel()};
		this.alertManager.make(TurtleMenu, options, this.onButtonChosen.bind(this)); 
	};
	
  	return EditTurtleCommand;
});
