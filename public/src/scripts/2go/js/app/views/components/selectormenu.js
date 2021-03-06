
define(['base/views/buttons/closebutton', 'base/assets',

'base/views/buttons/okbuttoncontainer', 'phasercomponents'

],

function(CloseButton, Assets,

OkButtonContainer, PhaserComponents

){
	
	"use strict";
		
	var SelectorMenu = function(options){
		options.bgasset = Assets.PANEL;
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	SelectorMenu.WIDTH = 800;
	SelectorMenu.HEIGHT = 600;
	
	PhaserComponents.Utils.extends(SelectorMenu, PhaserComponents.Display.AbstractPopup);

	SelectorMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addCloseButton();
		this.addOkButton();
	};
	
	SelectorMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT + 4};
		this.addButton(OkButtonContainer, bounds);
	};
	
	SelectorMenu.prototype.destroy = function () {
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	SelectorMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH, "y":this.bounds.y};
		this.addButton(CloseButton, bounds);
	};
	
	return SelectorMenu;
	
});



