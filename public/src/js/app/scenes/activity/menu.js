
define(['app/game', 'app/components/container', 'app/components/buttons/menubutton',

'app/components/buttonbar', 'app/scenes/activity/commmodel'],

function(Game, Container, MenuButton,

ButtonBar, commModel){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 6;
		options.numY = 1;
		options.data = [0, 1, 2, 3, 4, 5];
		ButtonBar.call(this, options);
		commModel.statusSignal.add(this.playingChanged, this);
		this.disableButtonAt(1);
	};
	
	Menu.prototype = Object.create(ButtonBar.prototype);
	Menu.prototype.constructor = Menu;
	
	Menu.prototype.playingChanged = function(data){
		if(data.playing){
			this.enableButtonAt(1);
			this.disableButtonAt(2);
		}
		else{
			this.disableButtonAt(1);
			this.enableButtonAt(2);
		}
	};
	
	return Menu;

});
	
