
define([ 'phasercomponents', 

'app/events/events'
],


function(PhaserComponents,

Events){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.view.alpha = 0.4;
	};
	
	AbstractCommandsPanel.HEIGHT = 370;

	PhaserComponents.Utils.extends(AbstractCommandsPanel, PhaserComponents.Display.Container);
	
	AbstractCommandsPanel.prototype.disableInput = function(){

	};
	
	AbstractCommandsPanel.prototype.enableInput = function(){
	
	};

	AbstractCommandsPanel.prototype.onResize = function(){
		
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
	
	
