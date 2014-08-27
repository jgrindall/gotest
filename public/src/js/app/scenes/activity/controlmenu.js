
define(['app/game', 'app/components/buttons/menubutton',

'app/components/buttonbar', 'app/scenes/activity/playingmodel'],

function(Game, MenuButton,

ButtonBar, playingModel){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [4, 5, 6, 7];
		ButtonBar.call(this, options);
		playingModel.changeSignal.add(this.playingChanged, this);
		this.disableButtonAt(1);
	};
	
	ControlMenu.prototype = Object.create(ButtonBar.prototype);
	ControlMenu.prototype.constructor = ControlMenu;
	
	ControlMenu.prototype.playingChanged = function(data){
		if(data.playing){
			this.enableButtonAt(0);
			this.disableButtonAt(1);
		}
		else{
			this.disableButtonAt(0);
			this.enableButtonAt(1);
		}
	};
	
	return ControlMenu;

});
	
