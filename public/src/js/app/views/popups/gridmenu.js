
define(['app/assets',

'app/models/modelfacade', 'phasercomponents',

'app/views/buttons/okbutton', 'app/views/buttons/closebutton', 'app/consts/steplengths'],

function(Assets,

ModelFacade, PhaserComponents,

OkButton, CloseButton, StepLengths){
	
	"use strict";
		
	var GridMenu = function(options){
		var screenModel;
		options.bgasset = 'panel';
		screenModel = ModelFacade.getInstance().get(ModelFacade.SCREEN);
		this.showDiag = (screenModel.get() > 1);
		PhaserComponents.Display.AbstractPopup.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.STEPLENGTH).changeSignal.add(this.setSettings1, this);
		ModelFacade.getInstance().get(ModelFacade.DIAG).changeSignal.add(this.setSettings2, this);
		ModelFacade.getInstance().get(ModelFacade.GRID).changeSignal.add(this.setSettings2, this);
	};
	
	PhaserComponents.Utils.extends(GridMenu, PhaserComponents.Display.AbstractPopup);

	GridMenu.WIDTH = 720;
	GridMenu.HEIGHT = 540;
	
	GridMenu.prototype.addOkButton = function () {
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT/2 - 30};
		this.addButton(OkButton, bounds);
	};
	
	GridMenu.prototype.setSettings1 = function() {
		this.settings1.goTo(ModelFacade.getInstance().get(ModelFacade.STEPLENGTH).get());
	};

	GridMenu.prototype.setSettings2 = function() {
		var grid, diag, frame, frames;
		frames = [[3, 2],[1, 0]];
		grid = ModelFacade.getInstance().get(ModelFacade.GRID).get();
		diag = ModelFacade.getInstance().get(ModelFacade.DIAG).get();
		frame = frames[grid][diag];
		this.settings2.goTo(frame);
	};

	GridMenu.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH - 10, "y":this.bounds.y};
		this.addButton(CloseButton, bounds);
	};
	
	GridMenu.prototype.addSlider = function(){
		var middle, bounds, options;
		middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + 120, "w":PhaserComponents.Display.Slider.WIDTH, "h":PhaserComponents.Display.Slider.HEIGHT};
		options = {"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": ModelFacade.getInstance().get(ModelFacade.STEPLENGTH), "num":StepLengths.ALL.length - 1, "bounds":bounds};
		this.lengthSlider = new PhaserComponents.Display.Slider(options);
		this.group.add(this.lengthSlider.group);
	};

	GridMenu.prototype.addDiagToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + 356};
		this.diagToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": ModelFacade.getInstance().get(ModelFacade.DIAG), "bounds":bounds});
		this.group.add(this.diagToggle.sprite);
	};

	GridMenu.prototype.addGridToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + 236};
		this.gridToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": ModelFacade.getInstance().get(ModelFacade.GRID), "bounds":bounds});
		this.group.add(this.gridToggle.sprite);
	};

	GridMenu.prototype.addDiagLabel = function(){
		this.diagLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, 405, "Stretch diags");
		this.group.add(this.diagLabel);
	};

	GridMenu.prototype.addGridLabel = function(){
		this.gridLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, 287, "Toggle grid");
		this.group.add(this.gridLabel);
	};

	GridMenu.prototype.addStepLengthLabel = function(){
		this.stepLengthLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, 160, "Step Length");
		this.group.add(this.stepLengthLabel);
	};
	
	GridMenu.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 20, this.bounds.y + 9, this.options.label);
 		this.group.add(this.label);
	};

	GridMenu.prototype.addLabels = function(){
		this.addStepLengthLabel();
		this.addGridLabel();
		if(this.showDiag){
			this.addDiagLabel();
		}
	};

	GridMenu.prototype.addSettings1 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + 51, 'w':160, 'h':160};
		this.settings1 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":6, "asset":Assets.SETTINGS1});
		this.group.add(this.settings1.sprite);
		this.setSettings1();
	};

	GridMenu.prototype.addSettings2 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + 253, 'w':160, 'h':160};
		this.settings2 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":6, "asset":Assets.SETTINGS2});
		this.group.add(this.settings2.sprite);
		this.setSettings2();
	};

	GridMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addSlider();
		this.addTitle();
		this.addGridToggle();
		this.addLabels();
		this.addSettings1();
		this.addSettings2();
		if(this.showDiag){
			this.addDiagToggle();
		}
		this.addOkButton();
		this.addCloseButton();
	};
	
	GridMenu.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		this.lengthSlider.destroy();
		this.gridToggle.destroy();
		this.settings1.destroy();
		this.group.remove(this.label0);
		this.group.remove(this.label1);
		this.group.remove(this.label2);
		this.group.remove(this.label);
		this.group.remove(this.settings1);
		if(this.showDiag){
			this.diagToggle.destroy();
		}
		ModelFacade.getInstance().get(ModelFacade.STEPLENGTH).changeSignal.remove(this.setSettings1, this);
		ModelFacade.getInstance().get(ModelFacade.DIAG).changeSignal.remove(this.setSettings2, this);
		ModelFacade.getInstance().get(ModelFacade.GRID).changeSignal.remove(this.setSettings2, this);
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GridMenu;
	
});
	





