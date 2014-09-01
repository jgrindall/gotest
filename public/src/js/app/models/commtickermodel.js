
define('app/models/commtickermodel',['app/models/abstractmodel',

],

function(AbstractModel){
	
	"use strict";
	
	var CommTickerModel  = function(){
		this.commandProvider = null;
		this.commandNum = 0;
		this.duration = 0;
		this.executeSignal = new Phaser.Signal();
		this.resetSignal = new Phaser.Signal();
		AbstractModel.call(this);
	};

	CommTickerModel.prototype = Object.create(AbstractModel.prototype);
	CommTickerModel.prototype.constructor = CommTickerModel;
	
	CommTickerModel.prototype.performCommand = function() {
		var command, data, that = this;
		command = this.getCurrentCommand();
		data = {"command":command, "duration":this.duration};
		if(this.duration === 0){
			this.dispatch(data);
		}
		else{
			setTimeout(function(){
				that.dispatch(data);
			}, that.duration/2);
		}
	};

	CommTickerModel.prototype.getData = function(i) {
		return {"num":this.commandNum};
	};

	CommTickerModel.prototype.setCommandNum = function(i) {
		if(this.commandNum !== i){
			this.commandNum = i;
			this.trigger();
		}
	};

	CommTickerModel.prototype.reset = function(){
		this.commandNum = 0;
		this.resetSignal.dispatch();
	};
	
	CommTickerModel.prototype.init = function(commandProvider) {
		this.commandProvider = commandProvider;
	};
	
	CommTickerModel.prototype.start = function() {
		this.performCommand();
	};
	
	CommTickerModel.prototype.dispatch = function(data) {
		this.executeSignal.dispatch(data);
	};
	
	CommTickerModel.prototype.replay = function() {
		this.resetSignal.dispatch();
		this.commandNum = 0;
		this.performCommand();
	};
	
	CommTickerModel.prototype.removeCommands = function() {
		var topCommand, numToRemove, i;
		topCommand = this.getTop();
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			this.commands.pop();
			this.setCommandNum(this.commandNum - 1);
		}
	};
	
	CommTickerModel.prototype.nextCommand = function() {
		this.setCommandNum(this.commandNum + 1);
		if(this.getCommandNum() === this.getNum()){
			commandMap.trigger({"event":Events.FINISHED});
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
	
