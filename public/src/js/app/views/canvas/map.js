
define(['phaser', 'app/models/modelfacade',

	'phasercomponents', 'app/assets'],

function(Phaser, ModelFacade,

PhaserComponents, Assets){
	
	"use strict";
	
	var Map  = function(options){
		ModelFacade.getInstance().get(ModelFacade.BG).changeSignal.add(this.updateImage, this);
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Map, PhaserComponents.Display.Container);
	
	Map.prototype.updateImage = function() {
		var bg = ModelFacade.getInstance().get(ModelFacade.BG).get();
		this.removeSprite();
		if(bg !== null){
			this.bg = new Phaser.Image(this.game, this.bounds.x, this.bounds.y, Assets.MAPS[bg]);
			this.bg.scale = {'x':this.bounds.w/this.bg.width, 'y':this.bounds.h/this.bg.height};
			this.group.add(this.bg);
		}
	};
	
	Map.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.updateImage();	
	};
	
	Map.prototype.removeSprite = function() {
		if(this.bg){
			this.group.remove(this.bg);
			this.bg.destroy();
			this.bg = null;
		}
	};

	Map.prototype.destroy = function() {
		ModelFacade.getInstance().get(ModelFacade.BG).changeSignal.remove(this.updateImage, this);
		this.removeSprite();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Map;

});
	
