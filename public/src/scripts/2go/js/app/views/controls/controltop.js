
define(['phasercomponents', 

'base/consts/showdirections', 'base/consts/commspeed',

'base/views/controls/controlmenu', 'base/models/modelconsts',

'base/assets', 'base/views/components/speedmarkers'

],

function(PhaserComponents,

ShowDirections, CommSpeed,

ControlMenu, ModelConsts,

Assets, SpeedMarkers){
	
	"use strict";
	
	var ControlTop  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.alertHandler = this.onAlert.bind(this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.alertHandler);
	};
	
	ControlTop.SPEED_SLIDER_WIDTH = 210;
	ControlTop.SPEED_SLIDER_HEIGHT = 40;

	PhaserComponents.Utils.extends(ControlTop, PhaserComponents.Display.Container);

	ControlTop.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMenu();
		this.addSpeedSlider();
		this.addSpeedMarkers();
	};
	
	ControlTop.prototype.onAlert = function(event, data) {
		if(data.shown){
			this.disableInput();
		}
		else{
			this.enableInput();
		}
	};
	
	ControlTop.prototype.disableInput = function() {
		if(this.speedSlider){
			this.speedSlider.disableInput();
		}
		if(this.menu){
			this.menu.disableInput();
		}
		if(this.speedMarkers){
			this.speedMarkers.disableInput();
		}
	};
	
	ControlTop.prototype.enableInput = function() {
		if(this.speedSlider){
			this.speedSlider.enableInput();
		}
		if(this.menu){
			this.menu.enableInput();
		}
		if(this.speedMarkers){
			this.speedMarkers.enableInput();
		}
	};

	ControlTop.prototype.positionMarkers = function() {
		var x, y = 3;
		x = this.game.w/2 - this.speedSlider.bounds.w/2 - 53;
		this.speedMarkers.view.x = x;
		this.speedMarkers.view.y = y;
	};

	ControlTop.prototype.positionSpeed = function() {
		var x, y = 3;
		x = this.game.w/2 - this.speedSlider.bounds.w/2 - 53;
		this.speedSlider.view.x = x;
		this.speedSlider.view.y = y;
	};

	ControlTop.prototype.positionMenu = function() {
		var x, y;
		x = this.game.w - ControlMenu.WIDTH;
		y = this.bounds.y;
		this.menu.view.x = x;
		this.menu.view.y = y;
	};

	ControlTop.prototype.onResize = function() {
		this.positionMenu();
		this.positionSpeed();
		this.positionMarkers();
	};

	ControlTop.prototype.addMenu = function() {
		var bounds = {'x':0, 'y':0, 'w':ControlMenu.WIDTH, 'h':ControlMenu.HEIGHT};
		this.menu = new ControlMenu({"bounds":bounds});
		this.group.add(this.menu.view);
		this.positionMenu();
		this.showManager.add(this.menu.view, 2, ShowDirections.DOWN);
	};
	
	ControlTop.prototype.addSpeedMarkers = function() {
		var bounds = {"x":0, "y":0, "w":ControlTop.SPEED_SLIDER_WIDTH, "h":ControlTop.SPEED_SLIDER_HEIGHT};
		this.speedMarkers = new SpeedMarkers({"bounds":bounds, "asset":Assets.SPEEDDECOR});
		this.speedMarkers.clickSignal.add(this.clickMarker, this);
		this.group.add(this.speedMarkers.view);
		this.positionMarkers();
		this.showManager.add(this.speedMarkers.view, 1, ShowDirections.DOWN);
	};

	ControlTop.prototype.clickMarker = function(data) {
		if(data.index === 0){
			this.speedSlider.toMin();
		}
		else if(data.index === 1){
			this.speedSlider.toMax();
		}
	};

	ControlTop.prototype.addSpeedSlider = function() {
		var options, bounds;
		bounds = {"x":0, "y":0, "w":ControlTop.SPEED_SLIDER_WIDTH, "h":ControlTop.SPEED_SLIDER_HEIGHT};
		options = {"sfx":Assets.SOUNDS[1],"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": this.modelFacade.get(ModelConsts.SPEED), "num":CommSpeed.ALL.length - 1, "bounds":bounds};
		options.handleSize = {'w':40, 'h':40};
		this.speedSlider = new PhaserComponents.Display.Slider(options);
		this.group.add(this.speedSlider.view);
		this.positionSpeed();
		this.showManager.add(this.speedSlider.view, 1, ShowDirections.DOWN);
	};

	ControlTop.prototype.removeSpeedSlider = function(){
		if(this.speedSlider){
			this.group.remove(this.speedSlider.view);
			this.speedSlider.destroy();
			this.speedSlider = null;
		}
	};
	
	ControlTop.prototype.removeSpeedMarkers = function(){
		if(this.speedMarkers){
			this.speedMarkers.clickSignal.remove(this.clickMarker, this);
			this.group.remove(this.speedMarkers.view);
			this.speedMarkers.destroy();
			this.speedMarkers = null;
		}
	};

	ControlTop.prototype.removeMenu = function(){
		if(this.menu){
			this.group.remove(this.menu.view);
			this.menu.destroy();
			this.menu = null;
		}
	};

	ControlTop.prototype.destroy = function() {
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.alertHandler);
		this.removeMenu();
		this.removeSpeedSlider();
		this.removeSpeedMarkers();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ControlTop;
});
	
	
