define(['app/game', 'app/components/buttons/controlbutton', 'app/components/buttons/pausebutton', 'app/components/container'],

function(Game, ControlButton, PauseButton, Container){
	
	"use strict";
	
	var Controls = function(options){
		Container.call(this, options);
		this.upSignal = new Phaser.Signal();
		this.downSignal = new Phaser.Signal();
		this.buttons = [];
		this.create();
	};
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;

	Controls.prototype.disableAll = function () {
		$.each(this.buttons, function(i, b){
			b.goToFrame(3);
			b.disableInput();
		});
	};
	
	Controls.prototype.enableAll = function () {
		$.each(this.buttons, function(i, b){
			b.resetFrames();
			b.enableInput();
		});
	};
	
	Controls.prototype.create = function () {
		Container.prototype.create.call(this);
		//this.group.fixedToCamera = true;
		var that = this, y, assets = ['left', 'right', 'up', 'down'];
		y = Game.h() - ControlButton.HEIGHT;
		$.each(new Array(4), function(i) {
			var x, pos, b;
			x = 100 + ControlButton.WIDTH * i;
			pos = {"x":x, "y":y, 'asset':assets[i]};
			b = new ControlButton(pos);
			b.mouseUpSignal.add($.proxy(that.controlUp, that));
			that.group.add(b.sprite);
			that.buttons.push(b);
		}); 
	};
	
	Controls.prototype.controlUp = function (data) {
		var index = this.group.getIndex(data.target.sprite);
		this.disableAll();
		this.upSignal.dispatch({"index":index});
	};
	
	Controls.prototype.destroy = function() {
		var that = this;
		$.each(this.buttons, function(i, b){
			b.mouseUpSignal.removeAll(this);
		});
    	Container.prototype.destroy.call(this);
	};
	
	return Controls;
	
});


