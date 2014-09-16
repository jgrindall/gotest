
define('app/views/popups/gamescreenmenu',['phasercomponents','app/views/screenchoice', 'app/views/buttons/radiobutton',

'app/views/buttons/okbutton', 'app/views/buttons/closebutton'],

function(PhaserComponents, ScreenChoice, RadioButton,

OkButton, CloseButton){
	
	"use strict";
		
	var GameScreenMenu = function(options){
		options.bgasset = 'panel';
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(GameScreenMenu, PhaserComponents.Display.AbstractPopup);

	GameScreenMenu.WIDTH = 720;
	GameScreenMenu.HEIGHT = 540;
	
	GameScreenMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT - 10};
		this.addButton(OkButton, bounds);
	};
	
	GameScreenMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH - 10, "y":this.bounds.y };
		this.addButton(CloseButton, bounds);
	};

	GameScreenMenu.prototype.getData = function() {
		return {"screenIndex":this.options.screenModel.get(), "radioIndex":this.options.radioModel.get()};
	};

	GameScreenMenu.prototype.addRadio = function() {
		var bounds, w, h, labels;
		w = PhaserComponents.Display.RadioButtons.WIDTH;
		h = PhaserComponents.Display.RadioButtons.HEIGHT;
		labels = ["45 degrees", "90 degrees"];
		bounds = {'x':this.bounds.x + this.bounds.w - w, 'y':this.game.h - h, 'w':w, 'h':h};
		this.radio = new PhaserComponents.Display.RadioButtons({"labels":labels, "fontKey":"vsmall", "buttonClass":RadioButton, "numY":2, "model":this.options.radioModel, "bounds":bounds});	
		this.group.add(this.radio.group);
	};

	GameScreenMenu.prototype.addGrid = function() {
		var options, bounds;
		bounds = {'x':this.options.bounds.x, 'y':this.options.bounds.y + 40, 'w':this.options.bounds.w, 'h':this.options.bounds.h - 100};
		options = {"model":this.options.screenModel, "bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.group.add(this.grid.group);
	};

	GameScreenMenu.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 10, this.bounds.y + 6, "Choose a way to enter commands");
 		this.group.add(this.label);
	};

	GameScreenMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addOkButton();
		this.addCloseButton();
		this.addGrid();
		this.addRadio();
		this.addTitle();
	};
	
	GameScreenMenu.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		this.radio.destroy();
		this.grid.destroy();
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GameScreenMenu;
	
});
	

