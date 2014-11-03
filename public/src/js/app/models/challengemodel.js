
define(['phasercomponents', 'app/consts/challengedata',

	'app/events/events'],

function(PhaserComponents, ChallengeData,

	Events){
	
	"use strict";
	
	var ChallengeModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.hit = [];
		this.shown = false;
		this.changeSignal.add(this.onChange, this);
	};
	
	PhaserComponents.Utils.extends(ChallengeModel, PhaserComponents.Model.ToggleModel);
	
	ChallengeModel.prototype.setChallenge = function(i){
		this.shown = false;
		this.hit = [];
		this.set(i);
	};

	ChallengeModel.prototype.reset = function(){
		this.shown = false;
		this.hit = [];
		this.set(null);
	};

	ChallengeModel.prototype.challengeHit = function(p0, p1){
		var dx, dy, d;
		dx = p0.x - p1.x;
		dy = p0.y - p1.y;
		d = dx*dx + dy*dy;
		return (d < ChallengeData.TOLERANCE_SQUARED);
	};

	ChallengeModel.prototype.verifyPoint = function(p){
		var i, cPoint, challenges;
		challenges = ChallengeData.TARGETS[this.get()];
		if(challenges && challenges.length >=1 ){
			for(i = 0; i < challenges.length; i++){
				cPoint = challenges[i];
				if(this.challengeHit(p, cPoint)){
					this.hit[i] = true;
				}
			}
			this.checkAllHit();
		}
	};

	ChallengeModel.prototype.checkAllHit = function(){
		var i, challenges;
		challenges = ChallengeData.TARGETS[this.get()];
		if(challenges && challenges.length >=1 ){
			for(i = 0; i < challenges.length; i++){
				if(!this.hit[i]){
					return false;
				}
			}
		}
		this.shown = true;
		this.eventDispatcher.trigger({"type":Events.CHALLENGE_DONE});
	};

	ChallengeModel.prototype.check = function(p){
		if(this.get() !== null && !this.shown){
			this.verifyPoint(p);
		}
	};

	ChallengeModel.prototype.onChange = function(){

	};

	ChallengeModel.prototype.onChange = function(){
		this.hit = [];
	};

	ChallengeModel.prototype.destroy = function(){
		this.changeSignal.remove(this.onChange, this);
		PhaserComponents.Model.AbstractModel.prototype.destroy.call(this);
	};

	return ChallengeModel;

});
	
