
define(['app/game', 'app/components/container'],function(Game, Container){
	
	"use strict";
	
	var ButtonGrid = function(options){
		this.selectedIndex = -1;
		this.data = options.data || [];
		this.spaceX = options.bounds.w / options.numX;
		this.spaceY = options.bounds.h / options.numY;
		this.marginX = (this.spaceX - options.buttonClass.WIDTH)/2;
		this.marginY = (this.spaceY - options.buttonClass.HEIGHT)/2;
		this.buttons = [];
		Container.call(this, options);
		this.signal = new Phaser.Signal();	
	};
	
	ButtonGrid.prototype = Object.create(Container.prototype);
	ButtonGrid.prototype.constructor = ButtonGrid;
	
	ButtonGrid.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addButtons();
	};
	
	ButtonGrid.prototype.disableAll = function(){
		$.each(this.buttons, function(i, b){
			b.disableInput();
		});
	};
	
	ButtonGrid.prototype.enableAll = function(){
		$.each(this.buttons, function(i, b){
			b.enableInput();
		});
	};
	
	ButtonGrid.prototype.addBg = function(){
		if(this.options.bgasset){
			this.bg = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
			this.group.add(this.bg);
		}
	};
	
	ButtonGrid.prototype.setSelected = function(index) {
		this.selectedIndex = index;
		$.each(this.buttons, function(i, button){
			if(i === index){
				button.select();
			}
			else{
				button.deselect();
			}
		});	
	};
	
	ButtonGrid.prototype.addButtons = function(){
		var pos, i, j, b, n = 0, options;
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		for(i = 1; i <= this.options.numY; i++){
			for(j = 1; j <= this.options.numX; j++){
				pos = {"x":this.bounds.x + this.spaceX * (j - 1), "y":this.bounds.y + this.spaceY * (i - 1)};
				pos.x += this.marginX;
				pos.y += this.marginY;
				options = {"bounds":pos, "index":n, "data":this.data[n], "frames":[0, 1, 2, 3]};
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
		var that = this;
		$.each(this.buttons, function(i, b){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		Container.prototype.destroy.call(this);
		this.buttonGroup.destroy(true);
		this.bg = null;
		this.buttons = [];
		this.signal = null;
	};
	
	ButtonGrid.prototype.select = function(index) {
		this.setSelected(index);
		this.signal.dispatch({"index":index, "grid":this});
	};
	
	ButtonGrid.prototype.buttonUp = function(data) {
		var target = data.target.group || data.target.sprite;
		var index = this.buttonGroup.getIndex(target);
		this.select(index);
	};
	
	return ButtonGrid;

});



