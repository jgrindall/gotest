define(['app/game', 'app/scenes/game/enemy'], function(Game, Enemy){
	
	"use strict";
	
	var Enemies = function(options){
		this.options = options;
		this.create();
	};
	
	Enemies.prototype.addEnemy = function () {
		this.enemy = new Enemy(this.options);
		this.group.add(this.enemy.sprite);
	};
	
	Enemies.prototype.create = function () {
		this.group = new Phaser.Group(Game.getInstance());
		this.addEnemy();
		//this.addEnemy();
	};
	
	Enemies.prototype.update = function () {
		this.enemy.update();
	};
	
	Enemies.prototype.destroy = function () {
		this.enemy.destroy();
		this.group.destroy(true);
	};
	
	return Enemies;
	
});
