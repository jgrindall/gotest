
define(['phaser'], function(Phaser){
	
	"use strict";
	
	var InteractiveSprite = function(game, x, y, asset){
		Phaser.Sprite.call(this, game, x, y, asset);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	InteractiveSprite.prototype = Object.create(Phaser.Sprite.prototype);
	InteractiveSprite.prototype.constructor = InteractiveSprite;
	
	InteractiveSprite.prototype.enableInput = function(){
		if(!this.inputEnabled){
			this.inputEnabled = true;
			this.game.input.onUp.add(this.onMouseUp, this);
		}
	};
	
	InteractiveSprite.prototype.disableInput = function(){
		if(this.inputEnabled && this.game.input){
			this.game.input.onUp.remove(this.onMouseUp, this);
			this.inputEnabled = false;
		}
	};

	InteractiveSprite.prototype.onMouseUp = function(data){
		var input, hits, pointer, localPoint;
		input = this.game.input;
		if(!this.inputEnabled){
			return;
		}
		pointer = input.activePointer;
		localPoint = input.getLocalPosition(this, pointer);
		hits = input.hitTest(this, pointer, localPoint);
		if(hits){
			this.mouseUpSignal.dispatch({"localPoint":localPoint});
		}
	};
	
	InteractiveSprite.prototype.destroy = function(children){
		this.disableInput();
		Phaser.Sprite.prototype.destroy.call(this, children);
	};

	return InteractiveSprite;

});

