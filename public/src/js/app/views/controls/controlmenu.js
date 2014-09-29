
define(['app/views/buttons/controlmenubutton',

'phasercomponents', 'app/models/modelfacade',

'app/consts/playingstate'],

function(ControlMenuButton,

PhaserComponents, ModelFacade,

PlayingState){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':4}, {'num':5}, {'num':6}, {'num':7}];
		PhaserComponents.Display.ButtonBar.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
		this.disableButtonAt(1);
	};
	
	ControlMenu.WIDTH = 240;
	ControlMenu.HEIGHT = 50;

	PhaserComponents.Utils.extends(ControlMenu, PhaserComponents.Display.ButtonBar);

	ControlMenu.prototype.playingChanged = function(value){
		if(value === PlayingState.PLAYING){
			this.enableButtonAt(0);
			this.disableButtonAt(1);
			this.disableButtonAt(2);
			this.disableButtonAt(3);
		}
		else if(value=== PlayingState.NOT_PLAYING){
			this.enableButtonAt(0);
			this.enableButtonAt(1);
			this.enableButtonAt(2);
			this.enableButtonAt(3);
		}
	};

	ControlMenu.prototype.destroy = function(){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.remove(this.playingChanged, this);
		PhaserComponents.Display.ButtonBar.prototype.destroy.call(this);
	};

	return ControlMenu;

});
	
