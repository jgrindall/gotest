
define(['jquery', 'app/views/canvas/canvas', 'app/views/controls/controls',

'app/views/components/menu', 'app/models/modelfacade', 'app/consts/canvaslayout',

'app/views/background', 'phasercomponents', 'app/views/name/nameview',

'app/events/events', 'app/assets', 'app/views/popups/tooltipmanager'],

function($, Canvas, Controls,

Menu, ModelFacade, CanvasLayout,

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
		this.toolTipTimeout = setTimeout(this.openToolTips.bind(this), 300);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.onResize.bind(this));
	};

	ActivityScene.prototype.openToolTips = function(){
		ToolTipManager.getInstance().start(this.game.w, this.game.h);
	};

	ActivityScene.prototype.addName = function() {
    	this.nameView = new NameView(ModelFacade.getInstance().get(ModelFacade.NAME));
    	$("#"+this.game.parent).append(this.nameView.el);	
	};

	ActivityScene.prototype.removeBg = function() {
		if(this.bg){
			this.world.remove(this.bg.view);
			this.bg.destroy();
			this.bg = null;
		}
	};

	ActivityScene.prototype.addBg = function() {
		var bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.world.add(this.bg.view);
	};
	
	ActivityScene.prototype.removeCanvas = function() {
		if(this.canvas){
			this.world.remove(this.canvas.view);
			this.canvas.destroy();
			this.canvas = null;
		}
	};

	ActivityScene.prototype.getCanvasSize = function() {
		var rect, size, scale, ratio;
		ratio = CanvasLayout.REF_WIDTH/CanvasLayout.REF_HEIGHT;
		rect = {"w":this.game.w - Controls.WIDTH, "h":this.game.h - 50};
		size = PhaserComponents.Utils.fitRect(rect, ratio);
		scale = size.w / CanvasLayout.REF_WIDTH;
		return size;
	};

	ActivityScene.prototype.addCanvas = function() {
		var scale, x, y, xtimesscale, ytimesscale, bounds, size;
		size = this.getCanvasSize();
		scale = size.w/CanvasLayout.REF_WIDTH;
		xtimesscale = (this.game.w - Controls.WIDTH - CanvasLayout.REF_WIDTH * scale)/2;
		ytimesscale = 50 + (this.game.h - CanvasLayout.REF_HEIGHT * scale - 50)/2;
		x = xtimesscale / scale;
		y = ytimesscale / scale;
		bounds = {'x':x, 'y':y, 'w':CanvasLayout.REF_WIDTH, 'h':CanvasLayout.REF_HEIGHT};
		this.canvas = new Canvas({"bounds":bounds, "scale":scale});
		this.world.add(this.canvas.view);
	};
	
	ActivityScene.prototype.addMenu = function() {
		var bounds = {'x':0, 'y':0, 'w':Menu.WIDTH, 'h':Menu.HEIGHT};
		this.menu = new Menu({"bounds":bounds});
		this.menu.clickSignal.add(this.menuClick, this);
		this.world.add(this.menu.view);
	};

	ActivityScene.prototype.removeMenu = function() {
		if(this.menu){
			this.menu.clickSignal.remove(this.menuClick, this);
			this.world.remove(this.menu.view);
			this.menu.destroy();
			this.menu = null;
		}
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
		this.removeBg();
		this.removeControls();
		this.removeCanvas();
		this.removeMenu();
		this.addBg();
		this.addControls();
		this.addCanvas();
		this.addMenu();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};

	ActivityScene.prototype.addControls = function() {
		var bounds = {"x":this.game.w - Controls.WIDTH, "y":0, "w": Controls.WIDTH, "h":this.game.h};
		this.controls = new Controls({"bounds":bounds});
		this.world.add(this.controls.view);
	};
	
	ActivityScene.prototype.destroy = function() {
		clearTimeout(this.toolTipTimeout);
		this.world.remove(this.menu.view);
		this.world.remove(this.controls.view);
		this.removeBg();
		this.removeCanvas();
		this.nameView.destroy();
		this.menu.destroy();
		this.controls.destroy();
	};

	ActivityScene.prototype.shutdown = function() {
		PhaserComponents.Scene.prototype.shutdown.apply(this, arguments);
		this.destroy();
	};
	
	return ActivityScene;

});
	
	



