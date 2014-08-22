
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton', 'app/scenes/activity/commmodel',

'app/scenes/activity/bgmodel',

'app/scenes/activity/map', 'app/scenes/activity/drawing'],

function(Game, Container, Background,

TabButtonBar, TabButton, commModel,

bgModel,

Map, Drawing){
	
	"use strict";
	
	var Canvas  = function(options){
		Container.call(this, options);
		bgModel.changeSignal.add(this.changeBg, this);
	};
	
	Canvas.prototype = Object.create(Container.prototype);
	Canvas.prototype.constructor = Canvas;
	
	Canvas.prototype.changeBg = function(data) {
		this.map.setBg(data.bg);
	};
	
	Canvas.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.w();
		h = Game.h();
		bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':this.bounds.w, 'h':this.bounds.h};
		this.bg = new Background({"asset":'background', "bounds":bounds});
		this.group.add(this.bg.sprite);
	};
	
	Canvas.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addMap();
		this.addDrawing();
	};
	
	Canvas.prototype.addDrawing = function() {
		this.drawing = new Drawing({'bounds':this.bounds});
		this.group.add(this.drawing.group);
	};
	
	Canvas.prototype.addMap = function() {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':this.bounds.w, 'h':this.bounds.h};
		this.map = new Map({'bounds':bounds});
		this.group.add(this.map.group);
	};
	
	Canvas.prototype.addButton = function() {
		var bounds = {"x":0, "y":0, "w":100, "h":50};
		var b = new TabButton({'bounds':bounds});
		this.group.add(b.sprite);
	};
	
	Canvas.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.map.destroy();
		this.bg.destroy();
	};
	
	return Canvas;

});
	
