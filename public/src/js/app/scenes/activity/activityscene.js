
define(['app/game', 'app/scenes/scene', 'app/scenes/activity/canvas', 'app/scenes/activity/controls',

'app/utils/textfactory', 'app/components/buttons/tabbutton', 'app/components/buttons/closebutton',

'app/components/buttons/menubutton', 'app/components/buttons/okbutton', 'app/utils/alertmanager',

'app/components/loaderbar', 'app/scenes/activity/menu', 'app/utils/storage',

'app/scenes/activity/commmodel', 'app/scenes/activity/screenmodel', 'app/components/background',

'app/scenes/activity/bgmodel'],

function(Game, Scene, Canvas, Controls,

TextFactory, TabButton, CloseButton,

MenuButton, OkButton, AlertManager,

LoaderBar, Menu, Storage,

commModel, screenModel, Background,

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
		Storage.getInstance().load();
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
		if(data.index === 0){
			bgModel.setBg(data.selectedPage);
			//TODO - clear it!
		}
	};
	
	ActivityScene.prototype.menuClick = function(data) {
		var i = data.index;
		if(i === 0){
			AlertManager.makeBgMenu({}, $.proxy(this.bgChosen, this));
		}
		else if(i === 1){
			Storage.getInstance().load();
		}
		else if(i === 2){
			Storage.getInstance().save();
		}
		else if(i === 3){
			//commModel.stop();
		}
		else if(i === 4){
			commModel.stop();
		}
		else if(i === 5){
			commModel.undo();
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
	
	



