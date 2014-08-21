
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid', 'app/scenes/activity/gamescreenmenu', 'app/scenes/activity/commmodel'

],

function(Game, Container, Background,

TabButtonBar, TabButton, DirButton, KeyButton,

ButtonGrid, GameScreenMenu, commModel){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		Container.call(this, options);
		Game.alertSignal.add($.proxy(this.onAlert, this));
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
		commModel.add(index);
	};
	
	AbstractCommandsPanel.prototype.addCommands = function(index, num){
		if(num >= 1){
			for(var i = 1; i <= num; i++){
				commModel.add(index);
			}
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
	
	
