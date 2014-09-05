
define('app/views/popups/gridmenu',[ 'app/components/buttons/tickbutton',

'app/text/textfactory',

'app/models/modelfacade', 'phasercomponents',

'app/components/buttons/okbutton', 'app/components/buttons/closebutton'],

function(TickButton,

TextFactory,

ModelFacade, PhaserComponents,

OkButton, CloseButton){
	
	"use strict";
		
	var GridMenu = function(options){
		options.bgasset = 'panel';
		PhaserComponents.AbstractPopup.call(this, options);
	};
	
	GridMenu.prototype = Object.create(PhaserComponents.AbstractPopup.prototype);
	GridMenu.prototype.constructor = GridMenu;
	
	GridMenu.WIDTH = 800;
	GridMenu.HEIGHT = 600;
	
	GridMenu.prototype.addOk = function () {
		this.addButton(TickButton, 'bottom', 0, 1);
	};
	
	GridMenu.prototype.addText = function () {
		this.label = TextFactory.make(this.game, this.game.cx - 150, this.bounds.y + 20, this.options.label, TextFactory.SMALL);
		this.group.add(this.label);
	};
	
	GridMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT/2 - 20};
		this.addButton(OkButton, bounds);
	};
	
	GridMenu.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 50, "y":this.bounds.y + 10};
		this.addButton(CloseButton, bounds);
	};
	
	GridMenu.prototype.addSlider = function(){
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + 100};
		this.lengthSlider = new PhaserComponents.Slider({"model": ModelFacade.getInstance().get(ModelFacade.STEPLENGTH), "num":4, "bounds":bounds});
		this.group.add(this.lengthSlider.group);
	};

	GridMenu.prototype.addDiagToggle = function(){
		var middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.ToggleButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + 240};
		this.diagToggle = new PhaserComponents.ToggleButton({"model": ModelFacade.getInstance().get(ModelFacade.DIAG), "bounds":bounds});
		this.group.add(this.diagToggle.sprite);
	};

	GridMenu.prototype.addGridToggle = function(){
		var middle = this.bounds.x + this.bounds.w/2 - (PhaserComponents.ToggleButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + 170};
		this.gridToggle = new PhaserComponents.ToggleButton({"model": ModelFacade.getInstance().get(ModelFacade.GRID), "bounds":bounds});
		this.group.add(this.gridToggle.sprite);
	};

	GridMenu.prototype.addLabels = function(){
		this.label0 = TextFactory.make(this.game, this.game.cx - 250, 80, "Step Length", TextFactory.VSMALL);
		this.label1 = TextFactory.make(this.game, this.game.cx - 250, 170, "Toggle grid", TextFactory.VSMALL);
		this.label2 = TextFactory.make(this.game, this.game.cx - 250, 250, "Stretch diags", TextFactory.VSMALL);
		this.group.add(this.label0);
		this.group.add(this.label1);
		this.group.add(this.label2);
	};

	GridMenu.prototype.create = function () {
		PhaserComponents.AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addSlider();
		this.addGridToggle();
		this.addLabels();
		this.addDiagToggle();
		this.addOkButton();
		this.addCloseButton();
	};
	
	GridMenu.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b, i){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		this.lengthSlider.destroy();
		this.gridToggle.destroy();
		this.diagToggle.destroy();
		PhaserComponents.AbstractPopup.prototype.destroy.call(this);
	};
	
	return GridMenu;
	
});
	





