
define('app/views/commandpanels/abstractcommandspanel',[ 'phasercomponents',

'app/components/buttons/dirbutton',

'app/views/commandpanels/markerfactory', 

'app/events/events'
],


function(PhaserComponents,

DirButton,

MarkerFactory, 

Events){
	
	"use strict";
	
	var AbstractCommandsPanel  = function(options){
		PhaserComponents.Container.call(this, options);
		this.selectedCommand = null;
		//Game.alertSignal.add(this.onAlert, this);
	};
	
	AbstractCommandsPanel.WIDTH = 190;
	
	AbstractCommandsPanel.prototype = Object.create(PhaserComponents.Container.prototype);
	AbstractCommandsPanel.prototype.constructor = AbstractCommandsPanel;
	
	AbstractCommandsPanel.prototype.build = function(config) {
		this.builder.build(config, this);
	};
	
	AbstractCommandsPanel.prototype.onAlert = function(data) {
		if(data.show){
			this.disableAllInput();
		}
		else{
			this.enableAllInput();
		}
	};
	
	AbstractCommandsPanel.prototype.disableAllInput = function() {
		if(this.grid){
			this.grid.disableAll();
		}
	};
	
	AbstractCommandsPanel.prototype.setSelectedCommand = function(i) {
		this.selectedCommand = i;
		this.marker.goTo(i);
	};
	
	AbstractCommandsPanel.prototype.enableAllInput = function() {
		if(this.grid){
			this.grid.enableAll();
		}
	};
	
	AbstractCommandsPanel.prototype.create = function() {
		PhaserComponents.Container.prototype.create.call(this);
		this.addGrid();
		this.addMarker();
	};
	
	AbstractCommandsPanel.prototype.addMarker = function() {
		var x, y, options;
		x = this.bounds.x + this.bounds.w/2;
		y = this.bounds.y + this.bounds.w/2;
		options = {'bounds':{'x':x, 'y':y}};
		this.marker = MarkerFactory.make(this.options.markerType, options);
		this.group.add(this.marker.sprite);
	};
	
	AbstractCommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data, size, model;
		data = this.getGridData();
		w = this.game.w;
		h = this.game.h;
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new PhaserComponents.ButtonGrid(options);
		this.grid.clickSignal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	AbstractCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	AbstractCommandsPanel.prototype.addCommand = function(direction, type){
		this.addCommands(direction, type, 1);
	};
	
	AbstractCommandsPanel.prototype.addCommands = function(direction, type, total){
		var index, json;
		for(index = 0; index < total; index++){
			json = {'type':type, 'direction':direction, 'index':index, 'total':total};
			this.eventDispatcher.trigger({"type":Events.ADD_COMMAND, "data":json});
		}
	};
	
	AbstractCommandsPanel.prototype.destroy = function() {
		if(this.grid){
			this.grid.clickSignal.remove(this.selectComm, this);
			this.grid.destroy();
		}
		PhaserComponents.Container.prototype.destroy.call(this);
	};
	
	return AbstractCommandsPanel;
});
	
	
