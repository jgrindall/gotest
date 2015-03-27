
define(['base/views/buttons/menubutton', 'base/events/events',

'phasercomponents', 

'base/consts/playingstate', 'base/models/modelconsts'],

function(MenuButton, Events,

PhaserComponents, 

PlayingState, ModelConsts){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':0}, {'num':1}, {'num':2}, {'num':3}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.add(this.playingChanged, this);
		this.clickSignal.add(this.menuClick, this);
	};
	
	Menu.WIDTH = 200;
	Menu.HEIGHT = 50;

	PhaserComponents.Utils.extends(Menu, PhaserComponents.Display.ButtonBar);

	Menu.prototype.onAlert = function(event, data) {
		if(data.shown){
			this.disableInput();
		}
		else{
			this.enableInput();
		}
	};

	Menu.prototype.menuClick = function(data) {
		var i = data.index;
		if(i === 0){
			this.eventDispatcher.trigger({"type":Events.NEW_FILE});
		}
		else if(i === 1){
			this.eventDispatcher.trigger({"type":Events.LOAD});
		}
		else if(i === 2){
			this.eventDispatcher.trigger({"type":Events.SAVE});
		}
		else if(i === 3){
			this.eventDispatcher.trigger({"type":Events.DOWNLOAD});
		}
	};

	Menu.prototype.playingChanged = function(value){
		if(value === PlayingState.PLAYING){
			this.disableInput();
		}
		else if(value === PlayingState.NOT_PLAYING){
			this.enableInput();
		}
	};

	Menu.prototype.destroy = function(){
		this.clickSignal.remove(this.menuClick, this);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.remove(this.playingChanged, this);
		PhaserComponents.Display.ButtonBar.prototype.destroy.call(this);
	};

	return Menu;

});
	
