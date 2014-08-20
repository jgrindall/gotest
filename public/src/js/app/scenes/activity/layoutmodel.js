
define(['app/game', 'app/scenes/activity/commspeed', 'app/scenes/activity/commandtypes'],

function(Game, CommSpeed, CommandTypes){
	
	"use strict";
	
	var LayoutModel  = function(){
		this.bg = 0;
		this.bgSignal = new Phaser.Signal();
	};
	
	LayoutModel.prototype.setBg = function(i) {
		if(this.bg !== i){
			this.bg = i;
			this.bgSignal.dispatch({"bg":this.bg});
		}
	};
	
	return new LayoutModel();

});
	
