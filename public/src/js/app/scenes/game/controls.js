define(['app/game', 'app/components/buttons/controlbutton', 'app/components/buttons/pausebutton', 'app/components/container'],

function(Game, ControlButton, PauseButton, Container){
	
	"use strict";
	
	var Controls = function(options){
		Container.call(this, options);
		this.upSignal = new Phaser.Signal();
		this.downSignal = new Phaser.Signal();
		this.buttons = [];
	};
	
	Controls.prototype = Object.create(Container.prototype);
	Controls.prototype.constructor = Controls;

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
			b.create();
			b.mouseDownSignal.add($.proxy(that.controlDown, that));
			b.mouseUpSignal.add($.proxy(that.controlUp, that));
			that.group.add(b.sprite);
			that.buttons.push(b);
		}); 
	};
	
	Controls.prototype.controlDown = function (data) {
		var index = this.group.getIndex(data.target.sprite);
		this.downSignal.dispatch({"index":index});
	};
	
	Controls.prototype.controlUp = function (data) {
		var index = this.group.getIndex(data.target.sprite);
		this.upSignal.dispatch({"index":index});
	};
	
	Controls.prototype.update = function() {
    
	};
	
	return Controls;
	
});


