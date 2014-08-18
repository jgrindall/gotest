define([], function(){
	
	"use strict";
	
	var ObjectState = function(body){
		this.body = body;
		this.state = null;
	};

	ObjectState.MAX_SPEED = 16;
	ObjectState.MAX_VX = 0.1;
	
	ObjectState.UP = 			"U";
	ObjectState.UPRIGHT = 		"UR";
	ObjectState.UPLEFT = 		"UL";
	ObjectState.RIGHT = 		"R";
	ObjectState.LEFT = 			"L";
	
	ObjectState.prototype.setState = function(s){
		this.state = s;
	};
	
	ObjectState.prototype.getState = function(){
		return this.state;
	};

	ObjectState.prototype.matches = function(char){
		return (this.state && this.state.indexOf(char) >= 0);
	};

	ObjectState.prototype.isLeft = function(){
		return this.matches(ObjectState.LEFT);
	};

	ObjectState.prototype.isRight = function(){
		return this.matches(ObjectState.RIGHT);
	};

	ObjectState.prototype.isUp = function(){
		return this.matches(ObjectState.UP);
	};

	ObjectState.prototype.remove = function(char){
		if(this.state){
			this.state = this.state.replace(char, "");
		}
	};

	ObjectState.prototype.isStill = function(){
		var v = this.body.velocity;
		var speed = this.body.speed;
		var still = (speed <= ObjectState.MAX_SPEED && Math.abs(v.x) <= ObjectState.MAX_VX && this.body.blocked.down);
		return still;
	};

	return ObjectState;
	
});

