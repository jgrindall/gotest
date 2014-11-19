
define(['phasercomponents',

'app/assets'],

function(PhaserComponents,

Assets){
	
	"use strict";
		
	var IPad = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(IPad, PhaserComponents.Display.Container);

	IPad.WIDTH = 400;
	IPad.HEIGHT = 400;
	
	IPad.prototype.create = function () {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
		this.addImage();
	};
	
	IPad.prototype.removeImage = function () {
		if(this.panel){
			this.group.remove(this.panel);
			this.panel.destroy();
			this.panel = null;
		}
	};

	IPad.prototype.addImage = function () {
		var x, y;
		x = (this.game.w - IPad.WIDTH)/2;
		y = (this.game.h - IPad.HEIGHT)/2;
		this.panel = new Phaser.Sprite(this.game, x, y, Assets.IPAD);
		this.group.add(this.panel);
	};

	IPad.prototype.removeBg = function () {
		if(this.bg){
			this.group.remove(this.bg);
			this.bg.destroy();
			this.bg = null;
		}
	};

	IPad.prototype.addBg = function () {
		this.bg = new Phaser.Graphics(this.game, 0, 0);
		this.bg.beginFill(0xff0000);
		this.bg.alpha = 1;
    	this.bg.drawRect(0, 0, this.game.w + 100, this.game.h + 100);
    	window.alert(this.game.w+", "+this.game.h);
    	this.bg.endFill();
		this.group.add(this.bg);	
	};

	IPad.prototype.destroy = function() {
		this.removeBg();
		this.removeImage();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return IPad;
	
});
	





