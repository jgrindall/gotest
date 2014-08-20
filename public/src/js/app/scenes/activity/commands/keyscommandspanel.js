
define(['app/game', 'app/components/container',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid', 'app/scenes/activity/commands/abstractcommandspanel', 'app/scenes/activity/commmodel'

],

function(Game, Container, DirButton, KeyButton,

ButtonGrid, AbstractCommandsPanel, commModel){
	
	"use strict";
	
	var KeysCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	KeysCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	KeysCommandsPanel.prototype.constructor = KeysCommandsPanel;

	KeysCommandsPanel.prototype.addKeys = function() {
		var options, bounds, w, h, data;
		data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		w = Game.w();
		h = Game.h();
		bounds = {"x":w/2, "y":300, "w":220, "h":220};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": KeyButton, "data":data};
		this.keys = new ButtonGrid(options);
		this.keys.signal.add(this.selectKey, this);
		this.group.add(this.keys.group);
	};
	
	KeysCommandsPanel.prototype.addGrid = function() {
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
	
	KeysCommandsPanel.prototype.selectComm = function(data){
		this.selectedCommand = data.index;
	};
	
	KeysCommandsPanel.prototype.selectKey = function(data){
		this.addCommands(this.selectedCommand, data.index);
	};
	
	KeysCommandsPanel.prototype.destroy = function() {
		this.grid.signal.removeAll(this);
		this.keys.signal.removeAll(this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return KeysCommandsPanel;
});
	
	
