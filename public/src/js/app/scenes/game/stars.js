define(['app/game', 'app/scenes/game/star'], function(Game, Star){
	
	"use strict";
	
	var Stars = function(options){
		this.options = options;
		this.create();
	};
	
	Stars.prototype.addStar = function (option) {
		var star = new Star(option);
		this.group.add(star.sprite);
	};
	
	Stars.prototype.create = function () {
		var that = this;
		this.group = new Phaser.Group(Game.getInstance());
		$.each(this.options, function(i, option){
			that.addStar(option);
		});
	};
	
	Stars.prototype.update = function () {
		
	};
	
	Stars.prototype.destroy = function () {
		this.group.destroy(true);	
	};
	
	return Stars;
	
});
