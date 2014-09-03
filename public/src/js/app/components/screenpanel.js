
define('app/components/screenpanel',['phaser',

'app/components/screenchoice',

'phasercomponents'],

function(Phaser, 

ScreenChoice, PhaserComponents,

){
	
	"use strict";
	
	var ScreenPanel = function(options){
		this.panels = [];
		PhaserComponents.Container.call(this, Game.getInstance(), options);
		this.signal = new Phaser.Signal();
	};
	
	ScreenPanel.prototype = Object.create(Container.prototype);
	ScreenPanel.prototype.constructor = ScreenPanel;
	
	ScreenPanel.prototype.create = function(){
		PhaserComponents.Container.prototype.create.call(this);
		this.addPanels();
	};
	
	ScreenPanel.prototype.select = function(data){
		console.log("ScreenPanel select "+data);
		this.signal.dispatch(data);
	};
	
	ScreenPanel.prototype.addPanels = function(){
		var bounds, options;
		bounds = this.bounds;
		options = {"bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		this.grid = new PhaserComponents.ButtonGrid(Game.getInstance(), options);
		this.grid.signal.add(this.select, this);
		this.group.add(this.grid.group);
	};
	
	ScreenPanel.prototype.destroy = function(){
		console.log("destroy screen panel");
		this.grid.signal.remove(this.select, this);
		this.grid.destroy();
		this.grid = null;
		PhaserComponents.Container.prototype.destroy.call(this);
	};
	
	return ScreenPanel;

});



