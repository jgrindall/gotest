
define('app/scenes/activityscene',['app/game', 'app/scenes/scene', 'app/views/canvas/canvas', 'app/views/controls/controls',

'app/views/components/menu', 

'app/components/background', 'phasercomponents',

'app/events/events'],

function(Game, Scene, Canvas, Controls,

Menu,

Background, PhaserComponents,

Events){
	
	"use strict";
	
	var ActivityScene  = function(key){
		Scene.call(this, key);
	};
	
	ActivityScene.prototype = Object.create(Scene.prototype);
	ActivityScene.prototype.constructor = ActivityScene;

	ActivityScene.prototype.create = function() {
		Scene.prototype.create.call(this);
		this.addBg();
		this.addCanvas();
		this.addControls();
		this.addMenu();
		PhaserComponents.eventDispatcher.trigger({"type":Events.STARTUP});
		PhaserComponents.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
	ActivityScene.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':0, 'y':0, 'w':w, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.world.add(this.bg.sprite);
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":50, "w":Game.w() - Controls.WIDTH, "h":Game.h() - 50};
		console.log("canvas size is "+bounds.w, bounds.h);
		this.canvas = new Canvas({"bounds":bounds});
		this.world.add(this.canvas.group);
	};
	
	ActivityScene.prototype.addMenu = function() {
		var bounds = {'x':0, 'y':0, 'w':300, 'h':50};
		this.menu = new Menu({"bounds":bounds});
		this.menu.clickSignal.add(this.menuClick, this);
		this.world.add(this.menu.group);
	};
	
	ActivityScene.prototype.menuClick = function(data) {
		var i = data.index;
		if(i === 0){
			PhaserComponents.eventDispatcher.trigger({"type":Events.NEW_FILE});
		}
		else if(i === 1){
			PhaserComponents.eventDispatcher.trigger({"type":Events.LOAD});
		}
		else if(i === 2){
			PhaserComponents.eventDispatcher.trigger({"type":Events.SAVE});
		}
		else if(i === 3){
			PhaserComponents.eventDispatcher.trigger({"type":Events.PRINT});
		}
	};
	
	ActivityScene.prototype.addControls = function() {
		var bounds = {"x":Game.w() - Controls.WIDTH, "y":0, "w": Controls.WIDTH, "h":Game.h()};
		this.controls = new Controls({"bounds":bounds});
		this.world.add(this.controls.group);
	};
	
	ActivityScene.prototype.destroy = function() {
		this.world.remove(this.menu.group);
		this.world.remove(this.canvas.group);
		this.world.remove(this.controls.group);
		this.world.remove(this.bg.sprite);
		this.bg.destroy();
		this.menu.destroy();
		this.canvas.destroy();
		this.controls.destroy();
	};


	ActivityScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.destroy();
	};
	
	return ActivityScene;

});
	
	



