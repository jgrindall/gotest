
define(['app/game', 'app/components/container',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid/buttongrid',

'app/scenes/activity/commandpanels/abstractcommandspanel',

'app/scenes/activity/commands/commandtypes',

'app/scenes/activity/models/commmodel', 'app/components/buttongrid/buttongridmodel'

],

function(Game, Container, DirButton, KeyButton,

ButtonGrid, AbstractCommandsPanel,

CommandTypes,

commModel, ButtonGridModel){
	
	"use strict";
	
	var TurningKeysCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	TurningKeysCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	TurningKeysCommandsPanel.prototype.constructor = TurningKeysCommandsPanel;

	TurningKeysCommandsPanel.prototype.addKeys = function() {
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
	
	TurningKeysCommandsPanel.prototype.addGrid = function() {
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
	
	TurningKeysCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
	};
	
	TurningKeysCommandsPanel.prototype.selectKey = function(data){
		var type;
		if(this.selectedCommand === 1 || this.selectedCommand === 7){
			type = CommandTypes.FD;
		}
		else{
			type = CommandTypes.TURN;
		}
		this.addCommands(this.selectedCommand, type, data.index + 1);
	};
	
	TurningKeysCommandsPanel.prototype.destroy = function() {
		this.grid.clickSignal.remove(this.selectComm, this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return TurningKeysCommandsPanel;
});
	
	
