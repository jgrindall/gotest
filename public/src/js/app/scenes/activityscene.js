
define('app/scenes/activityscene',['app/views/canvas/canvas', 'app/views/controls/controls',

'app/views/components/menu', 

'app/views/background', 'phasercomponents',

'app/events/events', 'app/assets'],

function(Canvas, Controls,

Menu,

Background, PhaserComponents,

Events, Assets){
	
	"use strict";
	
	var ActivityScene  = function(){
		PhaserComponents.Scene.call(this);
	};
	
	PhaserComponents.Utils.extends(ActivityScene, PhaserComponents.Scene);

	ActivityScene.prototype.create = function() {
		this.addBg();
		this.addCanvas();
		this.addControls();
		this.addMenu();
		this.eventDispatcher.trigger({"type":Events.STARTUP});
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};

	ActivityScene.prototype.addBg = function() {
		var w, h, bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.world.add(this.bg.sprite);
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":50, "w":this.game.w - Controls.WIDTH, "h":this.game.h - 50};
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
			this.eventDispatcher.trigger({"type":Events.NEW_FILE});
		}
		else if(i === 1){
			this.eventDispatcher.trigger({"type":Events.LOAD});
		}
		else if(i === 2){
			this.eventDispatcher.trigger({"type":Events.SAVE});
		}
		else if(i === 3){
			this.eventDispatcher.trigger({"type":Events.PRINT});
		}
	};
	
	ActivityScene.prototype.addControls = function() {
		var bounds = {"x":this.game.w - Controls.WIDTH, "y":0, "w": Controls.WIDTH, "h":this.game.h};
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
		PhaserComponents.Scene.prototype.shutdown.apply(this, arguments);
		this.destroy();
	};
	
	return ActivityScene;

});
	
	



