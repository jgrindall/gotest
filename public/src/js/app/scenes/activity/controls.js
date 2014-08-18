
define(['app/game', 'app/components/container', 'app/components/background', 'app/components/tabbuttonbar', 'app/components/buttons/tabbutton'],

function(Game, Container, Background, TabButtonBar, TabButton){
	
	"use strict";
	
	var Controls  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':w/2, 'y':0, 'w':w/2, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.bg.create();
		this.group.add(this.bg.sprite);
	};
	
	Controls.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addTabs();
	};

	Controls.prototype.addTabs = function() {
		var bounds = {'x':0, 'y':0, 'w':200, 'h':50};
		this.tabButtonBar = new TabButtonBar({"bounds":bounds, "buttonClass":TabButton, "numX":5, "numY":1});
		this.group.add(this.tabButtonBar.group);
		this.tabButtonBar.select(1);
	};
	
	Controls.prototype.destroy = function() {
		Controls.prototype.destroy.call(this);
		this.bg.destroy();
		this.tabButtonBar.destroy();
	};
	
	return Controls;
});
	
	
