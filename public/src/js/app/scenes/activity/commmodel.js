
define(['app/game', 'app/scenes/activity/commspeed', 'app/scenes/activity/commandtypes'],

function(Game, CommSpeed, CommandTypes){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		this.playing = false;
		this.input = null;
		this.type = CommandTypes.NSEW;
		this.commandNum = 0;
		this.color = 0;
		this.speed = CommSpeed.MED;
		this.addSignal = new Phaser.Signal();
		this.executeSignal = new Phaser.Signal();
		this.colorSignal = new Phaser.Signal();
		this.typeSignal = new Phaser.Signal();
	};
	
	CommModel.SUBDIV = 20;
	CommModel.SPEED_FACTOR = 10;
	
	CommModel.prototype.performCommand = function() {
		this.sub = 0;
		this.triggerEvent();
	};
	
	CommModel.prototype.load = function() {
		console.log("load type 0");
		this.typeSignal.dispatch({"type":this.type});
	};
	
	CommModel.prototype.setType = function(i) {
		this.type = i;
		console.log("setType "+i);
		this.typeSignal.dispatch({"type":this.type});
	};
	
	CommModel.prototype.setColor = function(i) {
		this.color = i;
		this.colorSignal.dispatch({"color":this.color});
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
		this.timeout = setTimeout($.proxy(this.nextInterval, this), this.speed*CommModel.SPEED_FACTOR);
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
	
