
define(['phaser', 'app/models/modelconsts',

	'phasercomponents', 'app/consts/challengedata'],

function(Phaser, ModelConsts,

PhaserComponents, ChallengeData){
	
	"use strict";
	
	var Hotspots  = function(options){
		this.hotspots = [];
		this.tweens = [];
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.CHALLENGE).changeSignal.add(this.onChallengeChange, this);
	};
	
	PhaserComponents.Utils.extends(Hotspots, PhaserComponents.Display.Container);

	Hotspots.prototype.onChallengeChange = function(value){
		var challenges, i, cPoint;
		this.removeHotspots();
		if(value !== null){
			challenges = ChallengeData.TARGETS[value];
			for(i = 0; i < challenges.length; i++){
				cPoint = challenges[i];
				this.addHotspotAt(cPoint);
			}
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
		time = Math.random()*75 + 150;
		tween = this.game.add.tween(gfx.scale).to( {'x':scale , 'y':scale}, time, Phaser.Easing.Linear.None, true, delay, Number.MAX_VALUE, true);
		this.hotspots.push(gfx);
		this.tweens.push(tween);
	};

	Hotspots.prototype.getHotspot = function() {
		var gfx = new Phaser.Graphics(this.game, 0, 0);
		gfx.lineStyle(0, 0x000000, 0);
		gfx.beginFill(0xFFEFCE, 0.3);
		gfx.drawCircle(0, 0, ChallengeData.RADIUS);
		gfx.beginFill(0xFFFFFF, 0.25);
		gfx.drawCircle(0, 0, ChallengeData.RADIUS - 4);
		gfx.endFill();
		return gfx;
	};

	Hotspots.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
	};
	
	Hotspots.prototype.removeHotspotAt = function(i) {
		var gfx = this.hotspots[i];
		if(gfx){
			this.group.remove(gfx);
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
		for(i = 0; i < this.hotspots.length; i++){
			this.removeHotspotAt(i);
			this.removeTweenAt(i);
		}
		this.hotspots = [];
		this.tweens = [];
	};

	Hotspots.prototype.destroy = function() {
		this.modelFacade.get(ModelConsts.CHALLENGE).changeSignal.remove(this.onChallengeChange, this);
		this.removeHotspots();
		this.hotspots = null;
		this.tweens = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Hotspots;

});
	
