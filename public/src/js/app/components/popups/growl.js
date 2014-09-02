
define('app/components/popups/growl',['app/game', 'app/components/buttons/tickbutton',

'app/components/popups/abstractpopup', 'app/text/textfactory',

'app/components/buttons/okbutton', 'app/components/buttons/closebutton'],

function(Game, TickButton,

AbstractPopup, TextFactory,

OkButton, CloseButton){
	
	"use strict";
		
	var Growl = function(options){
		options.bgasset = 'alert';
		AbstractPopup.call(this, options);
	};
	
	Growl.prototype = Object.create(AbstractPopup.prototype);
	Growl.prototype.constructor = Growl;
	
	Growl.WIDTH = 400;
	Growl.HEIGHT = 200;
	
	Growl.prototype.addOk = function () {
		this.addButton(TickButton, 'bottom', 0, 1);
	};
	
	Growl.prototype.addText = function () {
		this.label = TextFactory.make(Game.cx() - 150, this.bounds.y + 20, this.options.data.label, TextFactory.SMALL);
		this.group.add(this.label);
	};
	
	Growl.prototype.showMe = function () {
		Game.getInstance().add.tween(this.group).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
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
		AbstractPopup.prototype.create.call(this);
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
		AbstractPopup.prototype.destroy.call(this);
	};
	
	return Growl;
	
});
	





