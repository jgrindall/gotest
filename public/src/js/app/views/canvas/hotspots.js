
define(['phaser', 'app/models/modelconsts', 'app/assets',

	'phasercomponents', 'app/consts/challengedata'],

function(Phaser, ModelConsts, Assets,

PhaserComponents, ChallengeData){
	
	"use strict";
	
	var Hotspots  = function(options){
		this.hotspots = [];
		this.tweens = [];
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.CHALLENGE).changeSignal.add(this.onChallengeChange, this);
		this.modelFacade.get(ModelConsts.CHALLENGE).hitSignal.add(this.onHit, this);
	};
	
	PhaserComponents.Utils.extends(Hotspots, PhaserComponents.Display.Container);

	Hotspots.prototype.onChallengeChange = function(value){
		var challenges, i, cPoint, ordered;
		this.removeHotspots();
		if(value !== null){
			challenges = ChallengeData.TARGETS[value];
			ordered = ChallengeData.ORDERED[value];
			for(i = 0; i < challenges.length; i++){
				cPoint = challenges[i];
				this.addHotspotAt(cPoint);
				if(ordered){
					this.hotspots[i].alpha = ( (i === 0) ? 1 : 0.25 );
				}
			}
		}
	};

	Hotspots.prototype.onHit = function(data){
		this.explodeHotspotAt(data.index);
	};

	Hotspots.prototype.showNext = function(i) {
		var gfx, ordered, value;
		value = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		ordered = ChallengeData.ORDERED[value];
		if(ordered){
			gfx = this.hotspots[i + 1];
			if(gfx){
				gfx.alpha = 1;
			}
		}
	};

	Hotspots.prototype.explodeHotspotAt = function(i) {
		var gfx;
		gfx = this.hotspots[i];
		if(gfx && !this.explodeTween){
			this.removeTweenAt(i);
			this.exploding = i;
			this.explodeTween = this.game.add.tween(gfx.scale).to( {'x':7 , 'y':7}, 250, Phaser.Easing.Linear.None, true, 0, false, false);
			this.fadeTween = this.game.add.tween(gfx).to( {'alpha':0}, 250, Phaser.Easing.Linear.None, true, 0, false, false);
			this.explodeTween.onComplete.add(this.onExploded, this);
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.PLAY_SOUND, "data":Assets.SOUNDS[4]});
			this.showNext(i);
		}
	};

	Hotspots.prototype.onExploded = function(){
		this.removeHotspotAt(this.exploding);
		this.exploding = null;
		this.removeExplodeTween();
	};

	Hotspots.prototype.removeExplodeTween = function(){
		if(this.explodeTween){
			this.explodeTween.stop();
			this.fadeTween.stop();
			this.explodeTween.onComplete.dispose();
			this.explodeTween = null;
			this.fadeTween = null;
		}
	};

	Hotspots.prototype.addHotspotAt = function(p) {
		var gfx, tween, scale, delay, time;
		gfx = this.getHotspot();
		this.group.add(gfx);
		gfx.x = p.x;
		gfx.y = p.y;
		scale = 1.01 + Math.random()*0.04;
		delay = Math.random()*200;
		time = Math.random()*120 + 150;
		tween = this.game.add.tween(gfx.scale).to( {'x':scale , 'y':scale}, time, Phaser.Easing.Linear.None, true, delay, Number.MAX_VALUE, true);
		this.hotspots.push(gfx);
		this.tweens.push(tween);
	};

	Hotspots.prototype.getHotspot = function() {
		var gfx, radius;
		radius = ChallengeData.RADIUS - 4;
		gfx = new Phaser.Graphics(this.game, 0, 0);
		gfx.lineStyle(0, 0x000000, 0);
		gfx.beginFill(0xFFEFCE, 0.35);
		gfx.drawCircle(0, 0, ChallengeData.RADIUS);
		gfx.beginFill(0xFFFFFF, 0.3);
		gfx.drawCircle(0, 0, radius);
		gfx.endFill();
		gfx.mask = this.mask;
		return gfx;
	};

	Hotspots.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMask();
	};
	
	Hotspots.prototype.addMask = function(){
		this.mask = new Phaser.Graphics(this.game, 0, 0);
		this.mask.beginFill(0xff0000, 0);
		this.mask.visible = false;
    	this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    	this.mask.endFill();
    	this.group.add(this.mask);
	};

	Hotspots.prototype.removeMask = function(){
		this.group.remove(this.mask);
    	this.mask = null;
	};

	Hotspots.prototype.removeHotspotAt = function(i) {
		var gfx = this.hotspots[i];
		if(gfx){
			this.group.remove(gfx);
			gfx.mask = null;
			gfx.destroy();
			gfx = null;
		}
		this.hotspots[i] = null;
	};

	Hotspots.prototype.removeTweenAt = function(i){
		var tween = this.tweens[i];
		if(tween){
			tween.stop();
		}
		this.tweens[i] = null;
	};

	Hotspots.prototype.removeHotspots = function(){
		var i;
		this.removeExplodeTween();
		for(i = 0; i < this.hotspots.length; i++){
			this.removeHotspotAt(i);
			this.removeTweenAt(i);
		}
		this.hotspots = [];
		this.tweens = [];
	};

	Hotspots.prototype.destroy = function() {
		this.modelFacade.get(ModelConsts.CHALLENGE).changeSignal.remove(this.onChallengeChange, this);
		this.modelFacade.get(ModelConsts.CHALLENGE).hitSignal.remove(this.onHit, this);
		this.removeHotspots();
		this.removeExplodeTween();
		this.hotspots = null;
		this.tweens = null;
		this.removeMask();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Hotspots;

});
	
