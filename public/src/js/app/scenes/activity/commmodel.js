
define(['app/game', 'app/scenes/activity/commspeed', 'app/scenes/activity/commandtypes'],

function(Game, CommSpeed, CommandTypes){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		this.playing = false;
		this.input = null;
		this.type = CommandTypes.NSEW;
		this.commandNum = 0;
		this.speed = CommSpeed.MED;
		this.addSignal = new Phaser.Signal();
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		this.typeSignal = new Phaser.Signal();
	};
	
	CommModel.SUBDIV = 20;
	CommModel.SPEED_FACTOR = 10;
	
	CommModel.prototype.performCommand = function() {
		this.sub = 0;
		this.triggerEvent();
	};
	
	CommModel.prototype.load = function() {
		this.typeSignal.dispatch({"type":this.type});
	};
	
	CommModel.prototype.setType = function(i) {
		this.type = i;
		this.typeSignal.dispatch({"type":this.type});
	};
	
	CommModel.prototype.restart = function(command) {
		console.log("restart");
		this.playing = true;
		this.performCommand();
	};
	
	CommModel.prototype.playAllFromToIncluding = function(i0, i1) {
		var i, command;
		for(i = i0; i <= i1; i++){
			command = this.commands[i];
			this.executeSignal.dispatch({"command":command, "fraction":0});
			this.executeSignal.dispatch({"command":command, "fraction":1});
		}
	};
	
	CommModel.prototype.playAll = function() {
		if(this.commands.length >= 1){
			this.playAllFromToIncluding(0, this.commands.length - 1);
		}
	};
	
	CommModel.prototype.empty = function() {
		this.commands = [];
	};
	
	CommModel.prototype.undo = function() {
		if(!this.playing && this.commands.length >= 1){
			this.commands.pop();
			this.commandNum --;
			this.resetSignal.dispatch();
			this.playAll();
		}
	};
	
	CommModel.prototype.stop = function() {
		if(this.playing){
			this.playing = false;
			this.commands = [];
			this.commandNum = 0;
			this.resetSignal.dispatch();
		}
	};
	
	CommModel.prototype.triggerEvent = function() {
		var command, fraction;
		if(this.playing){
			console.log("this.commandNum "+this.commandNum+"  len = "+this.commands.length);
			command = this.commands[this.commandNum];
			fraction = this.sub / CommModel.SUBDIV;
			this.executeSignal.dispatch({"command":command, "fraction":fraction});
			this.timeout = setTimeout($.proxy(this.nextInterval, this), this.speed*CommModel.SPEED_FACTOR);
		}
	};
	
	CommModel.prototype.nextInterval = function() {
		this.sub++;
		if(this.sub === CommModel.SUBDIV + 1){
			this.commandNum++;
			console.log("next command now this.commandNum = "+this.commandNum);
			if(this.commandNum === this.commands.length){
				this.finished();		
			}
			else{
				this.performCommand();
			}
		}
		else{
			this.triggerEvent();
		}
	};
	
	CommModel.prototype.finished = function() {
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
	
