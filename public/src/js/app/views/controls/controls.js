
define('app/views/controls/controls',['app/game', 'app/components/container', 'app/components/background',

	'app/components/slider/slider',

'app/components/buttongrid/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/views/components/colorpicker', 'app/views/components/widthpicker',

'app/models/modelfacade',

'app/views/controls/controlmenu', 'app/views/commandpanels/abstractcommandspanel',

'app/views/commandpanels/commandspanelfactory',

'app/events/eventdispatcher', 'app/events/events'

],

function(Game, Container, Background, Slider,

TabButtonBar, TabButton,

ColorPicker, WidthPicker,

ModelFacade,

ControlMenu, AbstractCommandsPanel,

CommandsPanelFactory,

eventDispatcher, Events){
	
	"use strict";
	
	var Controls  = function(options){
		Container.call(this, options);
		Game.alertSignal.add(this.onAlert, this);
		ModelFacade.getInstance().get(ModelFacade.SCREEN).changeSignal.add(this.onScreenChanged, this);
	};

	Controls.WIDTH = 290;
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addColorPicker();
		this.addWidthPicker();
		this.addButtons();
		this.addSpeedSlider();
	};
	
	Controls.prototype.onScreenChanged = function(data) {
		this.addCommandsPanel(data.screen);
		// and load the data
	};
	
	Controls.prototype.onAlert = function(data) {
		if(data.show){
			this.disableAllInput();
		}
		else{
			this.enableAllInput();
		}
	};
	
	Controls.prototype.disableAllInput = function() {
		if(this.colorPicker){
			this.colorPicker.disableInput();
			this.speedSlider.disableInput();
		}
	};
	
	Controls.prototype.enableAllInput = function() {
		if(this.colorPicker){
			this.colorPicker.enableInput();
			this.speedSlider.enableInput();
		}
	};
	
	Controls.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':this.bounds.x, 'y':0, 'w':this.bounds.w, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.group.add(this.bg.sprite);
	};
	
	Controls.prototype.addButtons = function() {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':300, 'h':50};
		this.menu = new ControlMenu({"num":4, "bounds":bounds});
		this.menu.clickSignal.add(this.menuClick, this);
		this.group.add(this.menu.group);
	};
	
	Controls.prototype.addSpeedSlider = function() {
		this.speedSlider = new Slider({"model": ModelFacade.getInstance().get(ModelFacade.SPEED), "num":4, "bounds":{"x":Game.w()/2 - 150, "y":0}});
		this.group.add(this.speedSlider.group);
	};
	
	Controls.prototype.menuClick = function(data) {
		var index = data.index;
		if(index === 0){
			eventDispatcher.trigger({"type":Events.STOP});
		}
		else if(index === 1){
			eventDispatcher.trigger({"type":Events.UNDO});
		}
		else if(index === 2){
			eventDispatcher.trigger({"type":Events.TEACHER_LOGIN});
		}
		else if(index === 3){
			eventDispatcher.trigger({"type":Events.TYPE_CHOICE});
		}
		else if(index === 4){
			eventDispatcher.trigger({"type":Events.GRID_CHOICE});
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
		var bounds = {'x':this.bounds.x + (this.bounds.w - ColorPicker.WIDTH)/2, 'y':Game.h() - ColorPicker.HEIGHT, 'w':ColorPicker.WIDTH, 'h':ColorPicker.HEIGHT};
		this.colorPicker = new ColorPicker({"bounds":bounds, "asset":'pens', "num":8, "model":ModelFacade.getInstance().get(ModelFacade.COLOR)});	
		this.group.add(this.colorPicker.sprite);
	};

	Controls.prototype.addWidthPicker = function() {
		var bounds = {'x':this.bounds.x + this.bounds.w - WidthPicker.WIDTH, 'y':Game.h() - WidthPicker.HEIGHT, 'w':WidthPicker.WIDTH, 'h':WidthPicker.HEIGHT};
		this.widthPicker = new WidthPicker({"bounds":bounds, "asset":'width', "num":5, "model":ModelFacade.getInstance().get(ModelFacade.WIDTH)});	
		this.group.add(this.widthPicker.sprite);
	};
	
	Controls.prototype.addTabs = function() {
		var bounds = {'x':this.bounds.x, 'y':5, 'w':600, 'h':50};
		this.tabButtonBar = new TabButtonBar({"bounds":bounds, "buttonClass":TabButton, "numX":3, "numY":1});
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
		Container.prototype.destroy.call(this);
	};
	
	return Controls;
});
	
	