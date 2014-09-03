
define('app/models/bgmodel',['phasercomponents/models/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var BgModel  = function(){
		AbstractModel.call(this);
		this.bg = null;
	};
	
	BgModel.prototype = Object.create(AbstractModel.prototype);
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
	
	return new BgModel();

});
