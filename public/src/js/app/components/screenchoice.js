
define('app/components/screenchoice',['phaser', 'phasercomponents'

],

function(Phaser, PhaserComponents

){
	
	"use strict";
	
	var ScreenChoice = function(options){
		options.asset = 'smallpanel';
		PhaserComponents.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	ScreenChoice.WIDTH = 225;
	ScreenChoice.HEIGHT = 250;
	
	ScreenChoice.prototype = Object.create(PhaserComponents.Container.prototype);
	ScreenChoice.prototype.constructor = ScreenChoice;
	
	ScreenChoice.prototype.create = function(){
		PhaserComponents.Container.prototype.create.call(this);
		this.addBg();
	};
	
	ScreenChoice.prototype.select = function(){
		this.panel.sprite.alpha = 1;
	};
	
	ScreenChoice.prototype.deselect = function(){
		this.panel.sprite.alpha = 0.4;
	};
	
	ScreenChoice.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ScreenChoice.prototype.addBg = function(){
		console.log("sc addbg "+JSON.stringify(this.options));
		this.panel = new PhaserComponents.InteractiveSprite(this.options);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel.sprite);
	};
	
	ScreenChoice.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.group.remove(this.panel);
		this.panel.destroy(true);
		PhaserComponents.Container.prototype.destroy.call(this);
	};
	
	return ScreenChoice;

});



