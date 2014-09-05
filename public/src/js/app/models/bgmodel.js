
define('app/models/bgmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var BgModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.bg = null;
	};
	
	BgModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	BgModel.prototype.constructor = BgModel;
	
	BgModel.prototype.setData = function(n) {
		this.setBg(n);
	};
	
	BgModel.prototype.getData = function() {
		return {"bg":this.bg};
	};
	
	BgModel.prototype.setBg = function(i) {
		if(this.bg !== i){
			this.bg = i;
			this.trigger();
		}
	};
	
	return BgModel;

});
