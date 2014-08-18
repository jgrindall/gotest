
define(['app/game', 'app/components/container', 'app/consts/colors'],

function(Game, Container, Colors){
	
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
   		this.gfx.lineStyle(6, Colors.GREEN, 1);
   		//this.gfx.beginPath();
   		this.gfx.moveTo(100, 100);
   		this.gfx.lineTo(200, 200);
    	//this.gfx.stroke();
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
	
