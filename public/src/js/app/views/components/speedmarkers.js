
define(['phasercomponents', 'app/models/modelfacade', 'app/consts/commspeed'],

function(PhaserComponents, ModelFacade, CommSpeed){
	
	"use strict";
	
	var SpeedMarkers  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.resizeHandler = this.onResize.bind(this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.resizeHandler);
		this.modelFacade.get(ModelFacade.SPEED).changeSignal.add(this.speedChanged, this);
		this.clickSignal = new Phaser.Signal();
	};

	SpeedMarkers.WIDTH = 			40;
	SpeedMarkers.HEIGHT = 			40;
	SpeedMarkers.NUM_FRAMES = 		8;
	SpeedMarkers.SHOW_WIDTH = 		960;
	SpeedMarkers.FPS = 				14;

	PhaserComponents.Utils.extends(SpeedMarkers, PhaserComponents.Display.Container);
	
	SpeedMarkers.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.decor0 = new Phaser.Sprite(this.game, this.bounds.x - SpeedMarkers.WIDTH, this.bounds.y, 					this.options.asset, SpeedMarkers.NUM_FRAMES*0);
		this.decor1 = new Phaser.Sprite(this.game, this.bounds.x + this.bounds.w, this.bounds.y, 						this.options.asset, SpeedMarkers.NUM_FRAMES*1);
		this.decor2 = new Phaser.Sprite(this.game, this.bounds.x - 2*SpeedMarkers.WIDTH, this.bounds.y, 				this.options.asset, SpeedMarkers.NUM_FRAMES*2);
		this.decor3 = new Phaser.Sprite(this.game, this.bounds.x + this.bounds.w + SpeedMarkers.WIDTH, this.bounds.y, 	this.options.asset, SpeedMarkers.NUM_FRAMES*3);
		this.addAnimations();
		this.group.add(this.decor0);
		this.group.add(this.decor1);
		this.group.add(this.decor2);
		this.group.add(this.decor3);
		this.enableInput();
		this.onResize();
	};

	SpeedMarkers.prototype.onResize = function(){
		var vis = (this.game.w >= SpeedMarkers.SHOW_WIDTH);
		this.decor2.visible = vis;
		this.decor3.visible = vis;
	};

	SpeedMarkers.prototype.addAnimations = function(){
		var frames0 = [], frames1 = [], f;
		for(f = 0; f <= SpeedMarkers.NUM_FRAMES - 1; f++){
			frames0.push(f);
			frames1.push(f + SpeedMarkers.NUM_FRAMES);
		}
		frames0.push(0);
		frames1.push(SpeedMarkers.NUM_FRAMES);
		this.decor0.animations.add('play0', frames0, SpeedMarkers.FPS , false);
		this.decor1.animations.add('play1', frames1, SpeedMarkers.FPS , false);
	};

	SpeedMarkers.prototype.speedChanged = function(value){
		if(value === 0){
			this.decor0.animations.play('play0');
		}
		else if(value === CommSpeed.ALL.length - 1){
			this.decor1.animations.play('play1');
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
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.RESIZE, this.resizeHandler);
		this.resizeHandler = null;
		this.decor0.animations.destroy();
		this.decor1.animations.destroy();
		this.modelFacade.get(ModelFacade.SPEED).changeSignal.remove(this.speedChanged, this);
		this.group.remove(this.decor0);
		this.group.remove(this.decor1);
		this.group.remove(this.decor2);
		this.group.remove(this.decor3);
		this.decor0 = null;
		this.decor1 = null;
		this.decor2 = null;
		this.decor3 = null;
		this.clickSignal = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};

	return SpeedMarkers;
});
