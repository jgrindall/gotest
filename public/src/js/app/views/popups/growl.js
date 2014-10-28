
define(['phaser', 'phasercomponents',

'app/views/buttons/okbuttoncontainer',

'app/views/buttons/closebutton', 'app/assets'],

function(Phaser, PhaserComponents,

OkButtonContainer,

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

	Growl.prototype.addImage = function () {
		if(this.options.img){
			this.img = new Phaser.Sprite(this.game, 0, 0, this.options.img);
			this.group.add(this.img);
		}
	};

	Growl.prototype.addTitle = function () {
		this.title = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 20, this.bounds.y + 10, this.options.title);
		this.group.add(this.title);
	};
	
	Growl.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT};
		this.addButton(OkButtonContainer, bounds);
	};
	
	Growl.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 55, "y":this.bounds.y + 1};
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
		this.group.remove(this.title);
		this.group.remove(this.label);
		if(this.img){
			this.group.remove(this.img);
		}
		this.img = null;
		this.title = null;
		this.label = null;
		PhaserComponents.Display.AbstractPopup.prototype.destroy.call(this);
	};
	
	return Growl;
	
});
	





