
define(['jquery', 'app/views/canvas/canvas', 'app/views/controls/controls',

'app/views/components/menu', 'app/models/modelfacade',

'app/views/background', 'phasercomponents', 'app/views/name/nameview',

'app/events/events', 'app/assets', 'app/views/popups/tooltipmanager'],

function($, Canvas, Controls,

Menu, ModelFacade,

Background, PhaserComponents, NameView,

Events, Assets, ToolTipManager){
	
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
		this.addName();
		this.eventDispatcher.trigger({"type":Events.STARTUP});
		this.eventDispatcher.trigger({"type":Events.REPLAY});
		this.eventDispatcher.trigger({"type":Events.ENTER_FS});
		this.toolTipTimeout = setTimeout($.proxy(this.openToolTips, this), 2000);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.onResize.bind(this));
	};

	ActivityScene.prototype.openToolTips = function(){
		ToolTipManager.getInstance().start(this.game.w, this.game.h);
	};

	ActivityScene.prototype.addName = function() {
    	this.nameView = new NameView(ModelFacade.getInstance().get(ModelFacade.NAME));
    	$("#"+this.game.parent).append(this.nameView.el);	
	};

	ActivityScene.prototype.addBg = function() {
		var bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.world.add(this.bg.view);
	};
	
	ActivityScene.prototype.addCanvas = function() {
		var bounds = {"x":0, "y":50, "w":this.game.w - Controls.WIDTH, "h":this.game.h - 50};
		this.canvas = new Canvas({"bounds":bounds});
		this.world.add(this.canvas.view);
	};
	
	ActivityScene.prototype.addMenu = function() {
		var bounds = {'x':0, 'y':0, 'w':Menu.WIDTH, 'h':Menu.HEIGHT};
		this.menu = new Menu({"bounds":bounds});
		this.menu.clickSignal.add(this.menuClick, this);
		this.world.add(this.menu.view);
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
	
	ActivityScene.prototype.removeControls = function() {
		if(this.controls){
			this.world.remove(this.controls.view);
			this.controls.destroy();
			this.controls = null;
		}
	};

	ActivityScene.prototype.onResize = function() {
		this.removeControls();
		this.addControls();
	};

	ActivityScene.prototype.addControls = function() {
		var bounds = {"x":this.game.w - Controls.WIDTH, "y":0, "w": Controls.WIDTH, "h":this.game.h};
		this.controls = new Controls({"bounds":bounds});
		this.world.add(this.controls.view);
	};
	
	ActivityScene.prototype.destroy = function() {
		clearTimeout(this.toolTipTimeout);
		this.world.remove(this.menu.view);
		this.world.remove(this.canvas.view);
		this.world.remove(this.controls.view);
		this.world.remove(this.bg.view);
		this.bg.destroy();
		this.nameView.destroy();
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
	
	



