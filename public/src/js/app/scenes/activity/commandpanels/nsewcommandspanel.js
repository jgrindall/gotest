
define(['app/game', 'app/components/container',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid', 'app/scenes/activity/commandpanels/abstractcommandspanel',

'app/scenes/activity/commmodel'

],

function(Game, Container, DirButton, KeyButton,

ButtonGrid, AbstractCommandsPanel,

commModel){
	
	"use strict";
	
	var NSEWCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	NSEWCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	NSEWCommandsPanel.prototype.constructor = NSEWCommandsPanel;

	NSEWCommandsPanel.prototype.addKeys = function() {
		
	};
	
	NSEWCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data, size;
		data = [{num:0, visible:true}, {num:1, visible:true}, {num:2, visible:true}, {num:3, visible:true}, {num:4, visible:false}, {num:5, visible:true}, {num:6, visible:true}, {num:7, visible:true}, {num:8, visible:true}];
		w = Game.w();
		h = Game.h();
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new ButtonGrid(options);
		this.grid.signal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	NSEWCommandsPanel.prototype.selectComm = function(data){
		this.addCommand(data.index);
	};
	
	NSEWCommandsPanel.prototype.destroy = function() {
		this.grid.signal.removeAll(this);
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return NSEWCommandsPanel;
});
	
	
