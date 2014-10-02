
define(['jquery', 'app/views/canvas/canvas', 'app/views/controls/controls',

'app/views/components/menu', 'app/models/modelfacade',

'app/consts/canvaslayout', 'app/views/controls/controltop',

'app/views/background', 'phasercomponents', 'app/views/name/nameview',

'app/assets'],

function($, Canvas, Controls,

Menu, ModelFacade,

CanvasLayout, ControlTop,

Background, PhaserComponents, NameView,

Assets){
	
	"use strict";
	
	var MainView  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(MainView, PhaserComponents.Display.Container);

	MainView.TOP_PADDING = 50;

	MainView.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
		this.addTop();
		this.addCanvas();
		this.addControls();
		this.addMenu();
		this.addName();
	};

	MainView.prototype.addTop = function() {
		var bounds = this.bounds;
		this.top = new ControlTop({"bounds":bounds});
		this.group.add(this.top.view);
	};

	MainView.prototype.removeTop = function(){
		if(this.top){
			this.group.remove(this.top.view);
			this.top.destroy();
			this.top = null;
		}
	};

	MainView.prototype.addName = function() {
    	this.nameView = new NameView(ModelFacade.getInstance().get(ModelFacade.NAME));
    	$("body").append(this.nameView.el);
	};

	MainView.prototype.removeBg = function() {
		if(this.bg){
			this.group.remove(this.bg.view);
			this.bg.destroy();
			this.bg = null;
		}
	};

	MainView.prototype.addBg = function() {
		var bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.group.add(this.bg.view);
	};
	
	MainView.prototype.removeCanvas = function() {
		if(this.canvas){
			this.group.remove(this.canvas.view);
			this.canvas.destroy();
			this.canvas = null;
		}
	};

	MainView.prototype.positionCanvas = function() {
		var scale, w, h, x, y;
		scale = this.getCanvasScale();
		w = CanvasLayout.REF_WIDTH * scale;
		h = CanvasLayout.REF_HEIGHT * scale;
		x = (this.game.w - Controls.WIDTH - w)/2;
		y = MainView.TOP_PADDING + (this.game.h - h - MainView.TOP_PADDING)/2;
		this.canvas.view.x = x;
		this.canvas.view.y = y;
		this.canvas.view.scale = {'x':scale, 'y':scale};
	};

	MainView.prototype.getCanvasScale = function() {
		var rect, size, scale, ratio;
		ratio = CanvasLayout.REF_WIDTH/CanvasLayout.REF_HEIGHT;
		rect = {"w":this.game.w - Controls.WIDTH, "h":this.game.h - MainView.TOP_PADDING};
		size = PhaserComponents.Utils.fitRect(rect, ratio);
		scale = size.w / CanvasLayout.REF_WIDTH;
		return Math.max(scale, 0.1);
	};

	MainView.prototype.addCanvas = function() {
		var bounds = {'x':0, 'y':0, 'w':CanvasLayout.REF_WIDTH, 'h':CanvasLayout.REF_HEIGHT};
		this.canvas = new Canvas({"bounds":bounds});
		this.group.add(this.canvas.view);
		this.positionCanvas();
	};
	
	MainView.prototype.addMenu = function() {
		var bounds = {'x':0, 'y':0, 'w':Menu.WIDTH, 'h':Menu.HEIGHT};
		this.menu = new Menu({"bounds":bounds});
		this.group.add(this.menu.view);
	};

	MainView.prototype.removeMenu = function() {
		if(this.menu){
			this.group.remove(this.menu.view);
			this.menu.destroy();
			this.menu = null;
		}
	};
	
	MainView.prototype.removeControls = function() {
		if(this.controls){
			this.world.remove(this.controls.view);
			this.controls.destroy();
			this.controls = null;
		}
	};

	MainView.prototype.positionControls = function() {
		var x, y;
		x = this.game.w - Controls.WIDTH;
		y = 0;
		this.controls.view.x = x;
		this.controls.view.y = y;
	};

	MainView.prototype.onResize = function() {
		this.removeBg();
		this.addBg();
		this.group.sendToBack(this.bg.view);
		this.top.onResize();
		this.positionCanvas();
		this.positionControls();
	};

	MainView.prototype.addControls = function() {
		var bounds = {"x":0, "y":0, "w": Controls.WIDTH, "h":this.game.h};
		this.controls = new Controls({"bounds":bounds});
		this.group.add(this.controls.view);
		this.positionControls();
	};
	
	MainView.prototype.removeMenu = function() {
		if(this.menu){
			this.group.remove(this.menu.view);
			this.menu.destroy();
			this.menu = null;
		}
	};

	MainView.prototype.removeName = function() {
		if(this.nameView){
			this.nameView.destroy();
			this.nameView = null;
		}
	};

	MainView.prototype.removeControls = function() {
		if(this.controls){
			this.group.remove(this.controls.view);
			this.controls.destroy();
			this.controls = null;
		}
	};

	MainView.prototype.destroy = function() {
		this.removeMenu();
		this.removeTop();
		this.removeControls();
		this.removeBg();
		this.removeCanvas();
		this.removeName();
	};
	
	return MainView;

});
	
	



