
define('app/views/components/menu',['app/game', 'app/components/buttons/menubutton',

'phasercomponents', 'app/models/modelfacade', 'app/consts/playingstate'],

function(Game, MenuButton,

PhaserComponents, ModelFacade, PlayingState){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':0}, {'num':1}, {'num':2}, {'num':3}];
		PhaserComponents.ButtonBar.call(this, Game.getInstance(), options);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
	};
	
	Menu.prototype = Object.create(PhaserComponents.ButtonBar.prototype);
	Menu.prototype.constructor = Menu;
	
	Menu.prototype.playingChanged = function(data){
		if(data.playing === PlayingState.PLAYING){
			this.disableAll();
		}
		else if(data.playing === PlayingState.NOT_PLAYING){
			this.enableAll();
		}
	};

	return Menu;

});
	
