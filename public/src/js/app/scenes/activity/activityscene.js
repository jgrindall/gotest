
define(['app/game', 'app/scenes/scene', 'app/scenes/activity/canvas', 'app/scenes/activity/controls'],

function(Game, Scene, Canvas, Controls){
	
	"use strict";
	
	var ActivityScene  = function(key){
		Scene.call(this, key);
	};
	
	ActivityScene.prototype = Object.create(Scene.prototype);
	ActivityScene.prototype.constructor = ActivityScene;

	ActivityScene.prototype.create = function() {
		this.addCanvas();
		//this.addControls();
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":0, "w":100, "h":100};
		this.canvas = new Canvas({"bounds":bounds});
		this.world.add(this.canvas);
	};
	
	ActivityScene.prototype.addControls = function() {
		//var bounds = {"x":0, "y":0, "w":100, "h":100};
		//this.controls = new Controls({"bounds":bounds});
	};
	
	ActivityScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.canvas.destroy();
		this.controls.destroy();
	};
	
	return ActivityScene;

});
	
	



