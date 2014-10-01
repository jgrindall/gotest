
define(['phasercomponents', 

'app/models/modelfacade', 

'app/views/controls/controlmenu', 

'app/events/events', 'app/assets', 'app/views/components/speedmarkers'

],

function(PhaserComponents,

ModelFacade,

ControlMenu, 

Events, Assets, SpeedMarkers){
	
	"use strict";
	
	var ControlTop  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
	};

	ControlTop.WIDTH = 320;
	
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

	ControlTop.prototype.addMenu = function() {
		var bounds = {'x':this.game.w - ControlMenu.WIDTH, 'y':this.bounds.y, 'w':ControlMenu.WIDTH, 'h':ControlMenu.HEIGHT};
		this.menu = new ControlMenu({"bounds":bounds});
		this.group.add(this.menu.view);
	};
	
	ControlTop.prototype.addSpeedMarkers = function() {
		this.speedMarkers = new SpeedMarkers({"bounds":this.speedSlider.bounds, "asset":Assets.SPEEDDECOR});
		this.speedMarkers.clickSignal.add(this.clickMarker, this);
		this.group.add(this.speedMarkers.view);
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
		bounds = {"x":this.game.w/2 - PhaserComponents.Display.Slider.WIDTH/2, "y":0, "w":PhaserComponents.Display.Slider.WIDTH, "h":PhaserComponents.Display.Slider.HEIGHT};
		options = {"sfx":Assets.SOUNDS[1],"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": ModelFacade.getInstance().get(ModelFacade.SPEED), "num":4, "bounds":bounds};
		this.speedSlider = new PhaserComponents.Display.Slider(options);
		this.group.add(this.speedSlider.view);
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
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN);
		this.removeMenu();
		this.removeSpeedSlider();
		this.removeSpeedMarkers();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ControlTop;
});
	
	
