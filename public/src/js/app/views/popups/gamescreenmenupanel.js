
define(['phasercomponents','app/views/popups/screenchoice', 'app/views/buttons/radiobutton',

'app/models/modelconsts', 'app/assets'],

function(PhaserComponents, ScreenChoice, RadioButton,

ModelConsts, Assets){
	
	"use strict";
		
	var GameScreenMenuPanel = function(options){
		options.bgasset = Assets.PANEL;
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.add(this.onChanged, this);
	};
	
	PhaserComponents.Utils.extends(GameScreenMenuPanel, PhaserComponents.Display.Container);
	
	GameScreenMenuPanel.prototype.onChanged = function(data){
		if(data){
			if(data.index === 3){
				this.enableRadio();
			}
			else{
				this.disableRadio();
			}
		}
	};

	GameScreenMenuPanel.prototype.initRadio = function () {
		var screen = this.modelFacade.get(ModelConsts.SCREEN).get();
		if(screen === 3){
			this.enableRadio();
		}
		else{
			this.disableRadio();
		}
	};

	GameScreenMenuPanel.prototype.enableRadio = function () {
		this.radio.group.alpha = 1;
		this.radio.enableInput();
	};

	GameScreenMenuPanel.prototype.disableRadio = function () {
		this.radio.group.alpha = 0.3;
		this.radio.disableInput();
	};

	GameScreenMenuPanel.prototype.getData = function() {
		return {"screenIndex":this.options.screenModel.get(), "radioIndex":this.options.radioModel.get()};
	};

	GameScreenMenuPanel.prototype.adjustLayout = function() {
		var button3;
		button3 = this.grid.getButtonAt(3);
		button3.group.x += 10;
	};

	GameScreenMenuPanel.prototype.addRadio = function() {
		var bounds, w, h, labels;
		w = PhaserComponents.Display.RadioButtons.WIDTH;
		h = PhaserComponents.Display.RadioButtons.HEIGHT;
		labels = ["45 degrees", "90 degrees"];
		bounds = {'x':this.bounds.x + this.bounds.w - w - 13, 'y':this.bounds.y + this.bounds.h - 178, 'w':w, 'h':h};
		this.radio = new PhaserComponents.Display.RadioButtons({"sfx":Assets.SOUNDS[1], "labels":labels, "fontKey":"vsmall", "buttonClass":RadioButton, "numY":2, "model":this.options.radioModel, "bounds":bounds});	
		this.group.add(this.radio.group);
		this.initRadio();
	};

	GameScreenMenuPanel.prototype.addGrid = function() {
		var options, bounds;
		bounds = {'x':this.bounds.x, 'y':this.bounds.y + 30, 'w':this.bounds.w, 'h':this.bounds.h - 31};
		options = {"model":this.options.screenModel, "bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice};
		options.performSelect = true;
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.onChanged, this);
		this.group.add(this.grid.group);
		this.adjustLayout();
	};

	GameScreenMenuPanel.prototype.create = function () {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addGrid();
		this.addRadio();
	};
	
	GameScreenMenuPanel.prototype.destroy = function() {
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.remove(this.onChanged, this);
		this.radio.destroy();
		this.grid.destroy();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return GameScreenMenuPanel;
	
});
	

