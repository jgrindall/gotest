
define(['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Paths  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Paths.prototype = Object.create(Container.prototype);
	Paths.prototype.constructor = Paths;
	
	Paths.prototype.removeGfx = function() {
		if(this.gfx){
			this.gfx.destroy();
			this.group.remove(this, this.gfx);
			this.gfx = null;
		}
	};
	
	Paths.prototype.addGfx = function() {
		this.removeGfx();
		this.gfx = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.group.add(this.gfx);
	}
	
	Paths.prototype.clear = function(){
		this.removeGfx();
		this.addGfx();
	};
	
	Paths.prototype.drawGfx = function(){
		this.gfx.beginFill(0xFF3300);
   		this.gfx.lineStyle(10, 0xffd900, 1);
    	this.gfx.drawRect(50, 250, 100 + Math.random()*40, 100 + Math.random()*40);
	};
	
	Paths.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGfx();
		this.drawGfx();
	};
	
	Paths.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.removeGfx();
	};
	
	return Paths;

});
	
