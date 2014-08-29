
define(['app/game'], function(Game){
	
	"use strict";
	
	var AbstractButton = function(options){
		this.options = options;
		this.frames = options.frames || [0, 1, 2, 3];
		this.mouseDownSignal = new Phaser.Signal();
		this.mouseUpSignal = new Phaser.Signal();
		this.create();
	};

	AbstractButton.prototype.goToFrame = function(i){
		this.sprite.setFrames(this.frames[i], this.frames[i], this.frames[i], this.frames[i]);
	};

	AbstractButton.prototype.resetFrames = function(i){
		this.sprite.setFrames(this.frames[0], this.frames[1], this.frames[2], this.frames[3]);
	};

	AbstractButton.prototype.callback = function(){

	};
	
	AbstractButton.prototype.select = function(){
		this.goToFrame(this.frames[1]);
	};

	AbstractButton.prototype.deselect = function(){
		this.goToFrame(this.frames[0]);
	};

	AbstractButton.prototype.create = function(){
		this.sprite = new Phaser.Button(Game.getInstance(), this.options.bounds.x, this.options.bounds.y, this.options.asset, this.callback, this, this.frames[0], this.frames[1], this.frames[2], this.frames[3]);
		this.sprite.events.onInputUp.add(this.mouseUp, this);
		this.sprite.events.onInputDown.add(this.mouseDown, this);
		this.resetFrames();
		this.enableInput();
	};

	AbstractButton.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	AbstractButton.prototype.enableInput = function(){
		this.sprite.inputEnabled = true;
		this.sprite.alpha = 1;
		this.sprite.input.useHandCursor = true;
	};
	
	AbstractButton.prototype.disableInput = function(){
		this.sprite.inputEnabled = false;
		this.sprite.alpha = 0.6;
	};
	
	AbstractButton.prototype.mouseDown = function(){
		this.mouseDownSignal.dispatch({"target":this});
	};

	AbstractButton.prototype.update = function(){
	
	};
	
	AbstractButton.prototype.destroy = function(){
		this.sprite.inputEnabled = false;
		this.sprite.destroy(true);
		this.mouseDownSignal = null;
		this.mouseUpSignal = null;
	};

	return AbstractButton;

});

