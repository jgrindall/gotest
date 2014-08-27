
define(['app/scenes/activity/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var PlayingModel  = function(){
		AbstractModel.call(this);
		this.playing = false;
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
		if(this.playing !== p){
			this.playing = p;
			this.trigger();
		}
	};
	
	return new PlayingModel();

});
