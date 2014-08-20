
define(['app/game', 'app/components/container',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid', 'app/scenes/activity/commands/abstractcommandspanel', 'app/scenes/activity/commmodel'

],

function(Game, Container, DirButton, KeyButton,

ButtonGrid, AbstractCommandsPanel, commModel){
	
	"use strict";
	
	var NSEWCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	NSEWCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	NSEWCommandsPanel.prototype.constructor = NSEWCommandsPanel;

	NSEWCommandsPanel.prototype.addKeys = function() {
		
	};
	
	NSEWCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data;
		data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		w = Game.w();
		h = Game.h();
		bounds = {"x":w/2, "y":60, "w":220, "h":220};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new ButtonGrid(options);
		this.grid.signal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	NSEWCommandsPanel.prototype.selectComm = function(data){
		this.addCommand(data);
	};
	
	NSEWCommandsPanel.prototype.selectKey = function(data){
		this.addCommand(data);
	};
	
	NSEWCommandsPanel.prototype.destroy = function() {
		this.grid.signal.removeAll(this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEWCommandsPanel;
});
	
	
