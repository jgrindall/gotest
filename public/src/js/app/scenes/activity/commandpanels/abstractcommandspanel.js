
define(['app/game', 'app/components/container',

'app/scenes/activity/commands/abstractcommand',

'app/scenes/activity/models/commmodel', 'app/scenes/activity/models/colormodel'

],

function(Game, Container,

AbstractCommand,

commModel, colorModel){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		Container.call(this, options);
		Game.alertSignal.add(this.onAlert, this);
	};
	
	AbstractCommandsPanel.WIDTH = 190;
	
	AbstractCommandsPanel.prototype = Object.create(Container.prototype);
	AbstractCommandsPanel.prototype.constructor = AbstractCommandsPanel;
	
	AbstractCommandsPanel.prototype.build = function(config) {
		this.builder.build(config, this);
	};
	
	AbstractCommandsPanel.prototype.onAlert = function(data) {
		if(data.show){
			this.disableAllInput();
		}
		else{
			this.enableAllInput();
		}
	};
	
	AbstractCommandsPanel.prototype.disableAllInput = function() {
		if(this.grid){
			this.grid.disableAll();
		}
		if(this.keys){
			this.keys.disableAll();
		}
	};
	
	AbstractCommandsPanel.prototype.enableAllInput = function() {
		if(this.grid){
			this.grid.enableAll();
		}
		if(this.keys){
			this.keys.enableAll();
		}
	};
	
	AbstractCommandsPanel.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGrid();
		this.addKeys();
	};
	
	AbstractCommandsPanel.prototype.addKeys = function() {
		
	};
	
	AbstractCommandsPanel.prototype.addGrid = function() {
		
	};
	
	AbstractCommandsPanel.prototype.addCommand = function(index){
		this.addCommands(index, 1);
	};
	
	AbstractCommandsPanel.prototype.addCommands = function(direction, num){
		var index, c;
		for(index = 0; index < num; index++){
			c = new AbstractCommand(direction, colorModel.color, index, num);
			commModel.add(c, true);
		}
	};
	
	AbstractCommandsPanel.prototype.destroy = function() {
		if(this.grid){
			this.grid.destroy();
		}
		if(this.keys){
			this.keys.destroy();
		}
		Container.prototype.destroy.call(this);
	};
	
	return AbstractCommandsPanel;
});
	
	
