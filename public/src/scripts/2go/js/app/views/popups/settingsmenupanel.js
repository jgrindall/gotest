
define(['base/assets',

'phasercomponents', 'base/models/modelconsts',

'base/views/buttons/okbutton',

'base/consts/steplengths'],

function(Assets,

PhaserComponents, ModelConsts,

OkButton,

StepLengths){
	
	"use strict";
		
	var SettingsMenuPanel = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.STEPLENGTH).changeSignal.add(this.setSettings1, this);
		this.modelFacade.get(ModelConsts.DIAG).changeSignal.add(this.setSettings2, this);
		this.modelFacade.get(ModelConsts.GRID).changeSignal.add(this.setSettings2, this);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.add(this.onScreenChanged, this);
	};
	
	PhaserComponents.Utils.extends(SettingsMenuPanel, PhaserComponents.Display.Container);

	SettingsMenuPanel.Y0 = 				[90, 95];
	SettingsMenuPanel.Y1 = 				[190, 230];
	SettingsMenuPanel.Y2 = 				[290, 375];
	SettingsMenuPanel.Y3 = 				[390, 400];

	SettingsMenuPanel.Y4 = 				[124, 163];
	SettingsMenuPanel.Y6 = 				[274, 311];

	SettingsMenuPanel.SLIDER_WIDTH =	210;
	SettingsMenuPanel.SLIDER_HEIGHT = 	40;

	SettingsMenuPanel.prototype.onScreenChanged = function(){
		this.destroyUI();
		this.createUI();
	};

	SettingsMenuPanel.prototype.setSettings1 = function() {
		this.settings1.goTo(this.modelFacade.get(ModelConsts.STEPLENGTH).get());
	};

	SettingsMenuPanel.prototype.setSettings2 = function() {
		var grid, diag, frame, frames;
		grid = this.modelFacade.get(ModelConsts.GRID).get();
		if(this.getShowDiag() === 0){
			frames = [[5, 4], [3, 2]];
			diag = this.modelFacade.get(ModelConsts.DIAG).get();
			frame = frames[grid][diag];
		}
		else{
			frames = [0, 1];
			frame = frames[grid];
		}
		this.settings2.goTo(frame);
	};
	
	SettingsMenuPanel.prototype.getData = function(){
		return {};
	};

	SettingsMenuPanel.prototype.addSlider = function(){
		var middle, bounds, options;
		middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		bounds = {"x":middle - 15, "y":this.bounds.y + SettingsMenuPanel.Y1[this.getShowDiag()] - 10, "w":SettingsMenuPanel.SLIDER_WIDTH, "h":SettingsMenuPanel.SLIDER_HEIGHT};
		options = {"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": this.modelFacade.get(ModelConsts.STEPLENGTH), "num":StepLengths.ALL.length - 1, "bounds":bounds};
		options.handleSize = {'w':40, 'h':40};
		this.lengthSlider = new PhaserComponents.Display.Slider(options);
		this.view.add(this.lengthSlider.view);
	};

	SettingsMenuPanel.prototype.addDiagToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y3[this.getShowDiag()] - 15};
		this.diagToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": this.modelFacade.get(ModelConsts.DIAG), "bounds":bounds});
		this.view.add(this.diagToggle.view);
	};

	SettingsMenuPanel.prototype.addProgToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y0[this.getShowDiag()] - 15};
		this.progToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": this.modelFacade.get(ModelConsts.ALLOW_PROG), "bounds":bounds});
		this.view.add(this.progToggle.view);
	};

	SettingsMenuPanel.prototype.addGridToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y2[this.getShowDiag()] - 15};
		this.gridToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": this.modelFacade.get(ModelConsts.GRID), "bounds":bounds});
		this.view.add(this.gridToggle.view);
	};

	SettingsMenuPanel.prototype.getShowDiag = function(){
		var screenModel = this.modelFacade.get(ModelConsts.SCREEN);
		return (screenModel.get() > 1) ? 0 : 1;
	};

	SettingsMenuPanel.prototype.addDiagLabel = function(){
		this.diagLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y3[this.getShowDiag()], "Stretch diags");
		this.group.add(this.diagLabel);
	};

	SettingsMenuPanel.prototype.addProgLabel = function(){
		this.progLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y0[this.getShowDiag()], "Allow programming");
		this.group.add(this.progLabel);
	};

	SettingsMenuPanel.prototype.addGridLabel = function(){
		this.gridLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y2[this.getShowDiag()], "Toggle grid");
		this.group.add(this.gridLabel);
	};

	SettingsMenuPanel.prototype.addStepLengthLabel = function(){
		this.stepLengthLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y1[this.getShowDiag()], "Step length");
		this.group.add(this.stepLengthLabel);
	};
	
	SettingsMenuPanel.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('mediumheader', this.game, this.bounds.x + 20, this.bounds.y + 9, this.options.label);
 		this.group.add(this.label);
	};

	SettingsMenuPanel.prototype.addLabels = function(){
		this.addStepLengthLabel();
		this.addGridLabel();
		if(this.getShowDiag() === 0){
			this.addDiagLabel();
		}
	};

	SettingsMenuPanel.prototype.addSettings1 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + SettingsMenuPanel.Y4[this.getShowDiag()], 'w':160, 'h':160};
		this.settings1 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":StepLengths.ALL.length, "asset":Assets.SETTINGS1});
		this.group.add(this.settings1.view);
		this.setSettings1();
	};

	SettingsMenuPanel.prototype.addSettings2 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + SettingsMenuPanel.Y6[this.getShowDiag()], 'w':160, 'h':160};
		this.settings2 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":6, "asset":Assets.SETTINGS2});
		this.group.add(this.settings2.view);
		this.setSettings2();
	};

	SettingsMenuPanel.prototype.createUI = function () {
		this.addSlider();
		this.addTitle();
		this.addGridToggle();
		this.addProgToggle();
		this.addLabels();
		this.addProgLabel();
		this.addSettings1();
		this.addSettings2();
		if(this.getShowDiag() === 0){
			this.addDiagToggle();
		}
	};

	SettingsMenuPanel.prototype.create = function () {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.createUI();
	};
	
	SettingsMenuPanel.prototype.removeLabels = function() {
		this.group.remove(this.diagLabel);
		this.group.remove(this.progLabel);
		this.group.remove(this.gridLabel);
		this.group.remove(this.stepLengthLabel);
		this.group.remove(this.label);
	};

	SettingsMenuPanel.prototype.destroyUI = function() {
		this.group.remove(this.lengthSlider);
		this.group.remove(this.settings1);
		this.group.remove(this.settings2);
		this.group.remove(this.progToggle);
		this.group.remove(this.gridToggle);
		this.lengthSlider.destroy();
		this.settings1.destroy();
		this.settings2.destroy();
		this.progToggle.destroy();
		this.gridToggle.destroy();
		this.removeLabels();
		if(this.diagToggle){
			this.group.remove(this.diagToggle);
			this.diagToggle.destroy();
			this.diagToggle = null;
		}
	};

	SettingsMenuPanel.prototype.destroy = function() {
		this.modelFacade.get(ModelConsts.STEPLENGTH).changeSignal.remove(this.setSettings1, this);
		this.modelFacade.get(ModelConsts.DIAG).changeSignal.remove(this.setSettings2, this);
		this.modelFacade.get(ModelConsts.GRID).changeSignal.remove(this.setSettings2, this);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.remove(this.onScreenChanged, this);
		this.destroyUI();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return SettingsMenuPanel;
	
});
	





