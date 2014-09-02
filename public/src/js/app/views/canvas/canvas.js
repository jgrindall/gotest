
define('app/views/canvas/canvas',['app/game', 'app/components/container', 'app/components/background',

'app/views/canvas/map', 'app/views/canvas/drawing',

'app/views/components/indicator', 'app/views/canvas/grid'],

function(Game, Container, Background,

Map, Drawing,

Indicator, Grid){
	
	"use strict";
	
	var Canvas  = function(options){
		Container.call(this, options);
	};
	
	Canvas.prototype = Object.create(Container.prototype);
	Canvas.prototype.constructor = Canvas;
	
	Canvas.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.w();
		h = Game.h();
		bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':this.bounds.w, 'h':this.bounds.h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.group.add(this.bg.sprite);
	};
	
	Canvas.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addMap();
		this.addGrid();
		this.addDrawing();
		this.addIndicator();
	};
	
	Canvas.prototype.addIndicator = function() {
		this.indicator = new Indicator({'bounds':{'x':30, 'y':50}});
		this.group.add(this.indicator.gfx);
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

	Canvas.prototype.addGrid = function() {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':this.bounds.w, 'h':this.bounds.h};
		this.grid = new Grid({'bounds':bounds});
		console.log(this.grid, this.grid.group);
		this.group.add(this.grid.group);
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
	
