
define([ 'phasercomponents',

'app/views/buttons/dirbutton', 'app/views/commandpanels/abstractcommandspanel',

'app/views/commandpanels/markers/markerfactory', 'app/events/events'
],


function(PhaserComponents,

DirButton, AbstractCommandsPanel,

MarkerFactory, Events){
	
	"use strict";
	
	var AbstractExecuteCommandsPanel  = function(options){
		this.selectedCommand = null;
		AbstractCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(AbstractExecuteCommandsPanel, AbstractCommandsPanel);
	
	AbstractExecuteCommandsPanel.GRID_SIZE = 170;

	AbstractExecuteCommandsPanel.prototype.disableInput = function() {
		if(this.grid){
			this.grid.disableInput();
		}
	};
	
	AbstractExecuteCommandsPanel.prototype.setSelectedCommand = function(i) {
		this.selectedCommand = i;
		this.marker.goTo(i);
	};
	
	AbstractExecuteCommandsPanel.prototype.enableInput = function() {
		if(this.grid){
			this.grid.enableInput();
		}
	};
	
	AbstractExecuteCommandsPanel.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addGrid();
		this.addMarker();
	};
	
	AbstractExecuteCommandsPanel.prototype.addMarker = function() {
		var x, y, options;
		x = this.bounds.x + this.bounds.w/2;
		y = this.bounds.y + AbstractExecuteCommandsPanel.GRID_SIZE/2;
		options = {'bounds':{'x':x, 'y':y}};
		this.marker = MarkerFactory.make(this.options.markerType, options);
		this.group.add(this.marker.view);
	};
	
	AbstractExecuteCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data;
		data = this.getGridData();
		w = this.game.w;
		h = this.game.h;
		bounds = {"x":this.bounds.x + (this.bounds.w - AbstractExecuteCommandsPanel.GRID_SIZE)/2, "y":this.bounds.y, "w":AbstractExecuteCommandsPanel.GRID_SIZE, "h":AbstractExecuteCommandsPanel.GRID_SIZE};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.selectComm, this);
		this.group.add(this.grid.view);
	};
	
	AbstractExecuteCommandsPanel.prototype.destroy = function() {
		if(this.grid){
			this.grid.clickSignal.remove(this.selectComm, this);
			this.grid.destroy();
		}
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return AbstractExecuteCommandsPanel;
});
	
	
