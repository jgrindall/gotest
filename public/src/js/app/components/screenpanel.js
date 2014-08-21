
define(['app/game', 'app/components/container',

'app/components/buttons/navbutton', 'app/components/screenchoice',

'app/components/buttongrid'],

function(Game, Container, 

NavButton, ScreenChoice,

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
		this.signal.dispatch(data);
	};
	
	ScreenPanel.prototype.addPanels = function(){
		var bounds, options;
		bounds = {"x":this.bounds.x, "y":this.bounds.y, "w":700, "h":500};
		options = {"bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		this.grid = new ButtonGrid(options);
		this.grid.signal.add(this.select, this);
		this.group.add(this.grid.group);
	};
	
	return ScreenPanel;

});



