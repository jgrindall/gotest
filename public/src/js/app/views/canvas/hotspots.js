
define(['phaser', 'app/models/modelconsts',

	'phasercomponents', 'app/assets'],

function(Phaser, ModelConsts,

PhaserComponents, Assets){
	
	"use strict";
	
	var Hotspots  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		var a = Assets;
		var b = ModelConsts;
		console.log(a, b);
		//this.modelFacade.get(ModelConsts.BG).changeSignal.add(this.updateImage, this);
	};
	
	PhaserComponents.Utils.extends(Hotspots, PhaserComponents.Display.Container);

	Hotspots.prototype.addHotspot = function() {
		this.gfx = new Phaser.Graphics(this.game, 0, 0);
		this.gfx.lineStyle(4, 0xF3E5AB, 0.5);
		this.gfx.beginFill(0xc8c8c8, 0.3);
		this.gfx.drawCircle(0, 0, 90);
		this.gfx.endFill();
		this.gfx.pivot.setTo(45, 45);
		this.group.add(this.gfx);
		this.gfx.x = 300;
		this.gfx.y = 300;
		this.pulse = this.game.add.tween(this.gfx.scale).to( {'x': 1.025, 'y':1.025}, 300, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
	};

	Hotspots.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addHotspot();
	};
	
	Hotspots.prototype.removeHotspot = function() {
		if(this.gfx){
			this.group.remove(this.gfx);
			this.gfx.destroy();
			this.gfx = null;
		}
	};

	Hotspots.prototype.destroy = function() {
		//this.modelFacade.get(ModelConsts.BG).changeSignal.remove(this.updateImage, this);
		this.removeHotspot();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Hotspots;

});
	
