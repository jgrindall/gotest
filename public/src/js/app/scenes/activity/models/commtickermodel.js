
define(['app/game', 'app/scenes/activity/commands/abstractcommandfactory',

'app/scenes/activity/models/speedmodel', 'app/scenes/activity/commands/movecommand', 'app/scenes/activity/commands/turncommand',

'app/scenes/activity/models/playingmodel', 'app/scenes/activity/models/bgmodel', 'app/scenes/activity/commands/abstractcommand',

'app/scenes/activity/models/colormodel', 'app/consts/playingstate'],

function(Game, AbstractCommandFactory,

speedModel, MoveCommand, TurnCommand,

playingModel, bgModel, AbstractCommand, 

colorModel, PlayingState){
	
	"use strict";
	
	var CommTickerModel  = function(){
		this.commandProvider = null;
		this.commandNum = 0;
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		colorModel.changeSignal.add(this.changeColor, this);
		bgModel.changeSignal.add(this.changeBg, this);
	};
	
	CommTickerModel.SPEED_FACTOR = 90;
	
	CommTickerModel.prototype.performCommand = function() {
		console.log("performCommand");
		var command, fraction, data;
		command = this.getCurrentCommand();
		data = {"command":command, "duration":this.getDuration()};
		this.dispatch(data);
	};
	
	CommTickerModel.prototype.reset = function(){
		playingModel.setData(PlayingState.NOT_PLAYING);
		this.commandNum = 0;
		this.resetSignal.dispatch();
	};
	
	CommTickerModel.prototype.changeBg = function(data) {
		this.reset();
	};
	
	CommTickerModel.prototype.changeColor = function(data) {
		var nextCommand = this.getNextCommand();
		if(playingModel.getData().playing === PlayingState.PLAYING && nextCommand){
			nextCommand.color = data.color;
		}
	};
	
	CommTickerModel.prototype.init = function(commandProvider) {
		this.commandProvider = commandProvider;
	};
	
	CommTickerModel.prototype.start = function() {
		console.log("start "+playingModel.getData().playing);
		if(playingModel.getData().playing !== PlayingState.PLAYING){
			playingModel.setData(PlayingState.PLAYING);
			this.performCommand();
		}
	};
	
	CommTickerModel.prototype.playAll = function() {
		if(this.getNum() === 0){
			return;
		}
		this.commandNum = 0;
		playingModel.setData(PlayingState.REPLAYING);
		this.performCommand();
	};
	
	CommTickerModel.prototype.dispatch = function(data) {
		this.executeSignal.dispatch(data);
	};
	
	CommTickerModel.prototype.replay = function() {
		this.resetSignal.dispatch();
		this.playAll();
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
		if(playingModel.getData().playing === PlayingState.PLAYING){
			this.reset();
		}
	};
	
	CommTickerModel.prototype.getDuration = function() {
		if(playingModel.getData().playing === PlayingState.PLAYING){
			return speedModel.getData().actualSpeed * CommTickerModel.SPEED_FACTOR;
		}
		else{
			return 0;
		}
	};
	
	CommTickerModel.prototype.nextCommand = function() {
		console.log("nextCommand ", this.commandNum, this.getNum());
		this.commandNum++;
		if(this.commandNum === this.getNum()){
			this.finished();		
		}
		else{
			this.performCommand();
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
	
	CommTickerModel.prototype.finished = function() {
		playingModel.setData(PlayingState.NOT_PLAYING);
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
	};
	
	return new CommTickerModel();

});
	
