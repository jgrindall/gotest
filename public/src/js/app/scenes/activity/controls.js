
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/components/buttons/multibutton', 'app/scenes/activity/commandspanel',

'app/scenes/activity/commmodel'

],

function(Game, Container, Background,

TabButtonBar, TabButton,

MultiButton, CommandsPanel,

commModel){
	
	"use strict";
	
	var Controls  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.getWidth();
		h = Game.getHeight();
		bounds = {'x':this.bounds.x, 'y':0, 'w':w/2, 'h':h};
		this.bg = new Background({"asset":'sky', "bounds":bounds});
		this.bg.create();
		this.group.add(this.bg.sprite);
	};
	
	Controls.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addBg();
		this.addTabs();
		this.addColorPicker();
		this.addCommandsPanel();
	};
	
	Controls.prototype.addCommandsPanel = function() {
		var bounds = {'x':this.bounds.x, 'y':40, 'w':300, 'h':300};
		this.commandsPanel = new CommandsPanel({"bounds":bounds});
		this.group.add(this.commandsPanel.group);
	};
	
	Controls.prototype.addColorPicker = function() {
		var bounds = {'x':this.bounds.x, 'y':450, 'w':137, 'h':66};
		this.colorPicker = new MultiButton({"bounds":bounds, "asset":'pens', "num":8});
		this.colorPicker.mouseUpSignal.add(this.colorChosen, this);
		this.group.add(this.colorPicker.sprite);
	};
	
	Controls.prototype.colorChosen = function(data) {
		commModel.setColor(data.num);
	};
	
	Controls.prototype.addTabs = function() {
		var bounds = {'x':this.bounds.x, 'y':50, 'w':600, 'h':50};
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
	
	
