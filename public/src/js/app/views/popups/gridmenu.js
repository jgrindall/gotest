
define(['app/assets',

'phasercomponents',

'app/views/buttons/okbuttoncontainer',

'app/views/buttons/closebutton',

'app/views/buttons/tabbutton',

'app/views/popups/gamescreenmenupanel', 'app/views/popups/settingsmenupanel',

'app/views/buttons/voiceoverbutton'],

function(Assets,

PhaserComponents, 

OkButtonContainer,

CloseButton,

TabButton,

GameScreenMenuPanel, SettingsMenuPanel,

VoiceOverButton){
	
	"use strict";
		
	var GridMenu = function(options){
		options.bgasset = Assets.PANEL;
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	GridMenu.WIDTH = 	720;
	GridMenu.HEIGHT = 	540;

	PhaserComponents.Utils.extends(GridMenu, PhaserComponents.Display.AbstractPopup);
	
	GridMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addTab();
		this.addCloseButton();
		this.addOkButton();
		this.addLabel();
		this.addVOButton();
	};

	GridMenu.prototype.addTab = function () {
		var options, bounds, panels, panel0, panel1;
		bounds = this.bounds;
		panel0 = new GameScreenMenuPanel({"bounds":this.bounds, "screenModel":this.options.screenModel, "radioModel":this.options.radioModel, "sfx":Assets.SOUNDS[2]});
		panel1 = new SettingsMenuPanel({"bounds":this.bounds});
		panels = [panel0, panel1];
		options = {"bounds":bounds, "panels":panels, "buttonClass":TabButton};
		this.tabPanel = new PhaserComponents.Display.TabPanel(options);
		this.group.add(this.tabPanel.view);
		this.tabPanel.buttonBar.view.x += 140;
		this.tabPanel.buttonBar.view.y += 11;
	};

	GridMenu.prototype.getData = function () {
		return this.tabPanel.getData();
	};

	GridMenu.prototype.addLabel = function () {
		this.title = PhaserComponents.TextFactory.make('mediumheader', this.game, this.bounds.x + 16, this.bounds.y + 10, "Settings");
		this.group.add(this.title);
	};

	GridMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle + 2, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT + 3};
		this.addButton(OkButtonContainer, bounds);
	};

	GridMenu.prototype.addVOButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - 105, "y":this.bounds.y - 2};
		this.addButton(VoiceOverButton, bounds);
	};

	GridMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH, "y":this.bounds.y };
		this.addButton(CloseButton, bounds);
	};

	GridMenu.prototype.destroy = function() {
		this.group.remove(this.tabPanel.view);
		this.group.remove(this.title);
		this.tabPanel.destroy();
		this.tabPanel = null;
		this.title.destroy();
		this.title = null;
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GridMenu;
	
});
	







