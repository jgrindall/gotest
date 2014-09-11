
define('app/views/canvas/map',['phaser', 'app/models/modelfacade', 'phasercomponents'],

function(Phaser, ModelFacade,

PhaserComponents){
	
	"use strict";
	
	var Map  = function(options){
		ModelFacade.getInstance().get(ModelFacade.BG).changeSignal.add(this.onChanged, this);
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Map, PhaserComponents.Display.Container);
	
	Map.prototype.onChanged = function() {
		this.updateImage();	
	};
	
	Map.prototype.updateImage = function() {
		var bg = ModelFacade.getInstance().get(ModelFacade.BG).get();
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite = null;
		}
		if(bg !== null){
			this.sprite = new Phaser.Image(this.game, this.bounds.x, this.bounds.y, 'map'+bg);
			this.sprite.scale = {x:this.bounds.w/this.sprite.width, y:this.bounds.h/this.sprite.height};
			this.group.add(this.sprite);
		}
	};
	
	Map.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.updateImage();	
	};
	
	Map.prototype.destroy = function() {
		this.sprite.destroy(true);
	};
	
	return Map;

});
	
