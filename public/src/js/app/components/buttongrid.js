
define(['app/game', 'app/components/container'],function(Game, Container){
	
	"use strict";
	
	var ButtonGrid = function(options){
		Container.call(this, options);
		this.data = this.options.data || [];
		this.spaceX = this.bounds.w / this.options.numX;
		this.spaceY = this.bounds.h / this.options.numY;
		this.marginX = (this.spaceX - this.options.buttonClass.WIDTH)/2;
		this.marginY = (this.spaceY - this.options.buttonClass.HEIGHT)/2;
		this.signal = new Phaser.Signal();
		this.buttons = [];
		this.create();
	};
	
	ButtonGrid.prototype = Object.create(Container.prototype);
	ButtonGrid.prototype.constructor = ButtonGrid;
	
	ButtonGrid.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addButtons();
	};
	
	ButtonGrid.prototype.addBg = function(){
		if(this.options.bgAsset){
			this.bg = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgAsset);
			this.group.add(this.bg);
		}
	};
	
	ButtonGrid.prototype.addButtons = function(){
		var pos, i, j, b, n = 0, options;
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		for(i = 1; i <= this.options.numY; i++){
			for(j = 1; j <= this.options.numX; j++){
				pos = {"x":this.bounds.x + this.spaceX * (j - 1), "y":this.bounds.y + this.spaceY * (i - 1)};
				pos.x += this.marginX;
				pos.y += this.marginY;
				options = {"bounds":pos, "index":n, "data":this.data[n]};
				b = new this.options.buttonClass(options);
				b.mouseUpSignal.add(this.buttonUp, this);
				this.buttonGroup.add(b.group || b.sprite);
				this.buttons.push(b);
				n++;
			}
		}
		this.group.add(this.buttonGroup);
	};
	
	ButtonGrid.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.buttonGroup.destroy(true);
		this.bg = null;
		this.buttons = [];
		this.signal = null;
	};
	
	ButtonGrid.prototype.select = function(index) {
		this.signal.dispatch({"index":index, "grid":this});
	};
	
	ButtonGrid.prototype.buttonUp = function(data) {
		var target = data.target.group || data.target.sprite;
		var index = this.buttonGroup.getIndex(target);
		this.select(index);
	};
	
	return ButtonGrid;

});



