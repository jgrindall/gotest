define('app/prog/buttonview', ['app/assets'], function(Assets){
	
	"use strict";

	var ButtonView = function(game, options){
		this.game = game;
		this.options = options;
		this.mouseDownSignal = new Phaser.Signal();
		this.create();
	};

	ButtonView.prototype.onMouseDown = function(){
		this.mouseDownSignal.dispatch({"target":this});
	};

	ButtonView.prototype.create = function(){
		this.sprite = new Phaser.Sprite(this.game, this.options.bounds.x, this.options.bounds.y, Assets.CLOSE);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(this.onMouseDown, this);
	};

	return ButtonView;

});

