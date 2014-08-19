define(['app/game', 'app/scenes/game/gunner'],

function(Game, Gunner){
	
	"use strict";
	
	var Gunners = function(options){
		this.options = options;
		this.shootSignal = new Phaser.Signal();
		this.create();
	};
	
	Gunners.prototype.addGunners = function () {
		this.gunner = new Gunner(this.options);
		this.gunner.shootSignal.add(this.shoot, this);
		this.group.add(this.gunner.sprite);
	};
	
	Gunners.prototype.shoot = function (data) {
		var index, gunner;
		index = this.group.getIndex(data.target.sprite);
		gunner = this.gunner;
		this.shootSignal.dispatch({"x":gunner.sprite.x, "y":gunner.sprite.y});
	};
	
	Gunners.prototype.create = function () {
		this.group = new Phaser.Group(Game.getInstance());
		this.addGunners();
	};
	
	Gunners.prototype.update = function () {
		this.gunner.update();
	};
	
	Gunners.prototype.destroy = function () {
		this.gunner.shootSignal.removeAll(this);
		this.gunner.destroy();
		this.group.destroy(true);
	};
	
	return Gunners;
	
});
