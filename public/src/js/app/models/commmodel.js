
define('app/models/commmodel',['app/logocommands/logocommandfactory',

'phasercomponents'],

function(LogoCommandFactory,

PhaserComponents){
	
	"use strict";
		
	var CommModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.commands = [];
	};
	
	CommModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	CommModel.prototype.constructor = CommModel;

	CommModel.prototype.add = function(command) {
		this.commands.push(command);
		this.trigger();
	};
	
	CommModel.prototype.set = function(commands) {
		var that = this;
		this.reset();
		commands.forEach(function(c, i){
			that.add(LogoCommandFactory.fromJson(c), false);
		});
	};
	
	CommModel.prototype.get = function() {
		return this.getNum();
	};

	CommModel.prototype.toJson = function() {
		var jsonArray = [];
		this.commands.forEach(function(c, i){
			jsonArray.push(c.toJson());
		});
		return jsonArray;
	};
	
	CommModel.prototype.getNum = function() {
		return this.commands.length;
	};
	
	CommModel.prototype.getTop = function() {
		return this.getCommandAt(this.commands.length - 1);
	};
	
	CommModel.prototype.getCommandAt = function(i) {
		return this.commands[i];
	};
	
	CommModel.prototype.stop = function() {
		this.reset();
	};
	
	CommModel.prototype.reset = function() {
		this.commands = [];
	};
	
	CommModel.prototype.undo = function() {
		if(this.commands.length >= 1){
			this.removeTop();
		}
	};
	
	CommModel.prototype.removeTop = function() {
		var topCommand, numToRemove, i;
		topCommand = this.getTop();
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			this.commands.pop();
		}
		this.trigger();
	};
	
	CommModel.prototype.destroy = function(){
		AbstractModel.prototype.destroy.call(this);
		this.commands = null;
	};
	
	return CommModel;

});
	
