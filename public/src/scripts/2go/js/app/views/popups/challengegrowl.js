
define(['phaser', 'phasercomponents',

'base/views/buttons/okbuttoncontainer',

'base/views/buttons/closebutton', 'base/assets', 'base/views/buttons/voiceoverbutton'],

function(Phaser, PhaserComponents,

OkButtonContainer,

CloseButton, Assets, VoiceOverButton){
	
	"use strict";
		
	var ChallengeGrowl = function(options){
		options.bgasset = Assets.ALERT;
		PhaserComponents.Display.AbstractPopup.call(this, options);
	};
	
	PhaserComponents.Utils.extends(ChallengeGrowl, PhaserComponents.Display.AbstractPopup);

	ChallengeGrowl.WIDTH = 420;
	ChallengeGrowl.HEIGHT = 250;
	
	ChallengeGrowl.prototype.addText = function () {
		this.label = PhaserComponents.TextFactory.make('small', this.game, this.bounds.x + this.bounds.w/2, this.bounds.y + 75, this.options.label);
		this.label.x -= this.label.width/2;
		this.group.add(this.label);
	};

	ChallengeGrowl.prototype.addImage = function () {
		if(this.options.img){
			this.img = new Phaser.Sprite(this.game, 0, 0, this.options.img);
			this.group.add(this.img);
		}
	};

	ChallengeGrowl.prototype.addTitle = function () {
		this.title = PhaserComponents.TextFactory.make('mediumheader', this.game, this.bounds.x + 20, this.bounds.y + 10, this.options.title);
		this.group.add(this.title);
	};
	
	ChallengeGrowl.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButtonContainer.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h - OkButtonContainer.HEIGHT};
		this.addButton(OkButtonContainer, bounds);
	};
	
	ChallengeGrowl.prototype.addCloseButton = function () { 
		var bounds = {"x":this.bounds.x + this.bounds.w - 55, "y":this.bounds.y + 1};
		this.addButton(CloseButton, bounds);
	};

	ChallengeGrowl.prototype.addVOButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - 11000000, "y":this.bounds.y};
		this.addButton(VoiceOverButton, bounds);
	};
	
	ChallengeGrowl.prototype.create = function () {
		PhaserComponents.Display.AbstractPopup.prototype.create.call(this);
		this.addText();
		this.addTitle();
		this.addOkButton();
		this.addCloseButton();
		this.addVOButton();
	};
	
	ChallengeGrowl.prototype.destroy = function() {
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
	
	return ChallengeGrowl;
	
});
	





