
define(['app/game', 'app/components/container',

'app/scenes/activity/commands/abstractcommandfactory',

'app/scenes/activity/models/commmodel', 'app/scenes/activity/models/colormodel',

'app/scenes/activity/commandpanels/marker'
],

function(Game, Container,

AbstractCommandFactory,

commModel, colorModel,

Marker){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		Container.call(this, options);
		this.selectedCommand = null;
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
	
	AbstractCommandsPanel.prototype.setSelectedCommand = function(i) {
		this.selectedCommand = i;
		this.marker.goTo(i);
		this.enableKeys();
	};
	
	AbstractCommandsPanel.prototype.enableAllInput = function() {
		if(this.grid){
			this.grid.enableAll();
		}
		if(this.keys && this.selectedCommand !== null){
			this.keys.enableAll();
		}
	};
	
	AbstractCommandsPanel.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGrid();
		this.addKeys();
		this.addMarker();
		this.disableKeys();
	};
	
	AbstractCommandsPanel.prototype.disableKeys = function() {
		if(this.keys){
			this.keys.disableAll();
			this.keys.alpha = 0.1;
		}
	};
	
	AbstractCommandsPanel.prototype.enableKeys = function() {
		if(this.keys){
			this.keys.enableAll();
			this.keys.alpha = 1;
		}
	};
	
	AbstractCommandsPanel.prototype.addMarker = function() {
		var x, y;
		x = this.bounds.x + this.bounds.w/2 - Marker.WIDTH/2;
		y = this.bounds.y + this.bounds.w/2 - Marker.HEIGHT/2;
		this.marker = new Marker({'bounds':{'x':x, 'y':y}});
		this.group.add(this.marker.sprite);
	};
	
	AbstractCommandsPanel.prototype.addKeys = function() {
		
	};
	
	AbstractCommandsPanel.prototype.addGrid = function() {
		
	};
	
	AbstractCommandsPanel.prototype.addCommand = function(direction, type){
		this.addCommands(direction, type, 1);
	};
	
	AbstractCommandsPanel.prototype.addCommands = function(direction, type, total){
		var index, c, json;
		for(index = 0; index < total; index++){
			json = {'type':type, 'direction':direction, 'color':colorModel.color, 'index':index, 'total':total};
			c = new AbstractCommandFactory.fromJson(json);
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
	
	
