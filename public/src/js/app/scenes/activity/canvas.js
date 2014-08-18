
define(['app/game', 'app/components/container', 'app/components/background', 'app/components/tabbuttonbar', 'app/components/buttons/tabbutton'],

function(Game, Container, Background, TabButtonBar, TabButton){
	
	"use strict";
	
	var Canvas  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Canvas.prototype = Object.create(Container.prototype);
	Canvas.prototype.constructor = Canvas;
	
	Canvas.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':0, 'y':0, 'w':w/2, 'h':h};
		this.bg = new Background({"asset":'background', "bounds":bounds});
		this.bg.create();
		this.group.add(this.bg.sprite);
	};
	
	Canvas.prototype.create = function() {
		Container.prototype.create.call(this);
		//this.addBg();
		this.addTabs();
	};
	
	Canvas.prototype.addTabs = function() {
		var bounds = {'x':50, 'y':50, 'w':200, 'h':50};
		this.tabButtonBar = new TabButtonBar({"bounds":bounds, "buttonClass":TabButton, "numX":3, "numY":1});
		this.group.add(this.tabButtonBar.group);
		//this.tabButtonBar.select(0);
		console.log("tabbuttiobar " +this.tabButtonBar);
	};
	
	Canvas.prototype.destroy = function() {
		this.bg.destroy();
	};
	
	return Canvas;

});
	
