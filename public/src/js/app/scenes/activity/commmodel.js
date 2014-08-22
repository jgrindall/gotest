
define(['app/game', 'app/scenes/activity/commspeed',

'app/scenes/activity/commandtypes', 'app/scenes/activity/speedmodel',

'app/scenes/activity/colormodel'],

function(Game, CommSpeed,

CommandTypes, speedModel,

colorModel){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		this.playing = false;
		this.commandNum = 0;
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		this.undoSignal = new Phaser.Signal();
		this.statusSignal = new Phaser.Signal();
		colorModel.changeSignal.add(this.changeColor, this);
	};
	
	CommModel.SPEED_FACTOR = 10;	// scale factor for speed
	CommModel.STEPS = 8;
	CommModel.PAUSE = 30;
	
	CommModel.prototype.performCommand = function() {
		var that = this;
		setTimeout(function(){
			that.step = 0;
			that.triggerEvent();
		}, CommModel.PAUSE*speedModel.speed);
	};
	
	CommModel.prototype.changeColor = function(data) {
		console.log("changecolor "+data.color);
		if(this.playing){
			var nextCommand = this.getNextCommand();
			if(nextCommand){
				nextCommand.color = data.color;
			}
		}
	};
	
	CommModel.prototype.restart = function(command) {
		if(!this.playing){
			this.playing = true;
			this.statusSignal.dispatch({"playing":this.playing});
			this.performCommand();
		}
	};
	
	CommModel.prototype.playAllFromToIncluding = function(i0, i1) {
		var i, command;
		for(i = i0; i <= i1; i++){
			command = this.commands[i];
			this.executeSignal.dispatch({"command":command});
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
	
	CommModel.prototype.removeCommands = function() {
		var topCommand, numToRemove, i;
		topCommand = this.commands[this.commands.length - 1];
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			this.commands.pop();
			this.commandNum --;
		}
	};
	
	CommModel.prototype.undo = function() {
		if(!this.playing && this.commands.length >= 1){
			this.removeCommands();
			this.resetSignal.dispatch();
			this.playAll();
		}
	};
	
	CommModel.prototype.stop = function() {
		if(this.playing){
			this.playing = false;
			this.statusSignal.dispatch({"playing":this.playing});
			this.commands = [];
			this.commandNum = 0;
			this.resetSignal.dispatch();
		}
	};
	
	CommModel.prototype.getNextCommand = function() {
		return this.commands[this.commandNum + 1];
	};
	
	CommModel.prototype.getCurrentCommand = function() {
		return this.commands[this.commandNum];
	};
	
	CommModel.prototype.scheduleNext = function() {
		var interval;
		interval = speedModel.speed * CommModel.SPEED_FACTOR;
		this.timeout = setTimeout($.proxy(this.nextInterval, this), interval);
	};
	
	CommModel.prototype.triggerEvent = function() {
		var command, fraction;
		if(this.playing){
			command = this.getCurrentCommand();
			this.executeSignal.dispatch({"command":command, "fraction":this.step/CommModel.STEPS, "totalTime":CommModel.STEPS * speedModel.speed * CommModel.SPEED_FACTOR});
			this.scheduleNext();
		}
	};
	
	CommModel.prototype.nextInterval = function() {
		this.step++
		if(this.step === CommModel.STEPS + 1){
			this.commandNum++;
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
		this.statusSignal.dispatch({"playing":this.playing});
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
	
	CommModel.prototype.destroy = function(){
		AbstractModel.prototype.destroy.call(this);
		this.commands = [];
		this.executeSignal.dispose();
		this.resetSignal.dispose();
		this.executeSignal = null;
		this.resetSignal = null;
		if(this.timeout){
			clearTimeout(this.timeout);
		}
	};
	
	return new CommModel();

});
	
