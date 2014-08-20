
define(['app/game', 'app/scenes/scene', 'app/scenes/activity/canvas', 'app/scenes/activity/controls',

'app/utils/textfactory', 'app/components/buttons/tabbutton', 'app/components/buttons/closebutton',

'app/components/buttons/menubutton', 'app/components/buttons/okbutton', 'app/utils/alertmanager',

'app/components/loaderbar', 'app/scenes/activity/menu', 'app/scenes/activity/commmodel',

'app/scenes/activity/layoutmodel'],

function(Game, Scene, Canvas, Controls,

TextFactory, TabButton, CloseButton,

MenuButton, OkButton, AlertManager,

LoaderBar, Menu, commModel,

layoutModel){
	
	"use strict";
	
	var ActivityScene  = function(key){
		Scene.call(this, key);
	};
	
	ActivityScene.prototype = Object.create(Scene.prototype);
	ActivityScene.prototype.constructor = ActivityScene;

	ActivityScene.prototype.create = function() {
		Scene.prototype.create.call(this);
		this.addCanvas();
		this.addControls();
		this.addMenu();
		commModel.load();
	};
	
	ActivityScene.prototype.addText = function() {
		this.label = TextFactory.make(Game.cx() - 300, 0, "Main menu", TextFactory.LARGE);
		this.world.add(this.label);
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":50, "w":Game.w()/2, "h":Game.h()};
		this.canvas = new Canvas({"bounds":bounds});
		this.world.add(this.canvas.group);
	};
	
	ActivityScene.prototype.addMenu = function() {
		var bounds = {'x':5, 'y':5, 'w':500, 'h':50};
		this.menu = new Menu({"bounds":bounds, "buttonClass":MenuButton, "numX":5, "numY":1});
		this.menu.signal.add(this.menuSelected, this);
		this.world.add(this.menu.group);
	};
	
	ActivityScene.prototype.bgChosen = function(data) {
		layoutModel.setBg(data.selectedIndex);
	};
	
	ActivityScene.prototype.menuSelected = function(data) {
		var i = data.index;
		if(i === 0){
			AlertManager.makeBgMenu($.proxy(this.bgChosen, this));
		}
		else if(i === 1){
			commModel.stop();
		}
		else if(i === 2){
			commModel.undo();
		} 
	};
	
	ActivityScene.prototype.addControls = function() {
		var bounds = {"x":Game.w()/2, "y":0, "w":Game.w()/2, "h":Game.h()};
		this.controls = new Controls({"bounds":bounds});
	};
	
	ActivityScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.canvas.destroy();
		this.controls.destroy();
	};
	
	return ActivityScene;

});
	
	



