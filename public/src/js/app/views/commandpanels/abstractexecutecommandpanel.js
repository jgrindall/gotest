
define('app/views/commandpanels/abstractexecutecommandpanel',[ 'phasercomponents',

'app/views/buttons/dirbutton', 'app/views/commandpanels/abstractcommandspanel',

'app/views/commandpanels/markers/markerfactory', 

'app/events/events'
],


function(PhaserComponents,

DirButton, AbstractCommandsPanel,

MarkerFactory, 

Events){
	
	"use strict";
	
	var AbstractExecuteCommandsPanel  = function(options){
		this.selectedCommand = null;
		AbstractCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(AbstractExecuteCommandsPanel, AbstractCommandsPanel);
	
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
		y = this.bounds.y + this.bounds.w/2;
		options = {'bounds':{'x':x, 'y':y}};
		this.marker = MarkerFactory.make(this.options.markerType, options);
		this.group.add(this.marker.sprite);
	};
	
	AbstractExecuteCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data, size;
		data = this.getGridData();
		w = this.game.w;
		h = this.game.h;
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.selectComm, this);
		this.group.add(this.grid.group);
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
	
	
