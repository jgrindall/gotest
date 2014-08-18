
define(['app/game'], function(Game){
	
	"use strict";
	
	var AbstractButton = function(options){
		this.options = options;
		this.asset = this.options.asset;
		this.mouseDownSignal = new Phaser.Signal();
		this.mouseUpSignal = new Phaser.Signal();
	};

	AbstractButton.prototype.goToFrame = function(i){
		this.sprite.setFrames(i, i, i, i);
	};

	AbstractButton.prototype.resetFrames = function(i){
		this.sprite.setFrames(0, 1, 2, 3);
	};

	AbstractButton.prototype.callback = function(){

	};

	AbstractButton.prototype.create = function(){
		//game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
		this.sprite = new Phaser.Button(Game.getInstance(), 0, 0, this.asset, this.callback, this, 0, 1, 2, 3);
		this.sprite.events.onInputUp.add(this.mouseUp, this);
		this.sprite.events.onInputDown.add(this.mouseDown, this);
		this.sprite.x = this.options.x;
		this.sprite.y = this.options.y;
		this.resetFrames();
		this.enableInput();
	};

	AbstractButton.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	AbstractButton.prototype.enableInput = function(){
		this.sprite.inputEnabled = true;
	};
	
	AbstractButton.prototype.disableInput = function(){
		this.sprite.inputEnabled = false;
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

