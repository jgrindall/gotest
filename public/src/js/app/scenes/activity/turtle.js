
define(['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Turtle  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Turtle.prototype = Object.create(Container.prototype);
	Turtle.prototype.constructor = Turtle;
	
	Turtle.prototype.addImage = function() {
		this.sprite = new Phaser.Image(Game.getInstance(), 300, 300, 'turtle');
		this.group.add(this.sprite);
		this.sprite.anchor.setTo(0.5, 0.5);
	};
	
	Turtle.prototype.move = function(p, theta) {
		this.sprite.x = p.x;
		this.sprite.y = p.y;
		this.sprite.angle = theta + 90;
	};

	Turtle.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addImage();
	};
	
	Turtle.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.sprite.destroy(true);
	};
	
	return Turtle;

});
	
