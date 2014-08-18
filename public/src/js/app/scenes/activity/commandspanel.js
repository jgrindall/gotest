
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/components/buttons/closebutton', 'app/components/buttongrid',

'app/scenes/activity/commmodel'

],

function(Game, Container, Background,

TabButtonBar, TabButton, CloseButton, ButtonGrid,

commModel){
	
	"use strict";
	
	var CommandsPanel  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	CommandsPanel.prototype = Object.create(Container.prototype);
	CommandsPanel.prototype.constructor = CommandsPanel;
	
	CommandsPanel.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGrid();
	};

	CommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data;
		data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		w = Game.w();
		h = Game.h();
		bounds = {"x":w/2, "y":70, "w":400, "h":400};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": CloseButton, "data":data};
		this.grid = new ButtonGrid(options);
		this.grid.signal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	CommandsPanel.prototype.selectComm = function(data){
		commModel.add(data.index);
	};
	
	CommandsPanel.prototype.destroy = function() {
		this.grid.signal.removeAll(this);
		Container.prototype.destroy.call(this);
		this.grid.destroy();
	};
	
	return CommandsPanel;
});
	
	
