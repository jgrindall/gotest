
define(['app/game', 'app/components/container', 'app/components/background',

'app/components/tabbuttonbar', 'app/components/buttons/tabbutton',

'app/components/buttons/dirbutton', 'app/components/buttons/keybutton',

'app/components/buttongrid', 'app/scenes/activity/gamescreenmenu', 'app/scenes/activity/commmodel',

'app/utils/alertmanager'

],

function(Game, Container, Background,

TabButtonBar, TabButton, DirButton, KeyButton,

ButtonGrid, GameScreenMenu, commModel,

AlertManager){
	
	"use strict";
	
	var CommandsPanel  = function(options){
		Container.call(this, options);
		Game.alertSignal.add($.proxy(this.onAlert, this));
		this.create();
	};
	
	CommandsPanel.prototype = Object.create(Container.prototype);
	CommandsPanel.prototype.constructor = CommandsPanel;
	
	CommandsPanel.prototype.onAlert = function(data) {
		if(data.show){
			this.disableAllInput();
		}
		else{
			this.enableAllInput();
		}
	};
	
	CommandsPanel.prototype.disableAllInput = function() {
		this.grid.disableAll();
		this.keys.disableAll();
	};
	
	CommandsPanel.prototype.enableAllInput = function() {
		this.grid.enableAll();
		this.keys.enableAll();
	};
	
	CommandsPanel.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGrid();
		this.addKeys();
		this.addChangeButton();
	};
	
	CommandsPanel.prototype.addChangeButton = function() {
		this.changeButton = new DirButton({"bounds":{"x":Game.w()/2, "y":0}});
		this.changeButton.mouseUpSignal.add(this.changeButtonClicked, this);
		this.group.add(this.changeButton.sprite);
	};

	CommandsPanel.prototype.changeButtonClicked = function(data) {
		AlertManager.makeScreenMenu();
	};
	
	CommandsPanel.prototype.addKeys = function() {
		var options, bounds, w, h, data;
		data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		w = Game.w();
		h = Game.h();
		bounds = {"x":w/2, "y":320, "w":220, "h":220};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": KeyButton, "data":data};
		this.keys = new ButtonGrid(options);
		this.keys.signal.add(this.selectKey, this);
		this.group.add(this.keys.group);
	};
	
	CommandsPanel.prototype.addGrid = function() {
		var options, bounds, w, h, data;
		data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		w = Game.w();
		h = Game.h();
		bounds = {"x":w/2, "y":60, "w":220, "h":220};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": DirButton, "data":data};
		this.grid = new ButtonGrid(options);
		this.grid.signal.add(this.selectComm, this);
		this.group.add(this.grid.group);
	};
	
	CommandsPanel.prototype.selectComm = function(data){
		commModel.add(data.index);
	};
	
	CommandsPanel.prototype.selectKey = function(data){
		//commModel.add(data.index);
	};
	
	CommandsPanel.prototype.destroy = function() {
		this.grid.signal.removeAll(this);
		this.keys.signal.removeAll(this);
		this.grid.destroy();
		this.keys.destroy();
		Container.prototype.destroy.call(this);
	};
	
	return CommandsPanel;
});
	
	
