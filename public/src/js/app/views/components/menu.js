
define('app/views/components/menu',[ 'app/components/buttons/menubutton',

'phasercomponents', 'app/models/modelfacade', 'app/consts/playingstate'],

function(MenuButton,

PhaserComponents, ModelFacade, PlayingState){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':0}, {'num':1}, {'num':2}, {'num':3}];
		PhaserComponents.ButtonBar.call(this, options);
		this.eventDispatcher.addListener("alert", this.onAlert.bind(this));
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
	};
	
	Menu.prototype = Object.create(PhaserComponents.ButtonBar.prototype);
	Menu.prototype.constructor = Menu;
	
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
	
