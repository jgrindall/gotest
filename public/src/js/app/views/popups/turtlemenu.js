
define(['phasercomponents',

'app/views/buttons/okbutton', 'app/views/buttons/closebutton',

'app/assets', 'app/views/buttons/addbutton',

'app/views/popups/turtlechoice'],

function(PhaserComponents, 

OkButton, CloseButton,

Assets, AddButton,

TurtleChoice){
	
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
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT + 3};
		this.addButton(OkButton, bounds);
	};
	
	TurtleMenu.prototype.addAdd = function () {
		var middle = this.bounds.x + this.bounds.w - AddButton.WIDTH + 14;
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - AddButton.HEIGHT + 4};
		this.addButton(AddButton, bounds);
	};

	TurtleMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH - 10, "y":this.bounds.y };
		this.addButton(CloseButton, bounds);
	};

	TurtleMenu.prototype.getData = function() {
		return {"index":this.selectedIndex};
	};

	TurtleMenu.prototype.addGrid = function() {
		var options, bounds;
		bounds = {'x':this.bounds.x, 'y':this.bounds.y + 30, 'w':this.bounds.w, 'h':this.bounds.h - 31};
		options = {"model":this.model, "bounds":bounds, "numX": 4, "numY": 1, "buttonClass": TurtleChoice};
		this.grid = new PhaserComponents.Display.ButtonGrid(options);
		this.grid.clickSignal.add(this.onChanged, this);
		this.group.add(this.grid.group);
	};

	TurtleMenu.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 10, this.bounds.y + 7, "Choose a turtle!");
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
	

