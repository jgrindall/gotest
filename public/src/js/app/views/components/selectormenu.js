
define('app/views/components/selectormenu',['app/components/buttons/closebutton', 

'app/components/buttons/okbutton', 'phasercomponents'

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
	
	SelectorMenu.prototype = Object.create(PhaserComponents.Display.AbstractPopup.prototype);
	SelectorMenu.prototype.constructor = SelectorMenu;
	
	SelectorMenu.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addCloseButton();
		this.addOkButton();
	};
	
	SelectorMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT - 20};
		this.addButton(OkButton, bounds);
	};
	
	SelectorMenu.prototype.destroy = function () {
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	SelectorMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - 50, "y":this.bounds.y + 10};
		this.addButton(CloseButton, bounds);
	};
	
	return SelectorMenu;
	
});



