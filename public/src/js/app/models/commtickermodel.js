
define(['app/game', 'app/logocommands/abstractcommandfactory',

'app/models/speedmodel', 'app/logocommands/movecommand', 'app/logocommands/turncommand',

'app/models/playingmodel', 'app/models/bgmodel', 'app/logocommands/abstractcommand',

'app/models/colormodel', 'app/models/commnummodel', 'app/consts/playingstate'],

function(Game, AbstractCommandFactory,

speedModel, MoveCommand, TurnCommand,

playingModel, bgModel, AbstractCommand, 

colorModel, commNumModel, PlayingState){
	
	"use strict";
	
	var CommTickerModel  = function(){
		this.commandProvider = null;
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		colorModel.changeSignal.add(this.changeColor, this);
		bgModel.changeSignal.add(this.changeBg, this);
	};
	
	CommTickerModel.SPEED_FACTOR = 120;
	
	CommTickerModel.prototype.performCommand = function() {
		var command, data, duration, that = this;
		duration = this.getDuration();
		command = this.getCurrentCommand();
		data = {"command":command, "duration":duration};
		if(duration === 0){
			this.dispatch(data);
		}
		else{
			setTimeout(function(){
				that.dispatch(data);
			}, duration/2);
		}
	};
	
	CommTickerModel.prototype.reset = function(){
		playingModel.setData(PlayingState.NOT_PLAYING);
		commNumModel.reset();
		this.resetSignal.dispatch();
	};
	
	CommTickerModel.prototype.changeBg = function(data) {
		this.reset();
	};
	
	CommTickerModel.prototype.changeColor = function(data) {
		var nextCommand = this.getNextCommand();
		if(playingModel.getData().playing === PlayingState.PLAYING && nextCommand){
			nextCommand.color = data.index;
		}
	};
	
	CommTickerModel.prototype.init = function(commandProvider) {
		this.commandProvider = commandProvider;
	};
	
	CommTickerModel.prototype.start = function() {
		if(playingModel.getData().playing !== PlayingState.PLAYING){
			playingModel.setData(PlayingState.PLAYING);
			this.performCommand();
		}
	};
	
	CommTickerModel.prototype.playAll = function() {
		if(this.getNum() === 0){
			return;
		}
		playingModel.setData(PlayingState.REPLAYING);
		this.performCommand();
	};
	
	CommTickerModel.prototype.dispatch = function(data) {
		this.executeSignal.dispatch(data);
	};
	
	CommTickerModel.prototype.replay = function() {
		this.resetSignal.dispatch();
		commNumModel.reset();
		this.playAll();
	};
	
	CommTickerModel.prototype.removeCommands = function() {
		var topCommand, numToRemove, i;
		topCommand = this.getTop();
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			this.commands.pop();
			this.commNumModel.decrement();
		}
	};
	
	CommTickerModel.prototype.stop = function() {
		if(playingModel.getData().playing !== PlayingState.NOT_PLAYING){
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
		commNumModel.increment();
		if(this.getCommandNum() === this.getNum()){
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
	
	CommTickerModel.prototype.getCommandNum = function() {
		return commNumModel.getData().commandNum;
	};

	CommTickerModel.prototype.getNextCommand = function() {
		return this.commandProvider.getCommandAt(this.getCommandNum() + 1);
	};
	
	CommTickerModel.prototype.getCurrentCommand = function() {
		return this.commandProvider.getCommandAt(this.getCommandNum());
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
	
