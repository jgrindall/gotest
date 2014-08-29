
define(['app/game', 'app/components/container',

'app/activity//models/bgmodel'],

function(Game, Container,

bgModel){
	
	"use strict";
	
	var Map  = function(options){
		bgModel.changeSignal.add(this.onChanged, this);
		Container.call(this, options);
	};
	
	Map.prototype = Object.create(Container.prototype);
	Map.prototype.constructor = Map;
	
	Map.prototype.onChanged = function(data) {
		this.updateImage();	
	};
	
	Map.prototype.updateImage = function() {
		var bg = bgModel.getData().bg;
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite = null;
		}
		if(bg !== null){
			this.sprite = new Phaser.Image(Game.getInstance(), this.bounds.x, this.bounds.y, 'map'+bg);
			this.sprite.scale = {x:this.bounds.w/this.sprite.width, y:this.bounds.h/this.sprite.height};
			this.group.add(this.sprite);
		}
	};
	
	Map.prototype.create = function() {
		Container.prototype.create.call(this);
		this.updateImage();	
	};
	
	Map.prototype.destroy = function() {
		this.sprite.destroy(true);
	};
	
	return Map;

});
	
