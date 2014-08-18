
define(['app/game', 'app/scenes/game/gameview', 'app/commsdata', 'app/scenes/game/gamemode', 'app/locdata'],

function(Game, GameView, CommsData, GameMode, LocData){
	
	"use strict";
	
	var CommGameView  = function(options){
		GameView.call(this, options);
		this.stackCompleteSignal = new Phaser.Signal();
	};
	
	CommGameView.prototype = Object.create(GameView.prototype);
	CommGameView.prototype.constructor = CommGameView;
	
	CommGameView.CHECK_STILL = 500;
	
	CommGameView.prototype.nextCommand = function() {
		var s;
		this.commandNum++;
		if(this.commandNum === this.commandStack.length){
			this.stackCompleteSignal.dispatch({});
		}
		else{
			s = this.commandStack[this.commandNum];
			this.player.setForce(s);
		}
	};
	
	CommGameView.prototype.create = function() {
		GameView.prototype.create.call(this);
		this.commandStack = CommsData.getInstance().getCommands();
		this.commandNum = -1;
	};
	
	CommGameView.prototype.checkCommands = function() {
		if(LocData.getInstance().getMode() === GameMode.COMMANDS){
			this.checkStill();
		}
	};
	
	CommGameView.prototype.update = function() {
	    GameView.prototype.update.call(this);
		this.checkCommands();
	};
	
	CommGameView.prototype.playBack = function(){
		this.checkStill();
	};
	
	CommGameView.prototype.checkStill = function(){
		var that = this;
		if(this.player && !this.player.dead && this.player.isStill()){
			if(!this.still){
				this.still = true;
				if(this.checkEndTimeout){
					clearTimeout(this.checkEndTimeout);
				}
				this.checkEndTimeout = setTimeout(function(){
					that.nextCommand();
				}, GameView.CHECK_STILL);
			}
		}
		else{
			this.still = false;
		}
	};


	CommGameView.prototype.destroy = function() {
		GameView.prototype.destroy.call(this);
		this.commandStack = null;
	};
	
	return CommGameView;

});
	
