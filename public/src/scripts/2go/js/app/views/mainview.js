

define(['base/views/canvas/canvas', 'base/views/mainviewlayout',

'base/views/controls/controls', 'base/consts/controlslayout',

'base/views/components/menu', 'base/views/img/imgview',

'base/consts/canvaslayout', 'base/views/controls/controltop', 'base/events/events',

'base/views/background', 'phasercomponents', 'base/views/name/nameview',

'base/assets', 'base/consts/showdirections', 'base/models/modelconsts'],

function(Canvas, MainViewLayout,

	Controls, ControlsLayout,

Menu, ImgView,

CanvasLayout, ControlTop, Events,

Background, PhaserComponents, NameView,

Assets, ShowDirections, ModelConsts){
	
	"use strict";
	
	var MainView  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(MainView, PhaserComponents.Display.Container);

	MainView.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.closeHandler = this.removeImg.bind(this);
		this.imgHandler = this.onImgCaptured.bind(this);
		this.hideHandler = this.onHide.bind(this);
		this.eventDispatcher.addListener(Events.IMG_CAPTURED, this.imgHandler);
		this.eventDispatcher.addListener(Events.CLOSE_IMG, this.closeHandler);
		this.eventDispatcher.addListener(Events.HIDE_UI, this.hideHandler);
		if(!this.modelFacade.get(ModelConsts.REPLAYING).get()){
			this.addTopBar();
			this.addControls();
			this.addMenu();
			this.addName();
			this.addTop();
			this.addBrand();
		}
		this.addBg();
		this.addCanvas();
	};

	MainView.prototype.onHide = function(){
		this.controlTop.view.visible = 		false;
		this.brand.visible = 				false;
		this.menu.view.visible = 			false;
		this.controls.view.visible = 		false;
		this.topBar.visible =				false;
		this.topBar.y =						-100;
	};

	MainView.prototype.addImg = function(data) {
		this.imgView = new ImgView(data);
	};

	MainView.prototype.onImgCaptured = function(event, obj){
		this.addImg(obj.data);
	};

	MainView.prototype.removeImg = function() {
		if(this.imgView){
			this.imgView.destroy();
			this.imgView = null;
		}
	};

	MainView.prototype.addTop = function() {
		var bounds = this.bounds;
		this.controlTop = new ControlTop({"bounds":bounds});
		this.group.add(this.controlTop.view);
	};

	MainView.prototype.removeTop = function(){
		if(this.controlTop){
			this.group.remove(this.controlTop.view);
			this.controlTop.destroy();
			this.controlTop = null;
		}
	};

	MainView.prototype.addName = function() {
    	this.nameView = new NameView(this.modelFacade.get(ModelConsts.NAME));
    	$("div#game").append(this.nameView.el);
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

	MainView.prototype.positionBrand = function() {
		if(this.brand){
			this.brand.x = this.game.w - 343;
			this.brand.y = 9;
		}
	};

	MainView.prototype.positionCanvas = function() {
		var pos = MainViewLayout.getCanvasPos(this.game.w, this.game.h);
		this.canvas.view.x = pos.x;
		this.canvas.view.y = pos.y;
		this.canvas.view.scale = {'x':pos.scale, 'y':pos.scale};
	};

	MainView.prototype.addCanvas = function() {
		var bounds = {'x':0, 'y':0, 'w':CanvasLayout.REF_WIDTH, 'h':CanvasLayout.REF_HEIGHT};
		this.canvas = new Canvas({"bounds":bounds});
		this.group.add(this.canvas.view);
		this.positionCanvas();
	};
	
	MainView.prototype.addTopBar = function(){
		this.topBar = new Phaser.TileSprite(this.game, 0, 0, this.game.w, 49, Assets.TOPBAR);
		this.group.add(this.topBar);
	};

	MainView.prototype.removeTopBar = function(){
		if(this.topBar){
			this.group.remove(this.topBar);
			this.topBar.destroy(true);
			this.topBar = null;
		}
	};

	MainView.prototype.addMenu = function() {
		var bounds = {'x':0, 'y':0, 'w':Menu.WIDTH, 'h':Menu.HEIGHT};
		this.menu = new Menu({"bounds":bounds});
		this.group.add(this.menu.view);
		this.showManager.add(this.menu.view, 0, ShowDirections.DOWN);
	};

	MainView.prototype.addBrand = function() {
		this.brand = new Phaser.Sprite(this.game, 0, 0, Assets.BRAND);
		this.group.add(this.brand);
		this.positionBrand();
	};

	MainView.prototype.removeMenu = function() {
		if(this.menu){
			this.group.remove(this.menu.view);
			this.menu.destroy();
			this.menu = null;
		}
	};

	MainView.prototype.removeBrand = function() {
		if(this.brand){
			this.group.remove(this.brand);
			this.brand.destroy();
			this.brand = null;
		}
	};
	
	MainView.prototype.removeControls = function() {
		if(this.controls){
			this.group.remove(this.controls.view);
			this.controls.destroy();
			this.controls = null;
		}
	};

	MainView.prototype.controlsAvailableWidth = function() {
		var availableWidth, scale, left, empty;
		scale = MainViewLayout.getCanvasScale(this.game.w, this.game.h);
		empty = this.game.w - scale*CanvasLayout.REF_WIDTH;
		left = (empty - ControlsLayout.MIN_WIDTH)/2;
		availableWidth = empty - left;
		return availableWidth;
	};

	MainView.prototype.positionControls = function() {
		var x, y, availableWidth, scale;
		if(this.controls){
			scale = MainViewLayout.getCanvasScale(this.game.w, this.game.h);
			availableWidth = this.controlsAvailableWidth();
			x = this.game.w - availableWidth;
			y = 0;
			this.controls.view.x = x;
			this.controls.view.y = y;
			this.controls.bounds.w = availableWidth;
			this.controls.onResize();
		}
	};

	MainView.prototype.onOrient = function() {
		this.redraw();
	};

	MainView.prototype.onResize = function() {
		this.redraw();
	};

	MainView.prototype.redraw = function(){
		this.removeBg();
		this.addBg();
		this.removeTopBar();
		if(!this.modelFacade.get(ModelConsts.REPLAYING).get()){
			this.addTopBar();
			this.controlTop.onResize();
			this.controls.onResize();
			this.group.sendToBack(this.brand);
			this.group.sendToBack(this.topBar);
			this.positionControls();
			this.positionBrand();
		}
		this.group.sendToBack(this.bg.view);
		this.positionCanvas();
	};

	MainView.prototype.addControls = function() {
		var bounds = {"x":0, "y":0, "w": this.controlsAvailableWidth(), "h":this.game.h};
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
		this.eventDispatcher.removeListener(Events.CLOSE_IMG, this.closeHandler);
		this.closeHandler = null;
		this.eventDispatcher.removeListener(Events.IMG_CAPTURED, this.imgHandler);
		this.imgHandler = null;
		this.eventDispatcher.removeListener(Events.HIDE_UI, this.hideHandler);
		this.hideHandler = null;
		this.removeMenu();
		this.removeImg();
		this.removeTop();
		this.removeControls();
		this.removeBg();
		this.removeCanvas();
		this.removeBrand();
		this.removeName();
	};
	
	return MainView;

});
	
	



