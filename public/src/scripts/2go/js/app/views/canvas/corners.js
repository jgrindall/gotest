
define(


	['phaser',	'phasercomponents'],

function(Phaser, PhaserComponents){
	
	"use strict";
	
	var Corners  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Corners, PhaserComponents.Display.Container);
	
	Corners.prototype.create = function() {
		var d = 5;
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.top = new Phaser.TileSprite(this.game, this.bounds.x + d, this.bounds.y, this.bounds.w - 2*d, d, this.options.top);
		this.left = new Phaser.TileSprite(this.game, this.bounds.x, this.bounds.y + d, d, this.bounds.h - 2*d, this.options.left);
		this.right = new Phaser.TileSprite(this.game, this.bounds.x + this.bounds.w - d, this.bounds.y + d, d, this.bounds.h - 2*d, this.options.right);
		this.bottom = new Phaser.TileSprite(this.game, this.bounds.x + d, this.bounds.y + this.bounds.h - d, this.bounds.w - 2*d, d, this.options.bottom);
		this.topleft = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.topleft, 0);
		this.topright = new Phaser.Sprite(this.game, this.bounds.x + this.bounds.w - d, this.bounds.y, this.options.topright, 1);
		this.bottomleft = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y + this.bounds.h - d, this.options.bottomleft, 2);
		this.bottomright = new Phaser.Sprite(this.game, this.bounds.x + this.bounds.w - d, this.bounds.y + this.bounds.h - d, this.options.bottomright, 3);
		this.group.add(this.top);
		this.group.add(this.left);
		this.group.add(this.right);
		this.group.add(this.bottom);
		this.group.add(this.topleft);
		this.group.add(this.topright);
		this.group.add(this.bottomleft);
		this.group.add(this.bottomright);
	};
	
	Corners.prototype.destroy = function() {
		this.group.remove(this.top);
		this.group.remove(this.topleft);
		this.group.remove(this.topright);
		this.group.remove(this.bottomleft);
		this.group.remove(this.bottomright);
		this.group.remove(this.left);
		this.group.remove(this.right);
		this.group.remove(this.bottom);
		this.top.destroy(true);
		this.left.destroy(true);
		this.right.destroy(true);
		this.bottom.destroy(true);
		this.topleft.destroy(true);
		this.topright.destroy(true);
		this.bottomleft.destroy(true);
		this.bottomright.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Corners;

});
	
