
define(['phasercomponents','app/views/popups/screenchoice', 'app/views/buttons/radiobutton',

'app/views/buttons/okbutton', 'app/views/buttons/closebutton',

'app/models/modelconsts', 'app/assets'],

function(PhaserComponents, ScreenChoice, RadioButton,

OkButton, CloseButton,

ModelConsts, Assets){
	
	"use strict";
		
	var GameScreenMenu = function(options){
		options.bgasset = Assets.PANEL;
		PhaserComponents.Display.AbstractPopup.call(this, options);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.add(this.onChanged, this);
	};
	
	PhaserComponents.Utils.extends(GameScreenMenu, PhaserComponents.Display.AbstractPopup);

	GameScreenMenu.WIDTH = 720;
	GameScreenMenu.HEIGHT = 540;
	
	GameScreenMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT + 3};
		this.addButton(OkButton, bounds);
	};
	
	GameScreenMenu.prototype.onChanged = function(data){
		if(data.index === 3){
			this.enableRadio();
		}
		else{
			this.disableRadio();
		}
	};

	GameScreenMenu.prototype.initRadio = function () {
		var screen = this.modelFacade.get(ModelConsts.SCREEN).get();
		if(screen === 3){
			this.enableRadio();
		}
		else{
			this.disableRadio();
		}
	};

	GameScreenMenu.prototype.enableRadio = function () {
		this.radio.group.alpha = 1;
		this.radio.enableInput();
	};

	GameScreenMenu.prototype.disableRadio = function () {
		this.radio.group.alpha = 0.3;
		this.radio.disableInput();
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
		bounds = {'x':this.bounds.x + this.bounds.w - w - 13, 'y':this.bounds.y + this.bounds.h - 178, 'w':w, 'h':h};
		this.radio = new PhaserComponents.Display.RadioButtons({"sfx":Assets.SOUNDS[1], "labels":labels, "fontKey":"vsmall", "buttonClass":RadioButton, "numY":2, "model":this.options.radioModel, "bounds":bounds});	
		this.group.add(this.radio.group);
		this.initRadio();
	};

	GameScreenMenu.prototype.addGrid = function() {
		var options, bounds;
		bounds = {'x':this.bounds.x, 'y':this.bounds.y + 30, 'w':this.bounds.w, 'h':this.bounds.h - 31};
		options = {"model":this.options.screenModel, "bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.onChanged, this);
		this.group.add(this.grid.group);
		this.adjustLayout();
	};

	GameScreenMenu.prototype.adjustLayout = function() {
		var button3;
		button3 = this.grid.getButtonAt(3);
		button3.group.x -= 7;
	};

	GameScreenMenu.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 10, this.bounds.y + 7, "Choose a way to enter commands");
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
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.remove(this.onChanged, this);
		this.radio.destroy();
		this.grid.destroy();
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GameScreenMenu;
	
});
	

