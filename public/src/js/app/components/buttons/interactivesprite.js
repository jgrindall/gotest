
define(['phaser'], function(Phaser){
	
	"use strict";
	
	var InteractiveSprite = function(game, x, y, asset){
		Phaser.Sprite.call(this, game, x, y, asset);
		this.mouseUpSignal = new Phaser.Signal();
		this.mouseDownSignal = new Phaser.Signal();
	};
	
	InteractiveSprite.prototype = Object.create(Phaser.Sprite.prototype);
	InteractiveSprite.prototype.constructor = InteractiveSprite;
	
	InteractiveSprite.prototype.addListeners = function(){
		this.game.input.onUp.add(this.onMouseUp, this);
		this.game.input.onDown.add(this.onMouseDown, this);
	};
	
	InteractiveSprite.prototype.removeListeners = function(){
		this.game.input.onUp.remove(this.onMouseUp, this);
		this.game.input.onDown.remove(this.onMouseDown, this);
	};
	
	InteractiveSprite.prototype.enableInput = function(){
		if(!this.inputEnabled){
			this.inputEnabled = true;
			this.addListeners();
		}
	};
	
	InteractiveSprite.prototype.disableInput = function(){
		if(this.inputEnabled && this.game.input){
			this.removeListeners();
			this.inputEnabled = false;
		}
	};

	InteractiveSprite.prototype.hitData = function(data){
		var input, hits, pointer, localPoint;
		input = this.game.input;
		if(!this.inputEnabled){
			return {'hits':false};
		}
		pointer = input.activePointer;
		localPoint = input.getLocalPosition(this, pointer);
		hits = input.hitTest(this, pointer, localPoint);
		return  {'hits':hits, 'localPoint':localPoint};
	};
	
	InteractiveSprite.prototype.onMouseUp = function(){
		var hitData = this.hitData();
		if(hitData.hits){
			this.mouseUpSignal.dispatch({"localPoint":hitData.localPoint});
		}
	};
	
	InteractiveSprite.prototype.onMouseDown = function(){
		var hitData = this.hitData();
		if(hitData.hits){
			this.mouseDownSignal.dispatch({"localPoint":hitData.localPoint});
		}
	};
	
	InteractiveSprite.prototype.destroy = function(children){
		this.disableInput();
		this.mouseDownSignal.dispose();
		this.mouseUpSignal.dispose();
		Phaser.Sprite.prototype.destroy.call(this, children);
	};

	return InteractiveSprite;

});

