
define(['app/game', 'app/scenes/activity/abstractmodel'],

function(Game, AbstractModel){
	
	"use strict";
	
	var BgModel  = function(){
		AbstractModel.call(this);
		this.bg = 0;
	};
	
	BgModel.prototype = Object.create(AbstractModel.prototype);
	BgModel.prototype.constructor = BgModel;
	
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
