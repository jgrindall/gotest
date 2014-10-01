
define(['jquery', 'app/views/canvas/canvas', 'app/views/controls/controls',

'app/views/components/menu', 'app/models/modelfacade', 'app/consts/canvaslayout',

'app/views/background', 'phasercomponents', 'app/views/name/nameview',

'app/events/events', 'app/assets', 'app/views/popups/tooltipmanager'],

function($, Canvas, Controls,

Menu, ModelFacade, CanvasLayout,

Background, PhaserComponents, NameView,

Events, Assets, ToolTipManager){
	
	"use strict";
	
	var MainView  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(MainView, PhaserComponents.Display.Container);

	MainView.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
		this.addCanvas();
		this.addControls();
		this.addMenu();
		this.addName();
	};

	MainView.prototype.addName = function() {
    	this.nameView = new NameView(ModelFacade.getInstance().get(ModelFacade.NAME));
    	$("#"+this.game.parent).append(this.nameView.el);
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

	MainView.prototype.getCanvasSize = function() {
		var rect, size, scale, ratio;
		ratio = CanvasLayout.REF_WIDTH/CanvasLayout.REF_HEIGHT;
		rect = {"w":this.game.w - Controls.WIDTH, "h":this.game.h - 50};
		size = PhaserComponents.Utils.fitRect(rect, ratio);
		scale = size.w / CanvasLayout.REF_WIDTH;
		return size;
	};

	MainView.prototype.addCanvas = function() {
		var scale, x, y, xtimesscale, ytimesscale, bounds, size;
		size = this.getCanvasSize();
		scale = size.w/CanvasLayout.REF_WIDTH;
		xtimesscale = (this.game.w - Controls.WIDTH - CanvasLayout.REF_WIDTH * scale)/2;
		ytimesscale = 50 + (this.game.h - CanvasLayout.REF_HEIGHT * scale - 50)/2;
		x = xtimesscale / scale;
		y = ytimesscale / scale;
		bounds = {'x':x, 'y':y, 'w':CanvasLayout.REF_WIDTH, 'h':CanvasLayout.REF_HEIGHT};
		bounds = {'x':50, 'y':50, 'w':CanvasLayout.REF_WIDTH, 'h':CanvasLayout.REF_HEIGHT};
		scale = 1;
		this.canvas = new Canvas({"bounds":bounds, "scale":scale});
		CanvasLayout.bounds = bounds;
		CanvasLayout.scale = scale;
		this.group.add(this.canvas.view);
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

	MainView.prototype.onResize = function() {
		this.removeBg();
		this.removeControls();
		this.removeCanvas();
		this.removeMenu();
		this.addBg();
		this.addControls();
		this.addCanvas();
		this.addMenu();
	};

	MainView.prototype.addControls = function() {
		var bounds = {"x":this.game.w - Controls.WIDTH, "y":0, "w": Controls.WIDTH, "h":this.game.h};
		this.controls = new Controls({"bounds":bounds});
		this.group.add(this.controls.view);
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
		this.removeControls();
		this.removeBg();
		this.removeCanvas();
		this.removeName();
	};
	
	return MainView;

});
	
	



