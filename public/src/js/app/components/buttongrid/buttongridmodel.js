
define('app/components/buttongrid/buttongridmodel',['app/models/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var ButtonGridModel  = function(){
		AbstractModel.call(this);
		this.selected = null;
	};
	
	ButtonGridModel.prototype = Object.create(AbstractModel.prototype);
	ButtonGridModel.prototype.constructor = ButtonGridModel;
	
	ButtonGridModel.prototype.getData = function(){
		return {"selected":this.selected, "grid":this.grid};
	};
	
	ButtonGridModel.prototype.setData = function(n) {
		this.setSelected(n);
	};
	
	ButtonGridModel.prototype.setSelected = function(i) {
		if(this.selected !== i){
			this.selected = i;
			this.trigger();
		}
	};
	
	return ButtonGridModel;

});
	
