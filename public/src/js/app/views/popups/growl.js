
define('app/views/popups/growl',[ 'app/views/buttons/tickbutton',

'phasercomponents',

'app/views/buttons/okbutton',

'app/views/buttons/closebutton', 'app/assets'],

function(TickButton,

PhaserComponents,

OkButton,

CloseButton, Assets){
	
	"use strict";
		
	var Growl = function(options){
		options.bgasset = Assets.ALERT;
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Growl, PhaserComponents.Display.AbstractPopup);

	Growl.WIDTH = 420;
	Growl.HEIGHT = 250;
	
	Growl.prototype.addText = function () {
		this.label = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + this.bounds.w/2, this.bounds.y + 90, this.options.label);
		this.label.x -= this.label.width/2;
		this.group.add(this.label);
	};

	Growl.prototype.addTitle = function () {
		this.label = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + 20, this.bounds.y + 20, this.options.title);
		this.group.add(this.label);
	};
	
	Growl.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButton.HEIGHT - 20};
		this.addButton(OkButton, bounds);
	};
	
	Growl.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 55, "y":this.bounds.y + 15};
		this.addButton(CloseButton, bounds);
	};
	
	Growl.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addTitle();
		this.addOkButton();
		this.addCloseButton();
	};
	
	Growl.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b, i){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return Growl;
	
});
	





