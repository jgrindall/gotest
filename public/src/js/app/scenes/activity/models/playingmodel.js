
define(['app/scenes/activity/models/abstractmodel',

'app/consts/playingstate'],

function(AbstractModel,

PlayingState){
	
	"use strict";
	
	var PlayingModel  = function(){
		AbstractModel.call(this);
		this.playing = PlayingState.NOT_PLAYING;
	};
	
	PlayingModel.prototype = Object.create(AbstractModel.prototype);
	PlayingModel.prototype.constructor = PlayingModel;
	
	PlayingModel.prototype.setData = function(p) {
		this.setPlaying(p);
	};
	
	PlayingModel.prototype.getData = function() {
		return {"playing":this.playing};
	};
	
	PlayingModel.prototype.setPlaying = function(p) {
		console.log("setPlaying "+p);
		if(this.playing !== p){
			this.playing = p;
			this.trigger();
		}
	};
	
	return new PlayingModel();

});
