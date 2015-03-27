
define(['phasercomponents',

'base/consts/playingstate'],

function(PhaserComponents,

PlayingState){
	
	"use strict";
	
	var PlayingModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = PlayingState.NOT_PLAYING;
	};
	
	PhaserComponents.Utils.extends(PlayingModel, PhaserComponents.Model.AbstractModel);

	return PlayingModel;

});
