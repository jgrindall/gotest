
define([ 'phasercomponents', 

'app/events/events', 'app/assets'
],


function(PhaserComponents,

Events, Assets, ProgDragContainer, ProgButtons){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	AbstractCommandsPanel.HEIGHT = 370;

	PhaserComponents.Utils.extends(AbstractCommandsPanel, PhaserComponents.Display.Container);
	
	AbstractCommandsPanel.prototype.disableInput = function(){

	};
	
	AbstractCommandsPanel.prototype.enableInput = function(){
	
	};

	AbstractCommandsPanel.prototype.onResize = function(){
		this.layoutBass();
	};

	AbstractCommandsPanel.prototype.layoutBass = function(){
		var availableWidth = this.bounds.w - 274;
		this.base.x = availableWidth/2;
	};

	AbstractCommandsPanel.prototype.addBase = function(){
		this.base = new Phaser.Sprite(this.game, 0, 0, Assets.BASE);
		this.base.alpha = 0.7;
		this.group.add(this.base);
	};
	
	AbstractCommandsPanel.prototype.removeBase = function(){
		this.group.remove(this.base);
		this.base.destroy();
		this.base = null;
	};

	AbstractCommandsPanel.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBase();
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
		this.removeBase();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return AbstractCommandsPanel;
});
	
	
