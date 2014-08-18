
define(['app/game'],

function(Game){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		this.playing = false;
		this.speed = 3;
		this.addSignal = new Phaser.Signal();
		this.executeSignal = new Phaser.Signal();
	};
	
	CommModel.SUBDIV = 5;
	
	CommModel.prototype.nextCommand = function() {
		console.log("next command!");
		this.commandNum++;
		if(this.commandNum === this.commands.length){
			this.stop();		
		}
		else{
			this.sub = 0;
			this.triggerEvent();
		}
	};
	
	CommModel.prototype.start = function(command) {
		console.log("start");
		this.playing = true;
		this.commandNum = -1;
		this.nextCommand();
		this.interval = setInterval($.proxy(this.checkInterval, this), this.speed*400);
	};
	
	CommModel.prototype.triggerEvent = function() {
		var command, fraction;
		command = this.commands[this.commandNum];
		fraction = this.sub / CommModel.SUBDIV;
		this.executeSignal.dispatch({"command":command, "fraction":fraction});
	};
	
	CommModel.prototype.checkInterval = function() {
		this.sub++;
		this.triggerEvent();
		if(this.sub === CommModel.SUBDIV){
			this.nextCommand();
		}
	};
	
	CommModel.prototype.stop = function() {
		console.log("stop");
		if(this.interval){
			clearInterval(this.interval);
		}
		this.commandNum = 0;
		this.playing = false;
		this.sub = 0;
	};
	
	CommModel.prototype.add = function(command) {
		console.log("add");
		this.commands.push(command);
		if(!this.playing){
			this.start();
		}
	};
	
	CommModel.prototype.clear = function(command) {
		this.commands = [];
	};
	
	return new CommModel();

});
	
