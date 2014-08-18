
define(['app/game'],

function(Game){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		this.playing = false;
		this.commandNum = 0;
		this.speed = 3;
		this.addSignal = new Phaser.Signal();
		this.executeSignal = new Phaser.Signal();
	};
	
	CommModel.SUBDIV = 5;
	
	CommModel.prototype.performCommand = function() {
		this.sub = 0;
		this.triggerEvent();
	};
	
	CommModel.prototype.restart = function(command) {
		this.playing = true;
		this.performCommand();
	};
	
	CommModel.prototype.triggerEvent = function() {
		var command, fraction;
		command = this.commands[this.commandNum];
		fraction = this.sub / CommModel.SUBDIV;
		this.executeSignal.dispatch({"command":command, "fraction":fraction});
		this.timeout = setTimeout($.proxy(this.nextInterval, this), this.speed*100);
	};
	
	CommModel.prototype.nextInterval = function() {
		this.sub++;
		if(this.sub === CommModel.SUBDIV + 1){
			this.commandNum++;
			if(this.commandNum === this.commands.length){
				this.stop();		
			}
			else{
				this.performCommand();
			}
		}
		else{
			this.triggerEvent();
		}
	};
	
	CommModel.prototype.stop = function() {
		this.playing = false;
	};
	
	CommModel.prototype.add = function(command) {
		this.commands.push(command);
		if(!this.playing){
			this.restart();
		}
	};
	
	CommModel.prototype.clear = function(command) {
		this.commands = [];
	};
	
	return new CommModel();

});
	
