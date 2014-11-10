
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
		//window.alert("loading from "+pngData.substring(0, 50));
		var img, that = this;
		if(pngData !== null){
			img = new Image();
			img.onload = function(){
				that.game.cache.addImage(Map.EDITOR_KEY, pngData, img);
				that.addYourImage();
				img.onload = null;
			};
			//window.alert("loading from "+pngData.substring(0, 50));
			img.src = pngData;
		}
	};

	Map.prototype.addBacking = function() {
		this.gfx = new Phaser.Graphics(this.game, 0, 0);
		this.group.add(this.gfx);
		this.gfx.lineStyle(0, 0x000000, 0);
		this.gfx.beginFill(0xc8c8c8, 1);
		this.gfx.drawRect(1, 1, this.bounds.w - 1, this.bounds.h - 1);
		this.gfx.endFill();
	};

	Map.prototype.removeBacking = function(){
		this.group.remove(this.gfx);
		this.gfx = null;
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
		this.addBacking();
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
		this.removeBacking();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Map;

});
	
