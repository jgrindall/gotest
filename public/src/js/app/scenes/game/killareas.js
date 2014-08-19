define(['app/game', 'app/scenes/game/killarea'], function(Game, KillArea){
	
	"use strict";
	
	var KillAreas = function(options){
		this.options = options;
		this.create();
	};
	
	KillAreas.prototype.addKillArea = function () {
		this.killarea = new KillArea(this.options);
		this.group.add(this.killarea.sprite);
	};
	
	KillAreas.prototype.create = function () {
		this.group = new Phaser.Group(Game.getInstance());
		this.addKillArea();
	};
	
	KillAreas.prototype.update = function () {
		this.killarea.update();
	};
	
	return KillAreas;
	
});
