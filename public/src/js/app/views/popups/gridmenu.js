
define('app/views/popups/gridmenu',['app/game', 'app/components/buttons/tickbutton',

'app/components/popups/abstractpopup', 'app/text/textfactory',

'app/models/modelfacade', 'app/components/slider/slider',

'app/components/buttons/togglebutton',

'app/components/buttons/okbutton', 'app/components/buttons/closebutton'],

function(Game, TickButton,

AbstractPopup, TextFactory,

ModelFacade, Slider,

ToggleButton,

OkButton, CloseButton){
	
	"use strict";
		
	var GridMenu = function(options){
		options.bgasset = 'panel';
		AbstractPopup.call(this, options);
	};
	
	GridMenu.prototype = Object.create(AbstractPopup.prototype);
	GridMenu.prototype.constructor = GridMenu;
	
	GridMenu.WIDTH = 800;
	GridMenu.HEIGHT = 600;
	
	GridMenu.prototype.addOk = function () {
		this.addButton(TickButton, 'bottom', 0, 1);
	};
	
	GridMenu.prototype.addText = function () {
		this.label = TextFactory.make(Game.cx() - 150, this.bounds.y + 20, this.options.data.label, TextFactory.SMALL);
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
		this.lengthSlider = new Slider({"model": ModelFacade.getInstance().get(ModelFacade.STEPLENGTH), "num":4, "bounds":bounds});
		this.group.add(this.lengthSlider.group);
	};

	GridMenu.prototype.addDiagToggle = function(){
		var middle = this.bounds.x + this.bounds.w/2 - (ToggleButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + 240};
		this.diagToggle = new ToggleButton({"model": ModelFacade.getInstance().get(ModelFacade.DIAG), "bounds":bounds});
		this.group.add(this.diagToggle.sprite);
	};


	GridMenu.prototype.addGridToggle = function(){
		var middle = this.bounds.x + this.bounds.w/2 - (ToggleButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + 170};
		this.gridToggle = new ToggleButton({"model": ModelFacade.getInstance().get(ModelFacade.GRID), "bounds":bounds});
		this.group.add(this.gridToggle.sprite);
	};

	GridMenu.prototype.create = function () {
		AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addSlider();
		this.addGridToggle();
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
		AbstractPopup.prototype.destroy.call(this);
	};
	
	return GridMenu;
	
});
	





