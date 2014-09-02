
define('app/models/commmodel',['app/logocommands/abstractlogocommandfactory',

'app/models/abstractmodel'],

function(AbstractCommandFactory,

AbstractModel){
	
	"use strict";
		
	var CommModel  = function(){
		AbstractModel.call(this);
		this.commands = [];
	};
	
	CommModel.prototype = Object.create(AbstractModel.prototype);
	CommModel.prototype.constructor = CommModel;

	CommModel.prototype.add = function(command) {
		this.commands.push(command);
		this.trigger();
	};
	
	CommModel.prototype.setData = function(commands) {
		var that = this;
		this.reset();
		commands.forEach(function(c, i){
			that.add(AbstractCommandFactory.fromJson(c), false);
		});
	};
	
	CommModel.prototype.getData = function() {
		return {"num": this.getNum()};
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
	
	return new CommModel();

});
	
