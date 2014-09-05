
define('app/models/playingmodel',['phasercomponents',

'app/consts/playingstate'],

function(PhaserComponents,

PlayingState){
	
	"use strict";
	
	var PlayingModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.playing = PlayingState.NOT_PLAYING;
	};
	
	PlayingModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	PlayingModel.prototype.constructor = PlayingModel;
	
	PlayingModel.prototype.setData = function(p) {
		this.setPlaying(p);
	};
	
	PlayingModel.prototype.getData = function() {
		return {"playing":this.playing};
	};
	
	PlayingModel.prototype.setPlaying = function(p) {
		if(this.playing !== p){
			this.playing = p;
			this.trigger();
		}
	};
	
	return PlayingModel;

});
