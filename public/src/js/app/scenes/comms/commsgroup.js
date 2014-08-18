define(['app/game','app/scenes/comms/commslayout', 'app/consts/leveldata'], function(Game, CommsLayout, LevelData) {
	
	"use strict";
	
	var CommsGroup = function(game){
		Phaser.Group.call(this, game);
	};
	
	CommsGroup.prototype = Object.create(Phaser.Group.prototype);
	CommsGroup.prototype.constructor = CommsGroup;
	
	CommsGroup.prototype.create = function(){
		this.addGfx();
	};
	
	CommsGroup.prototype.add = function(child){
		Phaser.Group.prototype.add.call(this, child);
		this.addGfx();
	};
	
	CommsGroup.prototype.remove = function(child){
		Phaser.Group.prototype.remove.call(this, child);
		this.addGfx();
	};
	
	CommsGroup.prototype.forEach = function(callback){
		var that = this;
		Phaser.Group.prototype.forEach.call(this, function(sprite){
			if(sprite !== that.gfx){
				callback(sprite);
			}
		});
	};
	
	CommsGroup.prototype.drawGfx = function(){
		this.forEach(function(sprite){
			console.log(sprite.block+" "+sprite.block.id);
		});
		this.gfx.beginFill(0xFF3300);
   		this.gfx.lineStyle(10, 0xffd900, 1);
    	this.gfx.drawRect(CommsLayout.XPOS, 250, Math.random()*40, Math.random()*40);
	};
	
	CommsGroup.prototype.addGfx = function(){
		if(this.gfx){
			this.gfx.destroy();
			Phaser.Group.prototype.remove.call(this, this.gfx);
			this.gfx = null;
		}
		this.gfx = new Phaser.Graphics(Game.getInstance(), 0, 0);
		Phaser.Group.prototype.add.call(this, this.gfx);
		this.drawGfx();
	};

  	return CommsGroup;
});




