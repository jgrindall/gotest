
define(['app/game', 'app/components/container', 'app/components/background', 'app/components/slider',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/scenes/activity/colorpicker', 'app/scenes/activity/commandpanels/nsewcommandspanel',

'app/scenes/activity/commmodel', 'app/scenes/activity/colormodel', 'app/scenes/activity/screenmodel', 

'app/scenes/activity/controlmenu', 'app/scenes/activity/commandpanels/abstractcommandspanel',

'app/scenes/activity/speedmodel', 'app/scenes/activity/commspeed',

'app/utils/alertmanager', 'app/components/buttons/menubutton',

'app/scenes/activity/commandspanelfactory'

],

function(Game, Container, Background, Slider,

TabButtonBar, TabButton,

ColorPicker, NSEWCommandsPanel,

commModel, colorModel, screenModel,

ControlMenu, AbstractCommandsPanel,

speedModel, CommSpeed,

AlertManager, MenuButton, CommandsPanelFactory){
	
	"use strict";
	
	var Controls  = function(options){
		Container.call(this, options);
		Game.alertSignal.add(this.onAlert, this);
		screenModel.changeSignal.add(this.screenChanged, this);
	};

	Controls.WIDTH = 290;
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addColorPicker();
		this.addButtons();
		this.addSpeedButton();
	};
	
	Controls.prototype.screenChanged = function(data) {
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
		}
	};
	
	Controls.prototype.enableAllInput = function() {
		if(this.colorPicker){
			this.colorPicker.enableInput();
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
	
	Controls.prototype.addSpeedButton = function() {
		this.speedSlider = new Slider({"model": speedModel, "num":4, "bounds":{"x":Game.w()/2 - 150, "y":0}});
		this.group.add(this.speedSlider.group);
	};
	
	Controls.prototype.menuClick = function(data) {
		var index = data.index;
		if(index === 0){
			commModel.stop();
		}
		else if(index === 1){
			commModel.undo();
		}
		else if(index === 2){
			AlertManager.makeScreenMenu({"page":0, "index":screenModel.getData().screen}, $.proxy(this.onScreenChanged, this));
		}
		else if(index === 3){
			AlertManager.makeScreenMenu({"page":0, "index":screenModel.getData().screen}, $.proxy(this.onScreenChanged, this)); 
		} 
	};
	
	Controls.prototype.onChanged = function(data) {
		screenModel.setData(data.selectedIndex);
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
		this.colorPicker = new ColorPicker({"bounds":bounds, "asset":'pens', "num":8, "model":colorModel});	
		this.group.add(this.colorPicker.sprite);
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
		this.menu.signal.remove(this.menuSelected, this);
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
	
	
