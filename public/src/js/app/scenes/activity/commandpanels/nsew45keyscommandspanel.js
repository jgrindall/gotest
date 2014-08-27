
define(['app/game', 'app/components/container',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid/buttongrid', 'app/scenes/activity/commandpanels/abstractcommandspanel',

'app/scenes/activity/commands/commandtypes',

'app/scenes/activity/models/commmodel', 'app/components/buttongrid/buttongridmodel'

],

function(Game, Container, DirButton, KeyButton,

ButtonGrid, AbstractCommandsPanel,

CommandTypes,

commModel, ButtonGridModel){
	
	"use strict";
	
	var NSEW45KeysCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	NSEW45KeysCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	NSEW45KeysCommandsPanel.prototype.constructor = NSEW45KeysCommandsPanel;

	NSEW45KeysCommandsPanel.prototype.addKeys = function() {
		var options, bounds, w, h, data, size, model;
		data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		model = new ButtonGridModel();
		w = Game.w();
		h = Game.h();
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y + size, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": KeyButton, "data":data, "model":model};
		this.keys = new ButtonGrid(options);
		this.keys.clickSignal.add(this.selectKey, this);
		this.group.add(this.keys.group);
	};
	
	NSEW45KeysCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data, size, model;
		model = new ButtonGridModel();
		data = [{num:0, visible:true}, {num:1, visible:true}, {num:2, visible:true}, {num:3, visible:true}, {num:4, visible:false}, {num:5, visible:true}, {num:6, visible:true}, {num:7, visible:true}, {num:8, visible:true}];
		w = Game.w();
		h = Game.h();
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data, "model":model};
		this.grid = new ButtonGrid(options);
		this.grid.clickSignal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	NSEW45KeysCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
	};
	
	NSEW45KeysCommandsPanel.prototype.selectKey = function(data){
		this.addCommands(this.selectedCommand, CommandTypes.MOVE, data.index + 1);
	};
	
	NSEW45KeysCommandsPanel.prototype.destroy = function() {
		this.grid.clickSignal.remove(this.selectComm, this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEW45KeysCommandsPanel;
});
	
	
