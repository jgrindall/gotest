
define(['base/views/buttons/controlmenubutton',

'phasercomponents', 

'base/consts/playingstate', 'base/events/events', 'base/models/modelconsts'],

function(ControlMenuButton,

PhaserComponents,

PlayingState, Events, ModelConsts){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':5}, {'num':6}, {'num':7}, {'num':8}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.add(this.playingChanged, this);
		this.clickSignal.add(this.menuClick, this);
		this.disableButtonAt(1);
	};
	
	ControlMenu.WIDTH = 170;
	ControlMenu.HEIGHT = 50;

	PhaserComponents.Utils.extends(ControlMenu, PhaserComponents.Display.ButtonBar);

	ControlMenu.prototype.menuClick = function(data) {
		var index = data.index;
		if(index === 0){
			this.eventDispatcher.trigger({"type":Events.REWIND});
		}
		else if(index === 1){
			this.eventDispatcher.trigger({"type":Events.UNDO});
		}
		else if(index === 2){
			this.eventDispatcher.trigger({"type":Events.GRID_CHOICE});
		}
		else if(index === 3){
			this.eventDispatcher.trigger({"type":Events.HELP});
		}
		
	};

	ControlMenu.prototype.playingChanged = function(value){
		if(value === PlayingState.NOT_PLAYING){
			this.enableButtonAt(0);
			this.enableButtonAt(1);
			this.enableButtonAt(2);
			this.enableButtonAt(3);
			
		}
		else{
			this.enableButtonAt(0);
			this.disableButtonAt(1);
			this.disableButtonAt(2);
			this.disableButtonAt(3);
		
		}
	};

	ControlMenu.prototype.destroy = function(){
		this.clickSignal.remove(this.menuClick, this);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.remove(this.playingChanged, this);
		PhaserComponents.Display.ButtonBar.prototype.destroy.call(this);
	};

	return ControlMenu;

});
	
