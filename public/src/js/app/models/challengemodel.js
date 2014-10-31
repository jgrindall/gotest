
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ChallengeModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		var that = this;
		this.hit = [];
		this.changeSignal.add(this.onChange, this);
	};
	
	PhaserComponents.Utils.extends(ChallengeModel, PhaserComponents.Model.ToggleModel);
	
	ChallengeModel.prototype.verifyPoint = function(p){
		this.hit.push(p);
		console.log("hit", this.hit);
	};

	ChallengeModel.prototype.check = function(p){
		if(this.get() !== null){
			this.verifyPoint(p);
		}
	};

	ChallengeModel.prototype.onChange = function(){
		this.hit = [];
	};

	ChallengeModel.prototype.destroy = function(){
		this.changeSignal.remove(this.onChange, this);
		PhaserComponents.Model.AbstractModel.prototype.destroy.call(this);
	}

	return ChallengeModel;

});
	
