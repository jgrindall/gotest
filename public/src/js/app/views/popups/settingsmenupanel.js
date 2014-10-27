
define(['app/assets',

'phasercomponents', 'app/models/modelconsts',

'app/views/buttons/okbutton',

'app/consts/steplengths'],

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
		this.modelFacade.get(ModelConsts.ALLOW_PROG).changeSignal.add(this.setSettings3, this);
	};
	
	PhaserComponents.Utils.extends(SettingsMenuPanel, PhaserComponents.Display.Container);

	SettingsMenuPanel.Y0 = 		55;
	SettingsMenuPanel.Y1 = 		170;
	SettingsMenuPanel.Y2 = 		285;
	SettingsMenuPanel.Y3 = 		400;
	
	SettingsMenuPanel.prototype.setSettings1 = function() {
		this.settings1.goTo(this.modelFacade.get(ModelConsts.STEPLENGTH).get());
	};

	SettingsMenuPanel.prototype.setSettings3 = function() {
		this.settings3.goTo(this.modelFacade.get(ModelConsts.ALLOW_PROG).get());
	};

	SettingsMenuPanel.prototype.setSettings2 = function() {
		var grid, diag, frame, frames;
		grid = this.modelFacade.get(ModelConsts.GRID).get();
		if(this.showDiag){
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
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y1 - 10, "w":PhaserComponents.Display.Slider.WIDTH, "h":PhaserComponents.Display.Slider.HEIGHT};
		options = {"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": this.modelFacade.get(ModelConsts.STEPLENGTH), "num":StepLengths.ALL.length - 1, "bounds":bounds};
		this.lengthSlider = new PhaserComponents.Display.Slider(options);
		this.view.add(this.lengthSlider.view);
	};

	SettingsMenuPanel.prototype.addDiagToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y3 - 15};
		this.diagToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": this.modelFacade.get(ModelConsts.DIAG), "bounds":bounds});
		this.view.add(this.diagToggle.view);
	};

	SettingsMenuPanel.prototype.addProgToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y0 - 15};
		this.progToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": this.modelFacade.get(ModelConsts.ALLOW_PROG), "bounds":bounds});
		this.view.add(this.progToggle.view);
	};

	SettingsMenuPanel.prototype.addGridToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + SettingsMenuPanel.Y2 - 15};
		this.gridToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": this.modelFacade.get(ModelConsts.GRID), "bounds":bounds});
		this.view.add(this.gridToggle.view);
	};

	SettingsMenuPanel.prototype.addDiagLabel = function(){
		this.diagLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y3, "Stretch diags");
		this.group.add(this.diagLabel);
	};

	SettingsMenuPanel.prototype.addProgLabel = function(){
		this.progLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y0, "Allow programming");
		this.group.add(this.progLabel);
	};

	SettingsMenuPanel.prototype.addGridLabel = function(){
		this.gridLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y2, "Toggle grid");
		this.group.add(this.gridLabel);
	};

	SettingsMenuPanel.prototype.addStepLengthLabel = function(){
		this.stepLengthLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, this.bounds.y + SettingsMenuPanel.Y1, "Step length");
		this.group.add(this.stepLengthLabel);
	};
	
	SettingsMenuPanel.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 20, this.bounds.y + 9, this.options.label);
 		this.group.add(this.label);
	};

	SettingsMenuPanel.prototype.addLabels = function(){
		this.addStepLengthLabel();
		this.addGridLabel();
		if(this.showDiag){
			this.addDiagLabel();
		}
	};

	SettingsMenuPanel.prototype.addSettings1 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + 115, 'w':160, 'h':160};
		this.settings1 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":6, "asset":Assets.SETTINGS1});
		this.group.add(this.settings1.view);
		this.setSettings1();
	};

	SettingsMenuPanel.prototype.addSettings3 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + 5, 'w':160, 'h':160};
		this.settings3 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":2, "asset":Assets.SETTINGS3});
		this.group.add(this.settings3.view);
		this.setSettings3();
	};

	SettingsMenuPanel.prototype.addSettings2 = function () {
		var bounds = {'x':this.bounds.x + this.bounds.w - 170, 'y':this.bounds.y + 305, 'w':160, 'h':160};
		this.settings2 = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":6, "asset":Assets.SETTINGS2});
		this.group.add(this.settings2.view);
		this.setSettings2();
	};

	SettingsMenuPanel.prototype.create = function () {
		var screenModel = this.modelFacade.get(ModelConsts.SCREEN);
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.showDiag = (screenModel.get() > 1);
		this.addSlider();
		this.addTitle();
		this.addGridToggle();
		this.addProgToggle();
		this.addLabels();
		this.addProgLabel();
		this.addSettings1();
		this.addSettings2();
		this.addSettings3();
		if(this.showDiag){
			this.addDiagToggle();
		}
	};
	
	SettingsMenuPanel.prototype.removeLabels = function() {
		this.group.remove(this.diagLabel);
		this.group.remove(this.progLabel);
		this.group.remove(this.gridLabel);
		this.group.remove(this.stepLengthLabel);
		this.group.remove(this.label);
	};

	SettingsMenuPanel.prototype.destroy = function() {
		this.group.remove(this.lengthSlider);
		this.group.remove(this.settings1);
		this.group.remove(this.settings2);
		this.group.remove(this.settings3);
		this.group.remove(this.progToggle);
		this.group.remove(this.gridToggle);
		this.lengthSlider.destroy();
		this.settings1.destroy();
		this.settings2.destroy();
		this.settings3.destroy();
		this.progToggle.destroy();
		this.gridToggle.destroy();
		if(this.diagToggle){
			this.group.remove(this.diagToggle);
			this.diagToggle.destroy();
		}
		this.modelFacade.get(ModelConsts.STEPLENGTH).changeSignal.remove(this.setSettings1, this);
		this.modelFacade.get(ModelConsts.DIAG).changeSignal.remove(this.setSettings2, this);
		this.modelFacade.get(ModelConsts.GRID).changeSignal.remove(this.setSettings2, this);
		this.modelFacade.get(ModelConsts.ALLOW_PROG).changeSignal.remove(this.setSettings3, this);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return SettingsMenuPanel;
	
});
	





