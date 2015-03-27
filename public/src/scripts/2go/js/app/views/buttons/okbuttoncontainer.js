
define(['phasercomponents', 'base/assets',

	'base/views/buttons/okbutton', 'phaser'],

	function(PhaserComponents, Assets,

		OkButton, Phaser){
	
	"use strict";
	
	var OkButtonContainer = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	OkButtonContainer.WIDTH = 180;
	OkButtonContainer.HEIGHT = 100;

	PhaserComponents.Utils.extends(OkButtonContainer, PhaserComponents.Display.Container);

	OkButtonContainer.prototype.buttonUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};

	OkButtonContainer.prototype.addButton = function(){
		this.button = new OkButton({'bounds':this.bounds});
		this.button.mouseUpSignal.add(this.buttonUp, this);
		this.group.add(this.button.sprite);
	};
	
	OkButtonContainer.prototype.addYes = function(){
		this.yes = new Phaser.Sprite(this.game, this.bounds.x + 74, this.bounds.y + 23, Assets.YES);
		this.smile = new Phaser.Sprite(this.game, this.bounds.x + 71, this.bounds.y + 21, Assets.SMILE);
		this.group.add(this.smile);
		this.group.add(this.yes);
		this.yes.scale = {'x':0.425, 'y':0.425};
		this.yes.animations.add('play');
    	this.yes.animations.play('play', 17, true);
	};

	OkButtonContainer.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addButton();
		this.addYes();
	};

	OkButtonContainer.prototype.destroy = function(){
		this.group.remove(this.button.sprite);
		this.button.mouseUpSignal.remove(this.buttonUp, this);
		this.button.destroy();
		this.button = null;
		this.mouseUpSignal.dispose();
		this.mouseUpSignal = null;
		this.group.remove(this.yes);
		this.yes = null;
		this.group.remove(this.smile);
		this.smile = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};

	return OkButtonContainer;
	
});
