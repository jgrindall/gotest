
define(['app/game'], function(Game){
	
	"use strict";
	
	var MultiButton = function(options){
		this.options = options;
		this.mouseUpSignal = new Phaser.Signal();
		this.create();
	};

	MultiButton.prototype.goToFrame = function(i){
		this.sprite.animations.play('frame'+i);
	};
	
	MultiButton.prototype.enableInput = function(){
		this.sprite.inputEnabled = true;
	};
	
	MultiButton.prototype.disableInput = function(){
		this.sprite.inputEnabled = false;
	};
	
	MultiButton.prototype.create = function(){
		var i;
		this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
		this.sprite.x = this.options.bounds.x;
		this.sprite.y = this.options.bounds.y;
		Game.getInstance().input.onUp.add(this.mouseUp, this);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 500, true);	
		}
		this.enableInput();
	};

	MultiButton.prototype.mouseUp = function(data){
		var input, hits, pointer, localPoint, p, frame;
		if(!this.sprite.inputEnabled){
			return;
		}
		input = Game.getInput();
		pointer = input.activePointer;
		localPoint = input.getLocalPosition(this.sprite, pointer);
		hits = input.hitTest(this.sprite, pointer, localPoint)
		if(hits){
			p = localPoint.x / this.options.bounds.w;
			frame = Math.floor(this.options.num * p);
			this.goToFrame(frame);
			this.mouseUpSignal.dispatch({"num":frame});
		}
	};
	
	MultiButton.prototype.destroy = function(){
		this.sprite.inputEnabled = false;
		this.sprite.destroy(true);
		this.mouseUpSignal = null;
	};

	return MultiButton;

});

