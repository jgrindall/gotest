
define(['phasercomponents', 'base/views/components/colorpicker',

'base/views/components/widthpicker2',

'base/consts/controlslayout',

'base/consts/colors',

'base/assets', 'base/models/modelconsts'

],

function(PhaserComponents, ColorPicker,

WidthPicker2,

ControlsLayout,

Colors, 

Assets, ModelConsts){
	
	"use strict";
	
	var ControlsPens  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.alertHandler = this.onAlert.bind(this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.alertHandler);
	};

	ControlsPens.WIDTH = 320;

	PhaserComponents.Utils.extends(ControlsPens, PhaserComponents.Display.Container);

	ControlsPens.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addColorPicker();
		this.addWidthPicker();
	};

	ControlsPens.prototype.onAlert = function(event, data) {
		if(data.shown){
			this.disableInput();
		}
		else{
			this.enableInput();
		}
	};
	
	ControlsPens.prototype.disableInput = function() {
		if(this.colorPicker){
			this.colorPicker.disableInput();
		}
		if(this.widthPicker){
			this.widthPicker.disableInput();
		}
	};
	
	ControlsPens.prototype.enableInput = function() {
		if(this.colorPicker){
			this.colorPicker.enableInput();
		}
		if(this.widthPicker){
			this.widthPicker.enableInput();
		}
	};

	ControlsPens.prototype.positionColorPicker = function() {
		var x, y;
		x = this.bounds.x + (this.bounds.w - ColorPicker.WIDTH)/2;
		y = this.game.h - ControlsLayout.PEN_HEIGHT;
		this.colorPicker.view.x = Math.max(x, 0);
		this.colorPicker.view.y = y;
	};

	ControlsPens.prototype.positionWidthPicker = function() {
		var x, y;
		x = this.bounds.x + (this.bounds.w - ColorPicker.WIDTH)/2;
		y = this.game.h - ControlsLayout.PEN_HEIGHT - 42;
		this.widthPicker.view.x = Math.max(x, 0);
		this.widthPicker.view.y = y;
	};
	
	ControlsPens.prototype.onResize = function() {
		this.positionColorPicker();
		this.positionWidthPicker();
	};

	ControlsPens.prototype.addColorPicker = function() {
		var bounds = {'x':0, 'y':0, 'w':ColorPicker.WIDTH, 'h':ControlsLayout.PEN_HEIGHT};
		this.colorPicker = new ColorPicker({"sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PENS, "numSegments":Colors.ALL.length, "numFrames":Colors.ALL.length + 1, "model":this.modelFacade.get(ModelConsts.COLOR)});	
		this.group.add(this.colorPicker.view);
		this.positionColorPicker();
	};
	
	ControlsPens.prototype.addWidthPicker = function() {
		var options, bounds;
		bounds = {"x":0, "y":0, "w":WidthPicker2.WIDTH, "h":WidthPicker2.HEIGHT};
		options = {"sfx":Assets.SOUNDS[1], "model": this.modelFacade.get(ModelConsts.WIDTH), "bounds":bounds};
		this.widthPicker = new WidthPicker2(options);
		this.group.add(this.widthPicker.view);
		this.positionWidthPicker();
	};

	ControlsPens.prototype.removeColorPicker = function() {
		if(this.colorPicker){
			this.group.remove(this.colorPicker.view);
			this.colorPicker.destroy();
			this.colorPicker = null;
		}
	};

	ControlsPens.prototype.removeWidthPicker = function() {
		if(this.widthPicker){
			this.group.remove(this.widthPicker.view);
			this.widthPicker.destroy();
			this.widthPicker = null;
		}
	};

	ControlsPens.prototype.destroy = function() {
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.alertHandler);
		this.removeColorPicker();
		this.removeWidthPicker();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ControlsPens;
});
	
	
