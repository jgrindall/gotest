
define(['app/game', 'app/components/buttons/controlmenubutton',

'app/components/buttongrid/buttonbar',

'app/models/playingmodel', 'app/consts/playingstate'],

function(Game, ControlMenuButton,

ButtonBar,

playingModel, PlayingState){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 4;
		options.numY = 1;
		
		options.data = [{'num':4}, {'num':5}, {'num':6}, {'num':7}];
		ButtonBar.call(this, options);
		playingModel.changeSignal.add(this.playingChanged, this);
		this.disableButtonAt(1);
	};
	
	ControlMenu.prototype = Object.create(ButtonBar.prototype);
	ControlMenu.prototype.constructor = ControlMenu;
	
	ControlMenu.prototype.playingChanged = function(data){
		if(data.playing === PlayingState.PLAYING){
			this.enableButtonAt(0);
			this.disableButtonAt(1);
		}
		else if(data.playing === PlayingState.NOT_PLAYING){
			this.disableButtonAt(0);
			this.enableButtonAt(1);
		}
	};
	
	return ControlMenu;

});
	
