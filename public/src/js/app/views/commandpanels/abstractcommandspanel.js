
define([ 'phasercomponents', 

'app/events/events'
],


function(PhaserComponents,

Events){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
	};
	
	PhaserComponents.Utils.extends(AbstractCommandsPanel, PhaserComponents.Display.Container);
	
	AbstractCommandsPanel.prototype.onAlert = function(event, data) {
		if(data.shown){
			this.disableInput();
		}
		else{
			this.enableInput();
		}
	};
	
	AbstractCommandsPanel.prototype.disableInput = function(){

	};
	
	AbstractCommandsPanel.prototype.enableInput = function(){
	
	};

	AbstractCommandsPanel.prototype.addCommand = function(direction, type){
		this.addCommands(direction, type, 1);
	};
	
	AbstractCommandsPanel.prototype.addCommands = function(direction, type, total){
		var index, json;
		for(index = 0; index < total; index++){
			json = {'type':type, 'direction':direction, 'index':index, 'total':total};
			this.eventDispatcher.trigger({"type":Events.ADD_COMMAND, "data":json});
		}
	};
	
	AbstractCommandsPanel.prototype.destroy = function() {
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return AbstractCommandsPanel;
});
	
	
