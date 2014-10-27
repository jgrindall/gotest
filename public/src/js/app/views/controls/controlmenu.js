
define(['app/views/buttons/controlmenubutton',

'phasercomponents', 

'app/consts/playingstate', 'app/events/events', 'app/models/modelconsts'],

function(ControlMenuButton,

PhaserComponents,

PlayingState, Events, ModelConsts){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 5;
		options.numY = 1;
		options.data = [{'num':4}, {'num':5}, {'num':6}, {'num':7}, {'num':8}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.add(this.playingChanged, this);
		this.clickSignal.add(this.menuClick, this);
		this.disableButtonAt(1);
	};
	
	ControlMenu.WIDTH = 252;
	ControlMenu.HEIGHT = 50;

	PhaserComponents.Utils.extends(ControlMenu, PhaserComponents.Display.ButtonBar);

	ControlMenu.prototype.menuClick = function(data) {
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
		else if(index === 3){
			this.eventDispatcher.trigger({"type":Events.GRID_CHOICE});
		}
		else if(index === 4){
			this.eventDispatcher.trigger({"type":Events.BACK});
		} 
	};

	ControlMenu.prototype.playingChanged = function(value){
		if(value === PlayingState.NOT_PLAYING){
			this.disableButtonAt(0);
			this.enableButtonAt(1);
			this.enableButtonAt(2);
			this.enableButtonAt(3);
			this.enableButtonAt(4);
		}
		else{
			this.enableButtonAt(0);
			this.enableButtonAt(1);
			this.disableButtonAt(2);
			this.disableButtonAt(3);
			this.disableButtonAt(4);
		}
	};

	ControlMenu.prototype.destroy = function(){
		this.clickSignal.remove(this.menuClick, this);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.remove(this.playingChanged, this);
		PhaserComponents.Display.ButtonBar.prototype.destroy.call(this);
	};

	return ControlMenu;

});
	
