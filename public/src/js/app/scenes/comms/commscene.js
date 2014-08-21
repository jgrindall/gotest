
define(['app/scenes/scene', 'app/scenes/comms/commands', 'app/components/tabbuttonbar', 'app/components/buttons/tabbutton', 'app/locdata', 'app/commsdata', 'app/components/buttons/navbutton', 'app/components/buttons/homebutton', 'app/game'],

function(Scene, Commands, TabButtonBar, TabButton, LocData, CommsData, NavButton, HomeButton, Game){
	
	"use strict";
	
	var CommScene  = function(key){
		Scene.call(this, key);
	};
	
	CommScene.prototype = Object.create(Scene.prototype);
	CommScene.prototype.constructor = CommScene;

	CommScene.prototype.loadLevel = function() {
		this.commands.loadLevel();
		this.tabs.loadLevel();
		this.tabs.init();
	};

	CommScene.prototype.create = function() {
		var bounds, numTabs, w;
		numTabs = LocData.getInstance().levelData.tabs;
		w = numTabs * TabButton.WIDTH;
		Scene.prototype.create.apply(this, arguments);
		this.goButton = new NavButton({"x":110, "y":0});
		this.commands = new Commands(CommsData.getInstance(), LocData.getInstance());
		bounds = {"x": Game.w() - w, "y": 0, "w": w, "h": 50};
		this.tabButtonBar = new TabButtonBar({"bounds":bounds, "buttonClass":TabButton});
		// here "locData":LocData.getInstance(), "commsData":CommsData.getInstance()
		// var index = this.commsData.selectedIndex;
		// this.locData = this.options.locData;
		// this.commsData = this.options.commsData;
		this.tabButtonBar.signal.add(this.tabSelected, this);
		this.backButton = new HomeButton({"x":0, "y":0});
		this.world.add(this.goButton.sprite);
		this.world.add(this.tabs.group);
		this.world.add(this.backButton.sprite);
		this.addListeners();
		this.loadLevel();
	};
	
	CommScene.prototype.addListeners = function(data) {
		this.goButton.mouseUpSignal.add(this.goButtonClicked, this);
		this.backButton.mouseUpSignal.add(this.backButtonClicked, this);
	};
	
	CommScene.prototype.tabSelected = function(data) {
		CommsData.getInstance().setSelectedTab(data);
	};
	
	CommScene.prototype.backButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key": this.key, "button":"back"});
	};
	
	CommScene.prototype.goButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key": this.key, "button":"go"});
	};

	CommScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
	};

	CommScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.commands.shutdown();
		this.tabButtonBar.shutdown();
	};
	
	return CommScene;

});
	
	



