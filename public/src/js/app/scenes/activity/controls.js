
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/components/buttons/multibutton', 'app/scenes/activity/commands/nsewcommandspanel',

'app/scenes/activity/commmodel', 'app/scenes/activity/colormodel', 'app/utils/alertmanager', 'app/components/buttons/menubutton',

'app/scenes/activity/commandspanelfactory'

],

function(Game, Container, Background,

TabButtonBar, TabButton,

MultiButton, NSEWCommandsPanel,

commModel, colorModel, AlertManager, MenuButton, CommandsPanelFactory){
	
	"use strict";
	
	var Controls  = function(options){
		Container.call(this, options);
		Game.alertSignal.add($.proxy(this.onAlert, this));
		commModel.typeSignal.add(this.typeChanged, this);
	};

	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.typeChanged = function(data) {
		this.addCommandsPanel(data.type);
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
		//this.addTabs();
		this.addColorPicker();
		this.addChangeButton();
	};
	
	Controls.prototype.addChangeButton = function() {
		this.changeButton = new MenuButton({"bounds":{"x":Game.w()/2, "y":0}});
		this.changeButton.mouseUpSignal.add(this.changeButtonClicked, this);
		this.group.add(this.changeButton.sprite);
	};
	
	Controls.prototype.onChanged = function(data) {
		commModel.setType(data.selectedIndex);
	};
	
	Controls.prototype.changeButtonClicked = function(data) {
		AlertManager.makeScreenMenu($.proxy(this.onChanged, this));
	};
	
	Controls.prototype.addCommandsPanel = function(type) {
		if(this.commandsPanel){
			this.commandsPanel.destroy();
			this.commandsPanel = null;
		}
		var bounds = {'x':this.bounds.x, 'y':40, 'w':300, 'h':300};
		this.commandsPanel = CommandsPanelFactory.make(type, bounds);
		this.group.add(this.commandsPanel.group);
	};
	
	Controls.prototype.addColorPicker = function() {
		var bounds = {'x':500, 'y':500, 'w':137, 'h':66};
		this.colorPicker = new MultiButton({"bounds":bounds, "asset":'pens', "num":8});
		this.colorPicker.mouseUpSignal.add(this.colorChosen, this);
		this.group.add(this.colorPicker.sprite);
	};
	
	Controls.prototype.colorChosen = function(data) {
		colorModel.setColor(data.num);
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
	
	
