
define(['app/assets',

'app/models/modelfacade', 'phasercomponents',

'app/views/buttons/okbutton', 'app/views/buttons/closebutton', 'app/consts/steplengths'],

function(Assets,

ModelFacade, PhaserComponents,

OkButton, CloseButton, StepLengths){
	
	"use strict";
		
	var GridMenu = function(options){
		options.bgasset = 'panel';
		var screenModel = ModelFacade.getInstance().get(ModelFacade.SCREEN);
		this.showDiag = (screenModel.get() > 1);
		PhaserComponents.Display.AbstractPopup.call(this, options);
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
	
	GridMenu.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH - 10, "y":this.bounds.y};
		this.addButton(CloseButton, bounds);
	};
	
	GridMenu.prototype.addSlider = function(){
		var middle, bounds, options;
		middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + 90, "w":PhaserComponents.Display.Slider.WIDTH, "h":PhaserComponents.Display.Slider.HEIGHT};
		options = {"handle":Assets.SLIDERHANDLE, "sliderbg":Assets.SLIDERBG, "sliderhl":Assets.SLIDERHL, "model": ModelFacade.getInstance().get(ModelFacade.STEPLENGTH), "num":StepLengths.ALL.length - 1, "bounds":bounds};
		console.log("slider "+options.handle, options.sliderbg, options.sliderhl);
		this.lengthSlider = new PhaserComponents.Display.Slider(options);
		this.group.add(this.lengthSlider.group);
	};

	GridMenu.prototype.addDiagToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + 286};
		this.diagToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": ModelFacade.getInstance().get(ModelFacade.DIAG), "bounds":bounds});
		this.group.add(this.diagToggle.sprite);
	};

	GridMenu.prototype.addGridToggle = function(){
		var middle, bounds;
		middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.Display.ToggleButton.WIDTH/2);
		bounds = {"x":middle, "y":this.bounds.y + 186};
		this.gridToggle = new PhaserComponents.Display.ToggleButton({"asset":"toggle", "model": ModelFacade.getInstance().get(ModelFacade.GRID), "bounds":bounds});
		this.group.add(this.gridToggle.sprite);
	};

	GridMenu.prototype.addDiagLabel = function(){
		this.diagLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, 340, "Stretch diags");
		this.group.add(this.diagLabel);
	};

	GridMenu.prototype.addGridLabel = function(){
		this.gridLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, 240, "Toggle grid");
		this.group.add(this.gridLabel);
	};

	GridMenu.prototype.addStepLengthLabel = function(){
		this.stepLengthLabel = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 50, 140, "Step Length");
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

	GridMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addSlider();
		this.addTitle();
		this.addGridToggle();
		this.addLabels();
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
		this.group.remove(this.label0);
		this.group.remove(this.label1);
		this.group.remove(this.label2);
		this.group.remove(this.label);
		if(this.showDiag){
			this.diagToggle.destroy();
		}
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GridMenu;
	
});
	





