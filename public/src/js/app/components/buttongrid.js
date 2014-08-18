
define(['app/game', 'app/components/container'],function(Game, Container){
	
	"use strict";
	
	var ButtonGrid = function(options){
		Container.call(this, options);
		this.config = this.options.config || [];
		this.spaceX = this.bounds.w / this.options.numX;
		this.spaceY = this.bounds.h / this.options.numY;
		this.marginX = (this.spaceX - this.options.buttonClass.WIDTH)/2;
		this.marginY = (this.spaceY - this.options.buttonClass.HEIGHT)/2;
		this.signal = new Phaser.Signal();
	};
	
	ButtonGrid.prototype = Object.create(Container.prototype);
	ButtonGrid.prototype.constructor = ButtonGrid;
	
	ButtonGrid.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addButtons();
	};
	
	ButtonGrid.prototype.addBg = function(){
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, 'panel');
		this.group.add(this.panel);
	};
	
	ButtonGrid.prototype.addButtons = function(){
		var pos, i, j, b, n = 0;
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		for(i = 1; i <= this.options.numY; i++){
			for(j = 1; j <= this.options.numX; j++){
				pos = {"x":this.bounds.x + this.spaceX * (j - 1), "y":this.bounds.y + this.spaceY * (i - 1)};
				pos.x += this.marginX;
				pos.y += this.marginY;
				b = new this.options.buttonClass({"bounds":pos, "index":n, "state":this.config[n]});
				b.create();
				b.mouseUpSignal.add(this.buttonUp, this);
				this.buttonGroup.add(b.group);
				n++;
			}
		}
		this.group.add(this.buttonGroup);
	};
	
	ButtonGrid.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
	};
	
	ButtonGrid.prototype.buttonUp = function(data) {
		var index = this.buttonGroup.getIndex(data.target.group);
		this.signal.dispatch({"index":index, "grid":this});
	};
	
	return ButtonGrid;

});



