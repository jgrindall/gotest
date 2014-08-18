
define(['app/game', 'app/components/container', 'app/consts/colors'],

function(Game, Container, Colors){
	
	"use strict";
	
	var Paths  = function(options){
		Container.call(this, options);
		this.currentPos = {x:300, y:300};
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
	
	Paths.prototype.setHeading = function(command) {
		if(command === 0){
			this.newPos = {x:this.currentPos.x - 50, y:this.currentPos.y - 50};
		}
		else if(command === 1){
			this.newPos = {x:this.currentPos.x, y:this.currentPos.y - 50};
		}
		else if(command === 2){
			this.newPos = {x:this.currentPos.x + 50, y:this.currentPos.y - 50};
		}
	};
	
	Paths.prototype.execute = function(command, fraction) {
		var px, py;
		if(fraction === 0){
			this.setHeading(command);
		}
		this.gfx.lineStyle(6, Colors.GREEN, 1);
   		this.gfx.moveTo(this.currentPos.x, this.currentPos.y);
   		px =  this.currentPos.x + fraction * (this.newPos.x - this.currentPos.x);
   		py =  this.currentPos.y + fraction * (this.newPos.y - this.currentPos.y);
   		this.gfx.lineTo(px, py);
   		this.gfx.lineStyle(0, 0, 0);
   		this.gfx.beginFill(Colors.GREEN, 1);
		this.gfx.drawCircle(px, py, 3);
   		this.currentPos = {x:px, y:py};
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
	
