
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
		this.group.add(this.gfx);
		this.gfx.lineStyle(0, 0x000000, 0);
		this.gfx.beginFill(0xc8c8c8, 0.3);
		this.gfx.drawCircle(300, 300, 90);
		this.gfx.endFill();
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
	
