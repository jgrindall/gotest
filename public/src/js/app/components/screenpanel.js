
define(['app/components/container',

'app/components/screenchoice', 'app/scenes/activity/buttongridmodel',

'app/components/buttongrid'],

function(Container, 

ScreenChoice, ButtonGridModel,

ButtonGrid){
	
	"use strict";
	
	var ScreenPanel = function(options){
		this.panels = [];
		Container.call(this, options);
		this.signal = new Phaser.Signal();
	};
	
	ScreenPanel.prototype = Object.create(Container.prototype);
	ScreenPanel.prototype.constructor = ScreenPanel;
	
	ScreenPanel.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addPanels();
	};
	
	ScreenPanel.prototype.select = function(data){
		console.log("ScreenPanel select "+data);
		this.signal.dispatch(data);
	};
	
	ScreenPanel.prototype.addPanels = function(){
		var bounds, options, model;
		model = new ButtonGridModel();
		bounds = this.bounds;
		options = {"bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice, "model":model};
		this.grid = new ButtonGrid(options);
		this.grid.signal.add(this.select, this);
		this.group.add(this.grid.group);
	};
	
	ScreenPanel.prototype.destroy = function(){
		console.log("destroy screen panel");
		this.grid.signal.remove(this.select, this);
		this.grid.destroy();
		this.grid = null;
		Container.prototype.destroy.call(this);
	};
	
	return ScreenPanel;

});



