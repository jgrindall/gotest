
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/scenes/activity/commands/abstractcommand',

'app/components/buttongrid', 'app/scenes/activity/commmodel', 'app/scenes/activity/colormodel'

],

function(Game, Container, Background,

TabButtonBar, TabButton, DirButton, KeyButton,

AbstractCommand,

ButtonGrid, commModel, colorModel){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		Container.call(this, options);
		Game.alertSignal.add(this.onAlert, this);
	};
	
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
	
	
