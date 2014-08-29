
define(['app/game', 'app/commands/abstractcommandfactory',

'app/models/commtickermodel'],

function(Game, AbstractCommandFactory,

commTickerModel){
	
	"use strict";
	
	var CommModel  = function(){
		this.commands = [];
		commTickerModel.init(this);
	};
	
	CommModel.prototype.add = function(command) {
		this.commands.push(command);
		commTickerModel.start();
	};
	
	CommModel.prototype.addFromJson = function(commands) {
		var that = this;
		this.empty();
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
	
	CommModel.prototype.getNum = function() {
		return this.commands.length;
	};
	
	CommModel.prototype.getTop = function() {
		return this.commands[this.commands.length - 1];
	};
	
	CommModel.prototype.getCommandAt = function(i) {
		return this.commands[i];
	};
	
	CommModel.prototype.stop = function() {
		this.empty();
		commTickerModel.stop();
	};
	
	CommModel.prototype.empty = function() {
		this.commands = [];
	};
	
	CommModel.prototype.undo = function() {
		if(this.commands.length >= 1){
			this.removeTop();
			commTickerModel.replay();
		}
	};
	
	CommModel.prototype.removeTop = function() {
		var topCommand, numToRemove, i;
		topCommand = this.getTop();
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			this.commands.pop();
		}
	};
	
	CommModel.prototype.destroy = function(){
		AbstractModel.prototype.destroy.call(this);
		this.commands = null;
	};
	
	return new CommModel();

});
	
