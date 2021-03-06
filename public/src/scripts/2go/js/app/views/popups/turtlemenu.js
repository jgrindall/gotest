
define(['phasercomponents',

'base/views/buttons/okbuttoncontainer', 'base/views/buttons/closebutton',

'base/assets', 'base/views/buttons/addbutton',

'base/views/popups/turtlechoice', 'base/utils/translation', 'base/utils/translationconsts'],

function(PhaserComponents, 

OkButtonContainer, CloseButton,

Assets, AddButton,

TurtleChoice, Translation, TranslationConsts){
	
	"use strict";
		
	var TurtleMenu = function(options){
		options.bgasset = Assets.ALERT;
		PhaserComponents.Display.AbstractPopup.call(this, options);
		this.model.changeSignal.add(this.onChanged, this);
	};
	
	PhaserComponents.Utils.extends(TurtleMenu, PhaserComponents.Display.AbstractPopup);

	TurtleMenu.WIDTH = 420;
	TurtleMenu.HEIGHT = 250;

	TurtleMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT + 3};
		this.addButton(OkButtonContainer, bounds);
	};
	
	TurtleMenu.prototype.addAdd = function () {
		var middle = this.bounds.x + this.bounds.w - AddButton.WIDTH + 14000;
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - AddButton.HEIGHT + 4};
		this.addButton(AddButton, bounds);
	};

	TurtleMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH, "y":this.bounds.y };
		this.addButton(CloseButton, bounds);
	};

	TurtleMenu.prototype.getData = function() {
		return {"index":this.selectedIndex};
	};

	TurtleMenu.prototype.addGrid = function() {
		var options, bounds;
		bounds = {'x':this.bounds.x + 50, 'y':this.bounds.y + 42, 'w':320, 'h':130};
		options = {"model":this.model, "bounds":bounds, "numX": 5, "numY": 2, "buttonClass": TurtleChoice};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.onChanged, this);
		this.group.add(this.grid.group);
	};

	TurtleMenu.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('mediumheader', this.game, this.bounds.x + 14, this.bounds.y + 10, Translation.getForKey(TranslationConsts.Keys.CHOOSE_TURTLE));
 		this.group.add(this.label);
	};

	TurtleMenu.prototype.onChanged = function (data) {
		this.selectedIndex = data.index;
	};

	TurtleMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addOkButton();
		this.addAdd();
		this.addCloseButton();
		this.addGrid();
		this.addTitle();
	};
	
	TurtleMenu.prototype.destroy = function() {
		this.model.changeSignal.remove(this.onChanged, this);
		this.grid.destroy();
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return TurtleMenu;
	
});
	

