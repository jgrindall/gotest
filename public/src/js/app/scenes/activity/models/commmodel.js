
define(['app/game', 'app/scenes/activity/commands/abstractcommandfactory',

'app/scenes/activity/models/speedmodel', 'app/scenes/activity/commands/movecommand', 'app/scenes/activity/commands/turncommand',

'app/scenes/activity/models/playingmodel', 'app/scenes/activity/models/bgmodel', 'app/scenes/activity/commands/abstractcommand',

'app/scenes/activity/models/colormodel'],

function(Game, AbstractCommandFactory,

speedModel, MoveCommand, TurnCommand,

playingModel, bgModel, AbstractCommand, 

colorModel){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		this.commandNum = 0;
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		this.undoSignal = new Phaser.Signal();
		colorModel.changeSignal.add(this.changeColor, this);
		bgModel.changeSignal.add(this.changeBg, this);
	};
	
	CommModel.SPEED_FACTOR = 10;	// scale factor for speed
	CommModel.STEPS = 4;
	CommModel.PAUSE = 30;
	
	CommModel.prototype.performCommand = function() {
		var that = this;
		setTimeout(function(){
			that.step = 0;
			that.triggerEvent();
		}, CommModel.PAUSE*speedModel.getData().actualSpeed);
	};
	
	CommModel.prototype.reset = function(){
		playingModel.setData(false);
		this.commands = [];
		this.commandNum = 0;
		this.resetSignal.dispatch();
	};
	
	CommModel.prototype.changeBg = function(data) {
		this.reset();
	};
	
	CommModel.prototype.changeColor = function(data) {
		var nextCommand = this.getNextCommand();
		if(playingModel.getData().playing && nextCommand){
			nextCommand.color = data.color;
		}
	};
	
	CommModel.prototype.isMove = function() {
		var command = this.getCurrentCommand();
		return (command instanceof MoveCommand);
	};
	
	CommModel.prototype.isTurn = function() {
		var command = this.getCurrentCommand();
		return (command instanceof TurnCommand);
	};
	
	CommModel.prototype.restart = function(command) {
		if(!playingModel.getData().playing){
			playingModel.setData(true);
			this.performCommand();
		}
	};
	
	CommModel.prototype.playAllFromToIncluding = function(i0, i1) {
		var i, command;
		this.commandNum = i0;
		playingModel.setData(true);
		for(i = i0; i <= i1; i++){
			command = this.getCurrentCommand();
			this.executeSignal.dispatch({"command":command, "fraction":0, "totalTime":0});
			this.executeSignal.dispatch({"command":command, "fraction":1, "totalTime":0});
			this.commandNum++;
		}
		playingModel.setData(false);
	};
	
	CommModel.prototype.addFromJson = function(commands) {
		var that = this;
		this.reset();
		$.each(commands, function(i, c){
			that.add(AbstractCommandFactory.fromJson(c), false);
		});	
	};
	
	CommModel.prototype.toJson = function() {
		var jsonArray = [];
		$.each(this.commands, function(i,c){
			jsonArray.push(c.toJson());
		});
		return jsonArray;
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
		if(!playingModel.getData().playing && this.commands.length >= 1){
			this.removeCommands();
			this.resetSignal.dispatch();
			this.playAll();
		}
	};
	
	CommModel.prototype.stop = function() {
		if(playingModel.getData().playing){
			this.reset();
		}
	};
	
	CommModel.prototype.getNextCommand = function() {
		return this.commands[this.commandNum + 1];
	};
	
	CommModel.prototype.getCurrentCommand = function() {
		return this.commands[this.commandNum];
	};
	
	CommModel.prototype.getInterval = function() {
		return speedModel.getData().actualSpeed * CommModel.SPEED_FACTOR;
	};
	
	CommModel.prototype.scheduleNext = function() {
		var interval = this.getInterval();
		this.timeout = setTimeout($.proxy(this.nextInterval, this), interval);
	};
	
	CommModel.prototype.triggerEvent = function() {
		var command, fraction;
		if(playingModel.getData().playing){
			command = this.getCurrentCommand();
			this.executeSignal.dispatch({"command":command, "fraction":this.step/CommModel.STEPS, "totalTime":CommModel.STEPS * this.getInterval()});
			this.scheduleNext();
		}
	};
	
	CommModel.prototype.nextInterval = function() {
		this.step++;
		if(this.isTurn() || this.step === CommModel.STEPS + 1){
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
		playingModel.setData(false);
	};
	
	CommModel.prototype.add = function(command, play) {
		this.commands.push(command);
		if(!playingModel.getData().playing && play){
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
	
