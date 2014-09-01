
define('app/scenes/activityscene',['app/game', 'app/scenes/scene', 'app/views/canvas/canvas', 'app/views/controls/controls',

'app/text/textfactory', 'app/views/components/menu', 

'app/components/background', 'app/commands/commandmap',

'app/events/events'],

function(Game, Scene, Canvas, Controls,

TextFactory, Menu,

Background, commandMap,

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
		commandMap.trigger({"event":Events.STARTUP});
		commandMap.trigger({"event":Events.REPLAY});
	};
	
	ActivityScene.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':0, 'y':0, 'w':w, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.world.add(this.bg.sprite);
	};
	
	ActivityScene.prototype.addText = function() {
		this.label = TextFactory.make(Game.cx() - 300, 0, "Main menu", TextFactory.LARGE);
		this.world.add(this.label);
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":50, "w":Game.w() - Controls.WIDTH, "h":Game.h()};
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
			commandMap.trigger({"event":Events.NEW_FILE});
		}
		else if(i === 1){
			commandMap.trigger({"event":Events.LOAD});
		}
		else if(i === 2){
			commandMap.trigger({"event":Events.SAVE});
		}
		else if(i === 3){
			commandMap.trigger({"event":Events.PRINT});
		}
	};
	
	ActivityScene.prototype.addControls = function() {
		var bounds = {"x":Game.w() - Controls.WIDTH, "y":0, "w": Controls.WIDTH, "h":Game.h()};
		this.controls = new Controls({"bounds":bounds});
	};
	
	ActivityScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.canvas.destroy();
		this.controls.destroy();
	};
	
	return ActivityScene;

});
	
	



