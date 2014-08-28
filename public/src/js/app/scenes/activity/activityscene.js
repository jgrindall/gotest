
define(['app/game', 'app/scenes/scene', 'app/scenes/activity/canvas/canvas', 'app/scenes/activity/controls/controls',

'app/utils/textfactory', 'app/utils/alertmanager', 'app/scenes/activity/components/menu', 'app/utils/storage',

'app/scenes/activity/models/screenmodel', 'app/components/background',

'app/scenes/activity/models/bgmodel'],

function(Game, Scene, Canvas, Controls,

TextFactory, AlertManager, Menu, Storage,

screenModel, Background,

bgModel){
	
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
		Storage.getInstance().loadDefaults();
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
	
	ActivityScene.prototype.bgChosen = function(data) {
		console.log("bgChosen "+JSON.stringify(data));
		if(data.index === 1){
			bgModel.setBg(data.selection.selectedPage);
			//TODO - clear it!
		}
	};
	
	ActivityScene.prototype.menuClick = function(data) {
		var i = data.index;
		if(i === 0){
			AlertManager.makeBgMenu({}, $.proxy(this.bgChosen, this));
		}
		else if(i === 1){
			Storage.getInstance().load($.proxy(this.onLoaded, this));
		}
		else if(i === 2){
			Storage.getInstance().save();
		}
		else if(i === 3){
			this.print();
		}
	};
	
	ActivityScene.prototype.onLoaded = function(){
		AlertManager.makeGrowl({"label":"Loaded your file"}, null);
	};
	
	ActivityScene.prototype.print = function(){
		AlertManager.makeGrowl({"label":"No printers found"}, null);
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
	
	



