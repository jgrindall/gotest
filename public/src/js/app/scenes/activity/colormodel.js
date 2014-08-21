
define(['app/game', 'app/scenes/activity/abstractmodel'],

function(Game, AbstractModel){
	
	"use strict";
	
	var ColorModel  = function(){
		AbstractModel.call(this);
		this.color = 0;
	};
	
	ColorModel.prototype = Object.create(AbstractModel.prototype);
	ColorModel.prototype.constructor = ColorModel;
	
	ColorModel.prototype.getData = function(){
		return {"color":this.color};
	};
	
	ColorModel.prototype.setColor = function(i) {
		if(this.color != i){
			this.color = i;
			this.trigger();
		}
	};
	
	return new ColorModel();

});
	
