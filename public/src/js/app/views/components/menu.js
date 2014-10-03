
define(['app/views/buttons/menubutton', 'app/events/events',

'phasercomponents', 'app/models/modelfacade', 'app/consts/playingstate'],

function(MenuButton, Events,

PhaserComponents, ModelFacade, PlayingState){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 5;
		options.numY = 1;
		options.data = [{'num':0}, {'num':1}, {'num':2}, {'num':3}, {'num':4}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
		this.clickSignal.add(this.menuClick, this);
	};
	
	Menu.WIDTH = 280;
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
			this.eventDispatcher.trigger({"type":Events.PRINT});
		}
		else if(i === 4){
			this.eventDispatcher.trigger({"type":Events.DOWNLOAD});
		}
	};

	Menu.prototype.playingChanged = function(data){
		if(data.playing === PlayingState.PLAYING){
			this.disableInput();
		}
		else if(data.playing === PlayingState.NOT_PLAYING){
			this.enableInput();
		}
	};

	Menu.prototype.destroy = function(){
		this.clickSignal.add(this.menuClick, this);
		PhaserComponents.Display.ButtonBar.prototype.destroy.call(this);
	};

	return Menu;

});
	
