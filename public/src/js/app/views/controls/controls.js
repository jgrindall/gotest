
define('app/views/controls/controls',[ 'app/components/background',

'phasercomponents', 'app/components/buttons/tabbutton',

'app/views/components/colorpicker', 'app/views/components/widthpicker',

'app/models/modelfacade',

'app/views/controls/controlmenu', 'app/views/commandpanels/abstractcommandspanel',

'app/views/commandpanels/commandspanelfactory',

'app/events/events', 'app/assets'

],

function(Background,

PhaserComponents, TabButton,

ColorPicker, WidthPicker,

ModelFacade,

ControlMenu, AbstractCommandsPanel,

CommandsPanelFactory,

Events, Assets){
	
	"use strict";
	
	var Controls  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		ModelFacade.getInstance().get(ModelFacade.SCREEN).changeSignal.add(this.onScreenChanged, this);
	};

	Controls.WIDTH = 290;
	
	PhaserComponents.Utils.extends(Controls, PhaserComponents.Display.Container);

	Controls.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
		this.addColorPicker();
		this.addWidthPicker();
		this.addButtons();
		this.addSpeedSlider();
	};

	Controls.prototype.onScreenChanged = function(value) {
		this.addCommandsPanel(value);
		// TODO - Load the data from before
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
	
	Controls.prototype.addButtons = function() {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':300, 'h':50};
		this.menu = new ControlMenu({"bounds":bounds});
		this.menu.clickSignal.add(this.menuClick, this);
		this.group.add(this.menu.group);
	};
	
	Controls.prototype.addSpeedSlider = function() {
		this.speedSlider = new PhaserComponents.Display.Slider({"handleAsset":Assets.SLIDERHANDLE, "model": ModelFacade.getInstance().get(ModelFacade.SPEED), "num":4, "bounds":{"x":this.game.w/2 - 150, "y":0}});
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
			this.eventDispatcher.trigger({"type":Events.TEACHER_LOGIN});
		}
		else if(index === 3){
			this.eventDispatcher.trigger({"type":Events.TYPE_CHOICE});
		}
		else if(index === 4){
			this.eventDispatcher.trigger({"type":Events.GRID_CHOICE});
		} 
	};
	
	Controls.prototype.addCommandsPanel = function(type) {
		if(this.commandsPanel){
			this.commandsPanel.destroy();
			this.commandsPanel = null;
		}
		var bounds = {'x':this.bounds.x + (this.bounds.w - AbstractCommandsPanel.WIDTH)/2, 'y':50, 'w':AbstractCommandsPanel.WIDTH, 'h':this.bounds.h - 50};
		this.commandsPanel = CommandsPanelFactory.make(type, bounds);
		this.group.add(this.commandsPanel.group);
	};
	
	Controls.prototype.addColorPicker = function() {
		var bounds = {'x':this.bounds.x + (this.bounds.w - ColorPicker.WIDTH)/2, 'y':this.game.h - ColorPicker.HEIGHT, 'w':ColorPicker.WIDTH, 'h':ColorPicker.HEIGHT};
		this.colorPicker = new ColorPicker({"bounds":bounds, "asset":Assets.PENS, "num":8, "model":ModelFacade.getInstance().get(ModelFacade.COLOR)});	
		this.group.add(this.colorPicker.sprite);
	};

	Controls.prototype.addWidthPicker = function() {
		var bounds = {'x':this.bounds.x + this.bounds.w - WidthPicker.WIDTH, 'y':this.game.h - WidthPicker.HEIGHT, 'w':WidthPicker.WIDTH, 'h':WidthPicker.HEIGHT};
		this.widthPicker = new WidthPicker({"bounds":bounds, "asset":Assets.WIDTH, "num":5, "model":ModelFacade.getInstance().get(ModelFacade.WIDTH)});	
		this.group.add(this.widthPicker.sprite);
	};
	
	Controls.prototype.addTabs = function() {
		var bounds = {'x':this.bounds.x, 'y':5, 'w':600, 'h':50};
		this.tabButtonBar = new PhaserComponents.Display.TabButtonBar({"bounds":bounds, "buttonClass":TabButton, "numX":3, "numY":1});
		this.group.add(this.tabButtonBar.group);
		this.tabButtonBar.select(0);
	};
	
	Controls.prototype.destroy = function() {
		this.bg.destroy();
		this.colorPicker.destroy();
		this.widthPicker.destroy();
		this.speedSlider.destroy();
		this.menu.clickSignal.remove(this.menuClick, this);
		this.menu.destroy();
		this.bg = null;
		this.colorPicker = null;
		this.menu = null;
		if(this.commandsPanel){
			this.commandsPanel.destroy();
			this.commandsPanel = null;
		}
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Controls;
});
	
	
