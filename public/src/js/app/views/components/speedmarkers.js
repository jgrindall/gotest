
define(['phasercomponents', 'app/models/modelfacade', 'app/consts/commspeed'],

function(PhaserComponents, ModelFacade, CommSpeed){
	
	"use strict";
	
	var SpeedMarkers  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.SPEED).changeSignal.add(this.speedChanged, this);
		this.clickSignal = new Phaser.Signal();
	};

	SpeedMarkers.WIDTH = 50;
	SpeedMarkers.HEIGHT = 85;
	
	PhaserComponents.Utils.extends(SpeedMarkers, PhaserComponents.Display.Container);
	
	SpeedMarkers.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.decor0 = new Phaser.Sprite(this.game, this.bounds.x - 40, this.bounds.y, this.options.asset, 0);
		this.decor1 = new Phaser.Sprite(this.game, this.bounds.x + this.bounds.w, this.bounds.y, this.options.asset, 1);
		//this.decor0.animations.add('play', [1, 2, 3, 4], 300, true);
		//this.decor1.animations.add('play', [1, 2, 3, 4], 300, true);
		this.group.add(this.decor0);
		this.group.add(this.decor1);
		this.enableInput();
	};

	SpeedMarkers.prototype.speedChanged = function(value){
		if(value === 0){
			//this.decor0.animate();
		}
		else if(value === CommSpeed.ALL.length - 1){
			//this.decor1.animate();
		}
	};

	SpeedMarkers.prototype.enableInput = function(){
		if(!this.decor0.inputEnabled){
			this.decor0.inputEnabled = true;
			this.decor1.inputEnabled = true;
			this.decor0.events.onInputUp.add(this.onMouseUp0, this);
			this.decor1.events.onInputUp.add(this.onMouseUp1, this);
		}
	};

	SpeedMarkers.prototype.disableInput = function(){
		if(this.decor0.inputEnabled){
			this.decor0.events.onInputUp.remove(this.onMouseUp0, this);
			this.decor1.events.onInputUp.remove(this.onMouseUp1, this);
			this.decor0.inputEnabled = false;
			this.decor1.inputEnabled = false;
		}
	};

	SpeedMarkers.prototype.onMouseUp0 = function(){
		this.clickSignal.dispatch({"index":0});
	};

	SpeedMarkers.prototype.onMouseUp1 = function(){
		this.clickSignal.dispatch({"index":1});
	};

	SpeedMarkers.prototype.destroy = function(){
		this.disableInput();
		ModelFacade.getInstance().get(ModelFacade.SPEED).changeSignal.remove(this.speedChanged, this);
		this.group.remove(this.decor0);
		this.group.remove(this.decor1);
		this.decor0 = null;
		this.decor1 = null;
		this.clickSignal = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};

	return SpeedMarkers;
});
