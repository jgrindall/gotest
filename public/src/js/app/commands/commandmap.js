define('app/commands/commandmap',['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var CommandMap = function(){
		this.hash = {};
	};
	
	CommandMap.prototype.trigger = function(event, obj){
		if(!obj || !obj.type){
			throw "Undefined command";
		}
		var CommandClassRef = this.get(obj.type);
		if(CommandClassRef){
			(new CommandClassRef()).start(obj.data);
		}
	};

	CommandMap.prototype.map = function(eventName, CommandClassRef){
		var handler;
		if(!eventName || !CommandClassRef || this.hash[eventName]){
			throw "Error with map";
		}
		handler = this.trigger.bind(this);
		PhaserComponents.eventDispatcher.addListener(eventName, handler);
		this.hash[eventName] = CommandClassRef;
		new CommandClassRef();
	};
	
	CommandMap.prototype.get = function(eventName){
		return this.hash[eventName];
	};
	
  	return CommandMap;
});




