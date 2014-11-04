
define(['app/views/buttons/controlmenubutton',

'phasercomponents', 

'app/consts/playingstate', 'app/events/events', 'app/models/modelconsts'],

function(ControlMenuButton,

PhaserComponents,

PlayingState, Events, ModelConsts){
	
	"use strict";
	
	var SmallControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 3;
		options.numY = 1;
		options.data = [{'num':4}, {'num':5}, {'num':6}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.add(this.playingChanged, this);
		this.clickSignal.add(this.menuClick, this);
		this.disableButtonAt(1);
	};
	
	SmallControlMenu.WIDTH = 140;
	SmallControlMenu.HEIGHT = 50;

	PhaserComponents.Utils.extends(SmallControlMenu, PhaserComponents.Display.ButtonBar);

	SmallControlMenu.prototype.menuClick = function(data) {
		var index = data.index;
		if(index === 0){
			this.eventDispatcher.trigger({"type":Events.STOP});
		}
		if(index === 1){
			this.eventDispatcher.trigger({"type":Events.REWIND});
		}
		else if(index === 2){
			this.eventDispatcher.trigger({"type":Events.UNDO});
		}
	};

	SmallControlMenu.prototype.playingChanged = function(value){
		if(value === PlayingState.NOT_PLAYING){
			this.disableButtonAt(0);
			this.enableButtonAt(1);
			this.enableButtonAt(2);
		}
		else{
			this.enableButtonAt(0);
			this.enableButtonAt(1);
			this.disableButtonAt(2);
		}
	};

	SmallControlMenu.prototype.destroy = function(){
		this.clickSignal.remove(this.menuClick, this);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.remove(this.playingChanged, this);
		PhaserComponents.Display.ButtonBar.prototype.destroy.call(this);
	};

	return SmallControlMenu;

});
	
