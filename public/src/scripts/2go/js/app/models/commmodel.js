
define(['base/logocommands/logocommandfactory',

'phasercomponents', 'base/logocommands/commandtypes'],

function(LogoCommandFactory,

PhaserComponents, CommandTypes){
	
	"use strict";
		
	var CommModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.commands = [];
		this.num = 0;
		this.numExcludingTransport = 0;
	};
	
	PhaserComponents.Utils.extends(CommModel, PhaserComponents.Model.AbstractModel);

	CommModel.prototype.add = function(command) {
		this.commands.push(command);
		//console.log("this.commands.length is ", this.commands.length);
		this.num ++;
		if(command.type !== CommandTypes.TRANSPORT){
			this.numExcludingTransport ++;
		}
		//this.trigger();
	};
		

	CommModel.prototype.set = function(commands) {
		var that = this, cmd;
		this.reset();
		commands.forEach(function(c){
			cmd = LogoCommandFactory.fromJson(c);
			that.add(cmd, false);
		});
	};
	
	CommModel.prototype.get = function() {
		return this.getNum();
	};

	CommModel.prototype.toJson = function() {
		var jsonArray = [];
		this.commands.forEach(function(c){
			jsonArray.push(c.toJson());
		});
		return jsonArray;
	};
	
	CommModel.prototype.getNum = function(excludeTransport) {
		if(excludeTransport){
			return this.numExcludingTransport;
		}
		else{
			return this.num;
		}
	};
	
	CommModel.prototype.getTop = function() {
		return this.getCommandAt(this.commands.length - 1);
	};
	
	CommModel.prototype.getCommandAt = function(i) {
		return this.commands[i];
	};

	CommModel.prototype.removeNext = function(currentNum) {
		var cmd, correctLength = currentNum + 1;
		while(this.commands.length > correctLength){
			cmd = this.commands.pop();
			this.num--;
			if(cmd.type !== CommandTypes.TRANSPORT){
				this.numExcludingTransport--;
			}
		}
	};

	CommModel.prototype.rewind = function() {
		this.reset();
		this.trigger();
	};
	
	CommModel.prototype.reset = function() {
		this.commands = [];
		this.num = 0;
		this.numExcludingTransport = 0;
		this.trigger();
	};
	
	CommModel.prototype.undo = function() {
		if(this.commands.length >= 1){
			this.removeTop();
		}
	};
	
	CommModel.prototype.removeTop = function() {
		var topCommand, cmd, numToRemove, i;
		topCommand = this.getTop();
		numToRemove = topCommand.total;
		for(i = 1; i<= numToRemove; i++){
			cmd = this.commands.pop();
			this.num--;
			if(cmd.type !== CommandTypes.TRANSPORT){
				this.numExcludingTransport--;
			}
		}
		//update lengths
		this.trigger();
	};
	
	CommModel.prototype.destroy = function(){
		PhaserComponents.Model.AbstractModel.prototype.destroy.call(this);
		this.commands = null;
	};
	
	return CommModel;

});
	
