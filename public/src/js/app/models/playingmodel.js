
define('app/models/playingmodel',['phasercomponents',

'app/consts/playingstate'],

function(PhaserComponents,

PlayingState){
	
	"use strict";
	
	var PlayingModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = PlayingState.NOT_PLAYING;
	};
	
	PlayingModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	PlayingModel.prototype.constructor = PlayingModel;
	
	return PlayingModel;

});
