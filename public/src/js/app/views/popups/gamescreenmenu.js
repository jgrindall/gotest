
define('app/views/popups/gamescreenmenu',['app/components/buttons/tickbutton', 

'phasercomponents','app/components/screenchoice', 'app/components/buttons/radiobutton',

'app/components/buttons/okbutton', 'app/components/buttons/closebutton'],

function(TickButton,

PhaserComponents, ScreenChoice, RadioButton,

OkButton, CloseButton){
	
	"use strict";
		
	var GameScreenMenu = function(options){
		options.bgasset = 'panel';
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(GameScreenMenu, PhaserComponents.Display.AbstractPopup);

	GameScreenMenu.WIDTH = 800;
	GameScreenMenu.HEIGHT = 600;
	
	GameScreenMenu.prototype.addOk = function () {
		this.addButton(TickButton, 'bottom', 0, 1);
	};
	
	GameScreenMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT/2 - 20};
		this.addButton(OkButton, bounds);
	};
	
	GameScreenMenu.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 50, "y":this.bounds.y + 10};
		this.addButton(CloseButton, bounds);
	};

	GameScreenMenu.prototype.getData = function() {
		return {"screenIndex":this.options.screenModel.get(), "radioIndex":this.options.radioModel.get()};
	};

	GameScreenMenu.prototype.addRadio = function() {
		var bounds, w, h;
		w = PhaserComponents.Display.RadioButtons.WIDTH;
		h = PhaserComponents.Display.RadioButtons.HEIGHT;
		bounds = {'x':this.bounds.x + this.bounds.w - w, 'y':this.game.h - h, 'w':w, 'h':h};
		this.radio = new PhaserComponents.Display.RadioButtons({"buttonClass":RadioButton, "numY":2, "model":this.options.radioModel, "bounds":bounds});	
		this.group.add(this.radio.group);
	};

	GameScreenMenu.prototype.addGrid = function() {
		var options;
		options = {"model":this.options.screenModel, "bounds":this.bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.group.add(this.grid.group);
	};

	GameScreenMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addOkButton();
		this.addCloseButton();
		this.addGrid();
		this.addRadio();
	};
	
	GameScreenMenu.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b, i){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		this.radio.destroy();
		this.grid.destroy();
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GameScreenMenu;
	
});
	

