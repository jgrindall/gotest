
define(['phasercomponents', 'app/views/components/colorpicker',

'app/views/components/widthpicker', 'app/consts/controlslayout',

'app/models/modelfacade', 'app/consts/colors', 'app/consts/penwidths', 

'app/assets'

],

function(PhaserComponents, ColorPicker,

WidthPicker, ControlsLayout,

ModelFacade, Colors, PenWidths,

Assets){
	
	"use strict";
	
	var ControlsPens  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
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

	ControlsPens.prototype.addColorPicker = function() {
		var bounds = {'x':this.bounds.x + (this.bounds.w - ColorPicker.WIDTH - WidthPicker.WIDTH)/2, 'y':this.game.h - ControlsLayout.PEN_HEIGHT, 'w':ColorPicker.WIDTH, 'h':ControlsLayout.PEN_HEIGHT};
		this.colorPicker = new ColorPicker({"sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PENS, "numSegments":Colors.ALL.length, "numFrames":Colors.ALL.length + 1, "model":ModelFacade.getInstance().get(ModelFacade.COLOR)});	
		this.group.add(this.colorPicker.view);
	};

	ControlsPens.prototype.addWidthPicker = function() {
		var bounds = {'x':this.bounds.x + this.bounds.w - WidthPicker.WIDTH + 10, 'y':this.game.h - WidthPicker.HEIGHT, 'w':WidthPicker.WIDTH, 'h':WidthPicker.HEIGHT};
		this.widthPicker = new WidthPicker({"sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.WIDTHS[1], "numFrames":PenWidths.ALL.length, "model":ModelFacade.getInstance().get(ModelFacade.WIDTH)});	
		this.group.add(this.widthPicker.view);
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
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN);
		this.removeColorPicker();
		this.removeWidthPicker();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ControlsPens;
});
	
	
