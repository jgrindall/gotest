
define([ 'phasercomponents', 'base/models/modelconsts',

'base/views/buttons/dirbutton', 'base/views/commandpanels/abstractcommandspanel',

'base/views/commandpanels/markers/markerfactory'],


function(PhaserComponents, ModelConsts, 

DirButton, AbstractCommandsPanel,

MarkerFactory){
	
	"use strict";
	
	var AbstractExecuteCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
		this.keyHandler = this.onKeyUp.bind(this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.KEY_UP, this.keyHandler);
		this.modelFacade.get(ModelConsts.COMMTICKER).resetSignal.add(this.onCommReset, this);
		this.commTime = new Date().getTime();
		this.init();
	};
	
	PhaserComponents.Utils.extends(AbstractExecuteCommandsPanel, AbstractCommandsPanel);
	
	AbstractExecuteCommandsPanel.GRID_SIZE = 		175;
	AbstractExecuteCommandsPanel.KEY_TIME = 		2500;
	AbstractExecuteCommandsPanel.NULL_BUTTON = 		4;

	AbstractExecuteCommandsPanel.prototype.onResize = function() {
		AbstractCommandsPanel.prototype.onResize.call(this);
		this.positionGrid();
		this.positionMarker();
	};

	AbstractExecuteCommandsPanel.prototype.positionGrid = function(){
		if(this.grid){
			this.grid.view.x = (this.bounds.w - AbstractExecuteCommandsPanel.GRID_SIZE)/2;
		}
	};

	AbstractExecuteCommandsPanel.prototype.positionMarker = function(){
		if(this.marker){
			this.marker.view.x = (this.bounds.w - AbstractExecuteCommandsPanel.GRID_SIZE)/2 + 88;
		}
	};

	AbstractExecuteCommandsPanel.prototype.onKeyUp = function() {
		
	};

	AbstractExecuteCommandsPanel.prototype.init = function() {
		
	};

	AbstractExecuteCommandsPanel.prototype.onCommReset = function() {
		this.setSelectedCommand(AbstractExecuteCommandsPanel.NULL_BUTTON);
	};

	AbstractExecuteCommandsPanel.prototype.disableInput = function() {
		if(this.grid){
			this.grid.disableInput();
		}
	};
	
	AbstractExecuteCommandsPanel.prototype.getSelectedCommand = function(){
		return this.modelFacade.get(ModelConsts.SELECTED_COMM).get();
	};

	AbstractExecuteCommandsPanel.prototype.recentComm = function() {
		var d = new Date().getTime();
		return (d - this.commTime < AbstractExecuteCommandsPanel.KEY_TIME);
	};

	AbstractExecuteCommandsPanel.prototype.setSelectedCommand = function(i) {
		this.commTime = new Date().getTime();
		this.modelFacade.get(ModelConsts.SELECTED_COMM).set(i);
	};
	
	AbstractExecuteCommandsPanel.prototype.enableInput = function() {
		if(this.grid){
			this.grid.enableInput();
		}
	};
	
	AbstractExecuteCommandsPanel.prototype.create = function() {
		AbstractCommandsPanel.prototype.create.call(this);
		this.addGrid();
		this.addMarker();
	};

	AbstractExecuteCommandsPanel.prototype.addMarker = function() {
		var x, y, options, model;
		x = this.bounds.x + this.bounds.w/2;
		y = this.bounds.y + AbstractExecuteCommandsPanel.GRID_SIZE/2;
		model = this.modelFacade.get(ModelConsts.SELECTED_COMM);
		options = {'bounds':{'x':x, 'y':y}, "model":model};
		this.marker = MarkerFactory.make(this.options.markerType, options);
		this.group.add(this.marker.view);
		this.positionMarker();
	};
	
	AbstractExecuteCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data;
		data = this.getGridData();
		w = this.game.w;
		h = this.game.h;
		bounds = {"x":this.bounds.x, "y":this.bounds.y, "w":AbstractExecuteCommandsPanel.GRID_SIZE, "h":AbstractExecuteCommandsPanel.GRID_SIZE};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.selectComm, this);
		this.group.add(this.grid.view);
		this.positionGrid();
	};
	
	AbstractExecuteCommandsPanel.prototype.destroy = function() {
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.KEY_UP, this.keyHandler);
		this.keyHandler = null;
		this.modelFacade.get(ModelConsts.COMMTICKER).resetSignal.remove(this.onCommReset, this);
		if(this.grid){
			this.grid.clickSignal.remove(this.selectComm, this);
			this.grid.destroy();
		}
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return AbstractExecuteCommandsPanel;
});
	
	
