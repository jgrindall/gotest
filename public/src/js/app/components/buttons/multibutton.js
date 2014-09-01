
define('app/components/buttons/multibutton',['app/game', 'phaser',

'app/components/interactivesprite'],

function(Game, Phaser,

InteractiveSprite){
	
	"use strict";
	
	var MultiButton = function(options){
		var index;
		this.options = options;
		this.model = this.options.model;
		this.options.model.changeSignal.add(this.onChanged, this);
		this.mouseUpSignal = new Phaser.Signal();
		this.create();
		index = this.model.getData().index;
		if(index !== null){
			this.goToFrame(index);
		}
	};

	MultiButton.prototype.onChanged = function(data){
		this.goToFrame(data.index);
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
		this.sprite = new InteractiveSprite(Game.getInstance(), this.options.bounds.x, this.options.bounds.y, this.options.asset, 'multibutton');
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
		this.model.setData(frame);
	};
	
	MultiButton.prototype.destroy = function(){
		this.disableInput();
		this.model.changeSignal.remove(this.onChanged, this);
		this.model = null;
		this.sprite.destroy(true);
	};

	return MultiButton;

});

