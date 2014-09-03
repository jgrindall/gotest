
define('app/views/controls/controlmenu',['app/game', 'app/components/buttons/controlmenubutton',

'phasercomponents', 'app/models/modelfacade',

'app/consts/playingstate'],

function(Game, ControlMenuButton,

PhaserComponents, ModelFacade,

PlayingState){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 5;
		options.numY = 1;
		options.data = [{'num':4}, {'num':5}, {'num':6}, {'num':7}, {'num':8}];
		PhaserComponents.ButtonBar.call(this, Game.getInstance(), options);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
		this.disableButtonAt(1);
	};
	
	ControlMenu.prototype = Object.create(PhaserComponents.ButtonBar.prototype);
	ControlMenu.prototype.constructor = ControlMenu;
	
	ControlMenu.prototype.playingChanged = function(data){
		if(data.playing === PlayingState.PLAYING){
			this.enableButtonAt(0);
			this.disableButtonAt(1);
			this.disableButtonAt(2);
			this.disableButtonAt(3);
			this.disableButtonAt(4);
		}
		else if(data.playing === PlayingState.NOT_PLAYING){
			this.disableButtonAt(0);
			this.enableButtonAt(1);
			this.enableButtonAt(2);
			this.enableButtonAt(3);
			this.enableButtonAt(4);
		}
	};
	
	return ControlMenu;

});
	
