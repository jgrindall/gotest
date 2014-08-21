
define(['phaser'],

function(Phaser){
	
	"use strict";
	
	var AbstractModel  = function(){
		this.changeSignal = new Phaser.Signal();
	};
	
	AbstractModel.prototype.trigger = function(command) {
		this.changeSignal.dispatch(this.getData());
	};
	
	AbstractModel.prototype.getData = function() {
		return {};
	};
	
	AbstractModel.prototype.destroy = function(command) {
		this.changeSignal.dispose();
		this.changeSignal = null;
	};
	
	return AbstractModel;

});
	
