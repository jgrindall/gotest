
define(['app/game', 'phaser',

'app/components/buttons/interactivesprite'],

function(Game, Phaser,

InteractiveSprite){
	
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
		this.sprite.enableInput();
	};
	
	MultiButton.prototype.disableInput = function(){
		this.sprite.disableInput();
	};
	
	MultiButton.prototype.create = function(){
		var i;
		console.log("create "+JSON.stringify(this.options));
		this.sprite = new InteractiveSprite(Game.getInstance(), this.options.bounds.x, this.options.bounds.y, this.options.asset);
		this.sprite.name = "colorpicker";
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 500, true);	
		}
		this.sprite.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	MultiButton.prototype.mouseUp = function(data){
		var p, frame;
		p = data.localPoint.x / this.options.bounds.w;
		frame = Math.floor(this.options.num * p);
		this.goToFrame(frame);
		this.mouseUpSignal.dispatch({"num":frame});
	};
	
	MultiButton.prototype.destroy = function(){
		this.disableInput();
		this.sprite.destroy(true);
		this.mouseUpSignal = null;
	};

	return MultiButton;

});

