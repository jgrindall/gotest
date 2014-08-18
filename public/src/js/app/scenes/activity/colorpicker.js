
define(['app/game', 'app/components/container', 'app/components/background', 'app/components/tabbuttonbar', 'app/components/buttons/tabbutton'],

function(Game, Container, Background, TabButtonBar, TabButton){
	
	"use strict";
	
	var ColorPicker  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	ColorPicker.prototype = Object.create(Container.prototype);
	ColorPicker.prototype.constructor = ColorPicker;
	
	ColorPicker.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addSprite();
	};

	ColorPicker.prototype.addTabs = function() {
		var bounds = {'x':this.bounds.x, 'y':50, 'w':600, 'h':50};
		this.tabButtonBar = new TabButtonBar({"bounds":bounds, "buttonClass":TabButton, "numX":3, "numY":1});
		this.group.add(this.tabButtonBar.group);
		this.tabButtonBar.select(0);
	};
	
	ColorPicker.prototype.destroy = function() {
		ColorPicker.prototype.destroy.call(this);
		this.bg.destroy();
		this.tabButtonBar.destroy();
	};
	
	return ColorPicker;
});
	
	
