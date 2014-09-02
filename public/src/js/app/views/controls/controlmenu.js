
define('app/views/controls/controlmenu',['app/components/buttons/controlmenubutton',

'app/components/buttongrid/buttonbar', 'app/models/modelfacade',

'app/consts/playingstate'],

function(ControlMenuButton,

ButtonBar, ModelFacade,

PlayingState){
	
	"use strict";
	
	var ControlMenu  = function(options){
		options.buttonClass = ControlMenuButton;
		options.numX = 5;
		options.numY = 1;
		options.data = [{'num':4}, {'num':5}, {'num':6}, {'num':7}, {'num':8}];
		ButtonBar.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
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
	
