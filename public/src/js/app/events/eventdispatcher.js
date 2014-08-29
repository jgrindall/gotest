define(['app/events/commandmap', 'phaser'],

function(commandMap, Phaser) {
	
	"use strict";
	
	var EventDispatcher = function(){
		this.signal = 			new Phaser.Signal();
		this.pauseSignal = 		new Phaser.Signal();
		this.alertSignal = 		new Phaser.Signal();
	};
	
	EventDispatcher.prototype.trigger = function(obj){
		var CommandClassRef = commandMap.get(obj.event);
		if(CommandClassRef){
			(new CommandClassRef()).execute(obj.data);
		}
	};
	
  	return new EventDispatcher();
});




