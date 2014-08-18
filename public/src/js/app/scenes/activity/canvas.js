
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/scenes/activity/map', 'app/scenes/activity/turtle', 'app/scenes/activity/paths'],

function(Game, Container, Background,

TabButtonBar, TabButton,

Map, Turtle, Paths){
	
	"use strict";
	
	var Canvas  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Canvas.prototype = Object.create(Container.prototype);
	Canvas.prototype.constructor = Canvas;
	
	Canvas.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.w();
		h = Game.h();
		bounds = {'x':0, 'y':0, 'w':w/2, 'h':h};
		this.bg = new Background({"asset":'background', "bounds":bounds});
		this.bg.create();
		this.group.add(this.bg.sprite);
	};
	
	Canvas.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addMap();
		this.addPaths();
		this.addTurtle();
	};
	
	Canvas.prototype.addTurtle = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
		this.turtle = new Turtle({'bounds':bounds});
		this.group.add(this.turtle.group);
	};
	
	Canvas.prototype.addPaths = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
		this.paths = new Paths({'bounds':bounds});
		this.group.add(this.paths.group);
	};
	
	Canvas.prototype.addMap = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
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
	
