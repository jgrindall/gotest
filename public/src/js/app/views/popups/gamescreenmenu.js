
define('app/views/popups/gamescreenmenu',[

, 'app/components/buttons/tickbutton', 'app/models/modelfacade',

'app/components/popups/abstractpopup', 'app/views/controls/radiobuttons',

'phasercomponents','app/components/screenchoice',

'app/components/buttons/okbutton', 'app/components/buttons/closebutton'],

function(Game, TickButton, ModelFacade,

AbstractPopup, RadioButtons,

PhaserComponents, ScreenChoice,

OkButton, CloseButton){
	
	"use strict";
		
	var GameScreenMenu = function(options){
		options.bgasset = 'panel';
		AbstractPopup.call(this, options);
	};
	
	GameScreenMenu.prototype = Object.create(AbstractPopup.prototype);
	GameScreenMenu.prototype.constructor = GameScreenMenu;
	
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
		return {"screenIndex":this.options.data.screenModel.getData().index, "radioIndex":this.options.data.radioModel.getData().index};
	};

	GameScreenMenu.prototype.addRadio = function() {
		var bounds = {'x':this.bounds.x + this.bounds.w - RadioButtons.WIDTH, 'y':this.game.h - RadioButtons.HEIGHT, 'w':RadioButtons.WIDTH, 'h':RadioButtons.HEIGHT};
		this.radio = new RadioButtons({"model":this.options.data.radioModel, "bounds":bounds});	
		this.group.add(this.radio.group);
	};

	GameScreenMenu.prototype.addGrid = function() {
		var options;
		options = {"model":this.options.data.screenModel, "bounds":this.bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		this.grid = new PhaserComponents.ButtonGrid(Game.getInstance(), options);
		this.group.add(this.grid.group);
	};

	GameScreenMenu.prototype.create = function () {
		AbstractPopup.prototype.create.call(this);
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
		AbstractPopup.prototype.destroy.call(this);
	};
	
	return GameScreenMenu;
	
});
	

