
define(['phaser', 'app/models/modelconsts',

	'phasercomponents', 'app/assets'],

function(Phaser, ModelConsts,

PhaserComponents, Assets){
	
	"use strict";
	
	var Map  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.BG).changeSignal.add(this.updateImage, this);
		this.modelFacade.get(ModelConsts.BG_PNG).changeSignal.add(this.updatePngImage, this);
	};
	
	PhaserComponents.Utils.extends(Map, PhaserComponents.Display.Container);
	
	Map.EDITOR_KEY = 'bgEditorImage';

	Map.prototype.updateImage = function(value) {
		if(value !== null){
			var bg = this.modelFacade.get(ModelConsts.BG).get();
			this.addMapUsingKey(Assets.MAPS[bg]);
		}
	};

	Map.prototype.updatePngImage = function(pngData) {
		var img;
		if(pngData !== null){
			img = new Image();
			img.src = pngData;
			this.game.cache.addImage(Map.EDITOR_KEY, pngData, img);
			this.addYourImage();
		}
	};

	Map.prototype.addMapUsingKey = function(key) {
		var p = 5;
		this.removeSprite();
		this.bg = new Phaser.Image(this.game, this.bounds.x + p, this.bounds.y + p, key);
		this.bg.scale = {'x':(this.bounds.w - 2*p)/this.bg.width, 'y':(this.bounds.h - 2*p)/this.bg.height};
		this.group.add(this.bg);
	};

	Map.prototype.addYourImage = function() {
		this.addMapUsingKey(Map.EDITOR_KEY);
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
		this.modelFacade.get(ModelConsts.BG).changeSignal.remove(this.updateImage, this);
		this.modelFacade.get(ModelConsts.BG_PNG).changeSignal.remove(this.updatePngImage, this);
		this.removeSprite();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Map;

});
	
