
define(['phaser', 'app/models/modelconsts',

	'phasercomponents', 'app/assets', 'app/events/events'],

function(Phaser, ModelConsts,

PhaserComponents, Assets, Events){
	
	"use strict";
	
	var Map  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.BG).changeSignal.add(this.updateImage, this);
		this.onEditorDone = this.onEditDone.bind(this);
		this.eventDispatcher.addListener(Events.BG_EDITOR_DONE, this.onEditorDone);
	};
	
	PhaserComponents.Utils.extends(Map, PhaserComponents.Display.Container);
	
	Map.EDITOR_KEY = 'bgEditorImage';

	Map.prototype.onEditDone = function(event, data) {
		var pngData = data.data, img;
		if(pngData){
			img = new Image();
			img.src = pngData;
			this.game.cache.addImage(Map.EDITOR_KEY, pngData, img);
			this.addYourImage();
		}
	};

	Map.prototype.addMapUsingKey = function(key) {
		this.removeSprite();
		var p = 5;
		this.bg = new Phaser.Image(this.game, this.bounds.x + p, this.bounds.y + p, key);
		this.bg.scale = {'x':(this.bounds.w - 2*p)/this.bg.width, 'y':(this.bounds.h - 2*p)/this.bg.height};
		this.group.add(this.bg);
	};

	Map.prototype.addYourImage = function() {
		this.addMapUsingKey(Map.EDITOR_KEY);
	};

	Map.prototype.updateImage = function() {
		var bg = this.modelFacade.get(ModelConsts.BG).get() || 0;
		this.addMapUsingKey(Assets.MAPS[bg]);
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
		this.removeSprite();
		this.eventDispatcher.removeListener(Events.BG_EDITOR_DONE, this.onEditorDone);
		this.onEditorDone = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Map;

});
	
