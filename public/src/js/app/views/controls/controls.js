
define(['app/views/background',

'phasercomponents', 'app/views/components/colorpicker', 'app/views/components/widthpicker',

'app/models/modelfacade', 'app/consts/colors', 'app/consts/penwidths',

'app/views/controls/controlmenu', 'app/views/commandpanels/abstractcommandspanel',

'app/views/commandpanels/commandspanelfactory', 'app/views/buttons/controlbarbutton',

'app/events/events', 'app/assets', 'app/views/components/speedmarkers'

],

function(Background,

PhaserComponents, ColorPicker, WidthPicker,

ModelFacade, Colors, PenWidths,

ControlMenu, AbstractCommandsPanel,

CommandsPanelFactory, ControlBarButton,

Events, Assets, SpeedMarkers){
	
	"use strict";
	
	var Controls  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		ModelFacade.getInstance().get(ModelFacade.SCREEN).changeSignal.add(this.onScreenChanged, this);
		ModelFacade.getInstance().get(ModelFacade.PROG).changeSignal.add(this.onScreenChanged, this);
		ModelFacade.getInstance().get(ModelFacade.ALLOW_PROG).changeSignal.add(this.onProgAllowedChanged, this);
	};

	Controls.WIDTH = 320;
	
	PhaserComponents.Utils.extends(Controls, PhaserComponents.Display.Container);

	Controls.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
		this.addColorPicker();
		this.addWidthPicker();
		this.addButtons();
		this.addSpeedSlider();
		this.addSpeedMarkers();
		this.addControlBar();
	};

	Controls.prototype.onProgAllowedChanged = function(value) {
		this.controlBar.group.visible = (value === 1);
	};

	Controls.prototype.onScreenChanged = function() {
		this.addCommandsPanel();
	};
	
	Controls.prototype.onAlert = function(event, data) {
		if(data.shown){
			this.disableInput();
		}
		else{
			this.enableInput();
		}
	};
	
	Controls.prototype.disableInput = function() {
		if(this.colorPicker){
			this.colorPicker.disableInput();
			this.speedSlider.disableInput();
			this.menu.disableInput();
		}
	};
	
	Controls.prototype.enableInput = function() {
		if(this.colorPicker){
			this.colorPicker.enableInput();
			this.speedSlider.enableInput();
			this.menu.enableInput();
		}
	};
	
	Controls.prototype.addBg = function() {
		var w, h, bounds;
		w = this.game.w;
		h = this.game.h;
		bounds = {'x':this.bounds.x, 'y':0, 'w':this.bounds.w, 'h':h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.group.add(this.bg.sprite);
	};

	Controls.prototype.addControlBar = function() {
		var options, bounds;
		bounds = {'x':this.bounds.x, 'y':this.bounds.y + this.bounds.h - ColorPicker.HEIGHT - 50, 'w':this.bounds.w, 'h':50};
		options = {"bounds":bounds, "numX":4, "performSelect":true, "numY":1, "buttonClass":ControlBarButton, "data":[{'num':0}, {'num':1}, {'num':2}, {'num':3}]};
		this.controlBar = new PhaserComponents.Display.ButtonBar(options);
		this.controlBar.clickSignal.add(this.barClick, this);
		this.group.add(this.controlBar.group);
		this.controlBar.group.visible = (ModelFacade.getInstance().get(ModelFacade.ALLOW_PROG).get() === 1);
	};

	Controls.prototype.barClick = function(data) {
		var val = data.index;
		this.eventDispatcher.trigger({"type":Events.PROG_CHANGE, "data":{"value":val}});
	};

	Controls.prototype.addButtons = function() {
		var bounds = {'x':this.game.w - ControlMenu.WIDTH, 'y':this.bounds.y, 'w':ControlMenu.WIDTH, 'h':ControlMenu.HEIGHT};
		this.menu = new ControlMenu({"bounds":bounds});
		this.menu.clickSignal.add(this.menuClick, this);
		this.group.add(this.menu.group);
	};
	
	Controls.prototype.addSpeedMarkers = function() {
		this.speedMarkers = new SpeedMarkers({"bounds":this.speedSlider.bounds, "asset":Assets.SPEEDDECOR});
		this.speedMarkers.clickSignal.add(this.clickMarker, this);
		this.group.add(this.speedMarkers.group);
	};

	Controls.prototype.clickMarker = function(data) {
		if(data.index === 0){
			this.speedSlider.toMin();
		}
		else if(data.index === 1){
			this.speedSlider.toMax();
		}
	};

	Controls.prototype.addSpeedSlider = function() {
		var options = {"sfx":Assets.SOUNDS[1],"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": ModelFacade.getInstance().get(ModelFacade.SPEED), "num":4, "bounds":{"x":this.game.w/2 - 120, "y":0, "w":PhaserComponents.Display.Slider.WIDTH, "h":PhaserComponents.Display.Slider.HEIGHT}};
		this.speedSlider = new PhaserComponents.Display.Slider(options);
		this.group.add(this.speedSlider.group);
	};
	
	Controls.prototype.menuClick = function(data) {
		var index = data.index;
		if(index === 0){
			this.eventDispatcher.trigger({"type":Events.STOP});
		}
		else if(index === 1){
			this.eventDispatcher.trigger({"type":Events.UNDO});
		}
		else if(index === 2){
			this.eventDispatcher.trigger({"type":Events.TYPE_CHOICE});
		}
		else if(index === 3){
			this.eventDispatcher.trigger({"type":Events.GRID_CHOICE});
		} 
	};
	
	Controls.prototype.removeCommandsPanel = function() {
		if(this.commandsPanel){
			this.group.remove(this.commandsPanel.group);
			this.commandsPanel.destroy();
			this.commandsPanel = null;
		}
	};

	Controls.prototype.addCommandsPanel = function() {
		var bounds, type, prog;
		this.removeCommandsPanel();
		type = ModelFacade.getInstance().get(ModelFacade.SCREEN).get();
		prog = ModelFacade.getInstance().get(ModelFacade.PROG).get();
		console.log("PROG "+prog);
		bounds = {'x':this.bounds.x, 'y':50, 'w':this.bounds.w, 'h':this.bounds.h - 50};
		this.commandsPanel = CommandsPanelFactory.make(type, prog, bounds);
		if(this.commandsPanel){
			this.group.add(this.commandsPanel.group);
		}
	};

	Controls.prototype.addColorPicker = function() {
		var bounds = {'x':this.bounds.x + (this.bounds.w - ColorPicker.WIDTH - WidthPicker.WIDTH)/2, 'y':this.game.h - ColorPicker.HEIGHT, 'w':ColorPicker.WIDTH, 'h':ColorPicker.HEIGHT};
		this.colorPicker = new ColorPicker({"sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.PENS, "numSegments":Colors.ALL.length, "numFrames":Colors.ALL.length + 1, "model":ModelFacade.getInstance().get(ModelFacade.COLOR)});	
		this.group.add(this.colorPicker.sprite);
	};

	Controls.prototype.addWidthPicker = function() {
		var bounds = {'x':this.bounds.x + this.bounds.w - WidthPicker.WIDTH, 'y':this.game.h - WidthPicker.HEIGHT, 'w':WidthPicker.WIDTH, 'h':WidthPicker.HEIGHT};
		this.widthPicker = new WidthPicker({"sfx":Assets.SOUNDS[1], "bounds":bounds, "asset":Assets.WIDTHS[1], "numFrames":PenWidths.ALL.length, "model":ModelFacade.getInstance().get(ModelFacade.WIDTH)});	
		this.group.add(this.widthPicker.sprite);
	};
	
	Controls.prototype.destroy = function() {
		this.bg.destroy();
		ModelFacade.getInstance().get(ModelFacade.SCREEN).changeSignal.remove(this.onScreenChanged, this);
		ModelFacade.getInstance().get(ModelFacade.PROG).changeSignal.remove(this.onScreenChanged, this);
		ModelFacade.getInstance().get(ModelFacade.ALLOW_PROG).changeSignal.remove(this.onProgAllowedChanged, this);
		this.colorPicker.destroy();
		this.widthPicker.destroy();
		this.speedSlider.destroy();
		this.speedMarkers.clickSignal.remove(this.clickMarker, this);
		this.group.remove(this.speedMarkers.group);
		this.speedMarkers.destroy();
		this.menu.clickSignal.remove(this.menuClick, this);
		this.menu.destroy();
		this.bg = null;
		this.colorPicker = null;
		this.menu = null;
		this.removeCommandsPanel();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Controls;
});
	
	
