
define(['app/game', 'app/components/container', 'app/components/background', 'app/components/slider',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/scenes/activity/colorpicker', 'app/scenes/activity/commandpanels/nsewcommandspanel',

'app/scenes/activity/commmodel', 'app/scenes/activity/colormodel', 'app/scenes/activity/layoutmodel', 

'app/scenes/activity/controlmenu',

'app/scenes/activity/speedmodel', 'app/scenes/activity/commspeed',

'app/utils/alertmanager', 'app/components/buttons/menubutton',

'app/scenes/activity/commandspanelfactory'

],

function(Game, Container, Background, Slider,

TabButtonBar, TabButton,

ColorPicker, NSEWCommandsPanel,

commModel, colorModel, layoutModel,

ControlMenu,

speedModel, CommSpeed,

AlertManager, MenuButton, CommandsPanelFactory){
	
	"use strict";
	
	var Controls  = function(options){
		Container.call(this, options);
		Game.alertSignal.add($.proxy(this.onAlert, this));
		layoutModel.changeSignal.add(this.typeChanged, this);
	};

	Controls.WIDTH = 400;
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.typeChanged = function(data) {
		this.addCommandsPanel(data.type);
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
		this.colorPicker.disableInput();
	};
	
	Controls.prototype.enableAllInput = function() {
		this.colorPicker.enableInput();
	};
	
	Controls.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':this.bounds.x, 'y':0, 'w':w/2, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.group.add(this.bg.sprite);
	};
	
	Controls.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addColorPicker();
		this.addButtons();
		this.addSpeedButton();
	};
	
	Controls.prototype.addButtons = function() {
		var bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':300, 'h':50};
		this.menu = new ControlMenu({"num":4, "bounds":bounds});
		this.menu.signal.add(this.menuSelected, this);
		this.group.add(this.menu.group);
	};
	
	Controls.prototype.addSpeedButton = function() {
		this.speedSlider = new Slider({"model": speedModel, "num":4, "bounds":{"x":Game.w()/2 - 150, "y":0}});
		this.group.add(this.speedSlider.group);
	};
	
	Controls.prototype.menuSelected = function(data) {
		var i = data.index;
		if(i === 0){
			commModel.stop();
		}
		else if(i === 1){
			commModel.undo();
		}
		else if(i === 2){
			AlertManager.makeScreenMenu($.proxy(this.onChanged, this));
		}
		else if(i === 3){
			AlertManager.makeScreenMenu($.proxy(this.onChanged, this)); 
		} 
	};
	
	Controls.prototype.onChanged = function(data) {
		layoutModel.setType(data.selectedIndex);
	};
	
	Controls.prototype.addCommandsPanel = function(type) {
		if(this.commandsPanel){
			this.commandsPanel.destroy();
			this.commandsPanel = null;
		}
		var bounds = {'x':this.bounds.x, 'y':50, 'w':this.bounds.w, 'h':this.bounds.h - 50};
		this.commandsPanel = CommandsPanelFactory.make(type, bounds);
		this.group.add(this.commandsPanel.group);
	};
	
	Controls.prototype.addColorPicker = function() {
		var bounds = {'x':this.bounds.x, 'y':Game.h() - ColorPicker.HEIGHT, 'w':ColorPicker.WIDTH, 'h':ColorPicker.HEIGHT};
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
		Controls.prototype.destroy.call(this);
		this.bg.destroy();
		this.tabButtonBar.destroy();
	};
	
	return Controls;
});
	
	
