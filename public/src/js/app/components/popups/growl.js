
define('app/components/popups/growl',[ 'app/components/buttons/tickbutton',

'phasercomponents', 'app/text/textfactory',

'app/components/buttons/okbutton', 'app/components/buttons/closebutton'],

function(TickButton,

PhaserComponents, TextFactory,

OkButton, CloseButton){
	
	"use strict";
		
	var Growl = function(options){
		options.bgasset = 'alert';
		PhaserComponents.AbstractPopup.call(this, options);
	};
	
	Growl.prototype = Object.create(PhaserComponents.AbstractPopup.prototype);
	Growl.prototype.constructor = Growl;
	
	Growl.WIDTH = 400;
	Growl.HEIGHT = 200;
	
	Growl.prototype.addOk = function () {
		this.addButton(TickButton, 'bottom', 0, 1);
	};
	
	Growl.prototype.addText = function () {
		this.label = TextFactory.make(this.game, this.game.cx - 150, this.bounds.y + 20, this.options.label, TextFactory.SMALL);
		this.group.add(this.label);
	};
	
	Growl.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h/2 - OkButton.HEIGHT/2};
		this.addButton(OkButton, bounds);
	};
	
	Growl.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 50, "y":this.bounds.y + 10};
		this.addButton(CloseButton, bounds);
	};
	
	Growl.prototype.create = function () {
		PhaserComponents.AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addOkButton();
		this.addCloseButton();
	};
	
	Growl.prototype.destroy = function() {
		var that = this;
		this.buttons.forEach(function(b, i){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		PhaserComponents.AbstractPopup.prototype.destroy.call(this);
	};
	
	return Growl;
	
});
	





