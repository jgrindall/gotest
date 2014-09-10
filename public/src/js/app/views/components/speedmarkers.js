
define('app/views/components/speedmarkers',['phasercomponents', 'app/assets'

],

function(PhaserComponents, ModelFacade, Assets){
	
	"use strict";
	
	var SpeedMarkers  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.clickSignal = new Phaser.Signal();
	};

	SpeedMarkers.WIDTH = 50;
	SpeedMarkers.HEIGHT = 85;
	
	PhaserComponents.Utils.extends(SpeedMarkers, PhaserComponents.Display.Container);
	
	SpeedMarkers.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.decor0 = new Phaser.Sprite(this.game, this.bounds.x - 40, this.bounds.y, this.options.asset, 0);
		this.decor1 = new Phaser.Sprite(this.game, this.bounds.x + this.bounds.w, this.bounds.y, this.options.asset, 1);
		this.group.add(this.decor0);
		this.group.add(this.decor1);
		this.decor0.inputEnabled = true;
		this.decor1.inputEnabled = true;
		this.decor0.events.onInputUp.add(this.onMouseUp0, this);
		this.decor1.events.onInputUp.add(this.onMouseUp1, this);
	};

	SpeedMarkers.prototype.onMouseUp0 = function(){
		this.clickSignal.dispatch({"index":0});
	};

	SpeedMarkers.prototype.onMouseUp1 = function(){
		this.clickSignal.dispatch({"index":1});
	};

	SpeedMarkers.prototype.destroy = function(){
		this.decor0.events.onInputUp.remove(this.onMouseUp0, this);
		this.decor1.events.onInputUp.remove(this.onMouseUp1, this);
		this.group.remove(this.decor0);
		this.group.remove(this.decor1);
		this.decor0 = null;
		this.decor1 = null;
		this.clickSignal = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};

	return SpeedMarkers;
});
