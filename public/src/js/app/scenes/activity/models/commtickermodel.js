
define(['app/game', 'app/scenes/activity/commands/abstractcommandfactory',

'app/scenes/activity/models/speedmodel', 'app/scenes/activity/commands/movecommand', 'app/scenes/activity/commands/turncommand',

'app/scenes/activity/models/playingmodel', 'app/scenes/activity/models/bgmodel', 'app/scenes/activity/commands/abstractcommand',

'app/scenes/activity/models/colormodel'],

function(Game, AbstractCommandFactory,

speedModel, MoveCommand, TurnCommand,

playingModel, bgModel, AbstractCommand, 

colorModel){
	
	"use strict";
	
	var CommTickerModel  = function(){
		this.commandProvider = null;
		this.commandNum = 0;
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		colorModel.changeSignal.add(this.changeColor, this);
		bgModel.changeSignal.add(this.changeBg, this);
	};
	
	CommTickerModel.SPEED_FACTOR = 10;
	CommTickerModel.STEPS = 4;
	CommTickerModel.PAUSE = 30;
	
	CommTickerModel.prototype.performCommand = function() {
		var that = this, pauseTime;
		pauseTime = CommTickerModel.PAUSE*speedModel.getData().actualSpeed;
		setTimeout(function(){
			that.step = 0;
			that.triggerEvent();
		}, pauseTime);
	};
	
	CommTickerModel.prototype.reset = function(){
		playingModel.setData(false);
		this.commandNum = 0;
		this.resetSignal.dispatch();
	};
	
	CommTickerModel.prototype.changeBg = function(data) {
		this.reset();
	};
	
	CommTickerModel.prototype.changeColor = function(data) {
		var nextCommand = this.getNextCommand();
		if(playingModel.getData().playing && nextCommand){
			nextCommand.color = data.color;
		}
	};
	
	CommTickerModel.prototype.init = function(commandProvider) {
		this.commandProvider = commandProvider;
	};
	
	CommTickerModel.prototype.start = function() {
		if(!playingModel.getData().playing){
			playingModel.setData(true);
			this.performCommand();
		}
	};
	
	CommTickerModel.prototype.playAllFromToIncluding = function(i0, i1) {
		var i, command;
		if(i1 < i0){
			return;
		}
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
	
	CommTickerModel.prototype.replay = function() {
		this.resetSignal.dispatch();
		this.playAllFromToIncluding(0, this.getNum() - 1);
	};
	
	CommTickerModel.prototype.removeCommands = function() {
		var topCommand, numToRemove, i;
		topCommand = this.getTop();
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			this.commands.pop();
			this.commandNum --;
		}
	};
	
	CommTickerModel.prototype.stop = function() {
		if(playingModel.getData().playing){
			this.reset();
		}
	};
	
	CommTickerModel.prototype.getNum = function() {
		return this.commandProvider.getNum();
	};
	
	CommTickerModel.prototype.getTop = function() {
		return this.commandProvider.getTop();
	};
	
	CommTickerModel.prototype.getNextCommand = function() {
		return this.commandProvider.getCommandAt(this.commandNum + 1);
	};
	
	CommTickerModel.prototype.getCurrentCommand = function() {
		return this.commandProvider.getCommandAt(this.commandNum);
	};
	
	CommTickerModel.prototype.getInterval = function() {
		return speedModel.getData().actualSpeed * CommTickerModel.SPEED_FACTOR;
	};
	
	CommTickerModel.prototype.scheduleNext = function() {
		var interval = this.getInterval();
		this.timeout = setTimeout($.proxy(this.nextInterval, this), interval);
	};
	
	CommTickerModel.prototype.triggerEvent = function() {
		var command, fraction, data;
		if(playingModel.getData().playing){
			command = this.getCurrentCommand();
			data = {"command":command, "fraction":this.step/CommTickerModel.STEPS, "totalTime":CommTickerModel.STEPS * this.getInterval()};
			this.executeSignal.dispatch(data);
			this.scheduleNext();
		}
	};
	
	CommTickerModel.prototype.nextInterval = function() {
		this.step++;
		if(this.step === CommTickerModel.STEPS + 1){
			this.commandNum++;
			if(this.commandNum === this.getNum()){
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
	
	CommTickerModel.prototype.finished = function() {
		playingModel.setData(false);
	};
	
	CommTickerModel.prototype.clearSignals = function(){
		this.executeSignal.dispose();
		this.resetSignal.dispose();
		this.executeSignal = null;
		this.resetSignal = null;
	};
	
	CommTickerModel.prototype.destroy = function(){
		AbstractModel.prototype.destroy.call(this);
		this.clearSignals();
		if(this.timeout){
			clearTimeout(this.timeout);
		}
	};
	
	return new CommTickerModel();

});
	
