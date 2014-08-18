
define(['app/game', 'app/scenes/scene', 'app/scenes/activity/canvas', 'app/scenes/activity/controls',

'app/utils/textfactory', 'app/components/buttons/tabbutton', 'app/components/buttons/closebutton',

'app/components/loaderbar'],

function(Game, Scene, Canvas, Controls,

TextFactory, TabButton, CloseButton,

LoaderBar){
	
	"use strict";
	
	var ActivityScene  = function(key){
		Scene.call(this, key);
	};
	
	ActivityScene.prototype = Object.create(Scene.prototype);
	ActivityScene.prototype.constructor = ActivityScene;

	ActivityScene.prototype.create = function() {
		Scene.prototype.create.call(this);
		this.addCanvas();
		//this.addControls();
	};
	
	ActivityScene.prototype.addText = function() {
		this.label = TextFactory.make(Game.cx() - 300, 0, "Main menu", TextFactory.LARGE);
		this.world.add(this.label);
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":0, "w":Game.w()/2, "h":Game.h()};
		this.canvas = new Canvas({"bounds":bounds});
		this.world.add(this.canvas.group);
	};

	ActivityScene.prototype.addControls = function() {
		//var bounds = {"x":Game.w()/2, "y":0, "w":Game.w()/2, "h":Game.h()};
		//this.controls = new Controls({"bounds":bounds});
	};
	
	ActivityScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.canvas.destroy();
		this.controls.destroy();
	};
	
	return ActivityScene;

});
	
	



