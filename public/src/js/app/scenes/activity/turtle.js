
define(['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Turtle  = function(options){
		console.log("turtle "+JSON.stringify(options));
		Container.call(this, options);
		console.log("turtle "+JSON.stringify(options));
		this.create();
	};
	
	Turtle.prototype = Object.create(Container.prototype);
	Turtle.prototype.constructor = Turtle;
	
	Turtle.prototype.addImage = function() {
		this.sprite = new Phaser.Image(Game.getInstance(), 100, 100, 'turtle');
		this.group.add(this.sprite);
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
	
