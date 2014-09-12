
define('app/views/components/selectormenu',['app/views/buttons/closebutton', 

'app/views/buttons/okbutton', 'phasercomponents'

],

function(CloseButton,

OkButton, PhaserComponents

){
	
	"use strict";
		
	var SelectorMenu = function(options){
		options.bgasset = 'panel';
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
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT + 4};
		this.addButton(OkButton, bounds);
	};
	
	SelectorMenu.prototype.destroy = function () {
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	SelectorMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - CloseButton.WIDTH - 10, "y":this.bounds.y};
		this.addButton(CloseButton, bounds);
	};
	
	return SelectorMenu;
	
});



