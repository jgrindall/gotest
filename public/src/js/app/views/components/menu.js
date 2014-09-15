
define(['app/views/buttons/menubutton',

'phasercomponents', 'app/models/modelfacade', 'app/consts/playingstate'],

function(MenuButton,

PhaserComponents, ModelFacade, PlayingState){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':0}, {'num':1}, {'num':2}, {'num':3}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
	};
	
	Menu.WIDTH = 240;
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

	Menu.prototype.playingChanged = function(data){
		if(data.playing === PlayingState.PLAYING){
			this.disableInput();
		}
		else if(data.playing === PlayingState.NOT_PLAYING){
			this.enableInput();
		}
	};

	return Menu;

});
	
