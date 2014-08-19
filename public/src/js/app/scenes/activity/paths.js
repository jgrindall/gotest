
define(['app/game', 'app/components/container', 'app/consts/colors'],

function(Game, Container, Colors){
	
	"use strict";
	
	var Paths  = function(options){
		Container.call(this, options);
		this.color = 0;
		this.create();
	};
	
	Paths.WIDTH = 6;
	
	Paths.prototype = Object.create(Container.prototype);
	Paths.prototype.constructor = Paths;
	
	Paths.prototype.setColor = function(i) {
		console.log("set "+i);
		this.color = i;
	};
	
	Paths.prototype.removeGfx = function() {
		if(this.gfx){
			this.gfx.destroy();
			this.group.remove(this, this.gfx);
			this.gfx = null;
		}
	};
	
	Paths.prototype.line = function(p0, p1) {
		var c = Colors.ALL[this.color];
		this.gfx.lineStyle(Paths.WIDTH, c, 1);
   		this.gfx.moveTo(p0.x, p0.y);
   		this.gfx.lineTo(p1.x, p1.y);
   		//TODO this.gfx.lineStyle(0, 0, 0);
   		//this.gfx.beginFill(c, 1);
		//this.gfx.drawCircle(p1.x, p1.y, Paths.WIDTH/2);
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
	
	Paths.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGfx();
	};
	
	Paths.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.removeGfx();
	};
	
	return Paths;

});
	
