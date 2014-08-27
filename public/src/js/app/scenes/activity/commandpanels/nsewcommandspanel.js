
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
	
	var NSEWCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	NSEWCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	NSEWCommandsPanel.prototype.constructor = NSEWCommandsPanel;

	NSEWCommandsPanel.prototype.addKeys = function() {
		
	};
	
	NSEWCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data, size, model;
		model = new ButtonGridModel();
		data = [{num:0, visible:false}, {num:1, visible:true}, {num:2, visible:false}, {num:3, visible:true}, {num:4, visible:false}, {num:5, visible:true}, {num:6, visible:false}, {num:7, visible:true}, {num:8, visible:false}];
		w = Game.w();
		h = Game.h();
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data, "model":model};
		this.grid = new ButtonGrid(options);
		this.grid.clickSignal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	NSEWCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
		this.addCommand(data.index, CommandTypes.MOVE);
	};
	
	NSEWCommandsPanel.prototype.destroy = function() {
		this.grid.clickSignal.remove(this.selectComm, this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEWCommandsPanel;
});
	
	