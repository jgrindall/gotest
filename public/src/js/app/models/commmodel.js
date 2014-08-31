
define(['app/logocommands/abstractcommandfactory',

'app/models/commtickermodel',

'app/models/abstractmodel', 'app/events/eventdispatcher',

'app/events/events'],

function(AbstractCommandFactory,

commTickerModel,

AbstractModel, eventDispatcher,

Events){
	
	"use strict";
		
	var CommModel  = function(){
		console.log("commm constructor");
		AbstractModel.call(this);
		this.commands = [];
		commTickerModel.init(this);
	};
	
	CommModel.prototype = Object.create(AbstractModel.prototype);
	CommModel.prototype.constructor = CommModel;

	CommModel.prototype.add = function(command) {
		this.commands.push(command);
		this.trigger();
		eventDispatcher.trigger({"event":Events.DRAW});
	};
	
	CommModel.prototype.setData = function(commands) {
		var that = this;
		this.empty();
		$.each(commands, function(i, c){
			that.add(AbstractCommandFactory.fromJson(c), false);
		});
	};
	
	CommModel.prototype.getData = function() {
		return {"num": this.getNum()};
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
		return this.getCommandAt(this.commands.length - 1);
	};
	
	CommModel.prototype.getCommandAt = function(i) {
		return this.commands[i];
	};
	
	CommModel.prototype.stop = function() {
		this.empty();
	};
	
	CommModel.prototype.empty = function() {
		this.commands = [];
	};
	
	CommModel.prototype.undo = function() {
		if(this.commands.length >= 1){
			this.removeTop();
			eventDispatcher.trigger({"event":Events.REPLAY});
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
	
