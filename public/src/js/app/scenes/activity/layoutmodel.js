
define(['app/game', 'app/scenes/activity/abstractmodel',

'app/scenes/activity/commandtypes'],

function(Game, AbstractModel,

CommandTypes){
	
	"use strict";
	
	var LayoutModel  = function(){
		AbstractModel.call(this);
		this.type = null;
	};
	
	LayoutModel.prototype = Object.create(AbstractModel.prototype);
	LayoutModel.prototype.constructor = LayoutModel;
	
	LayoutModel.prototype.getData = function() {
		return {"type":this.type};
	};
	
	LayoutModel.prototype.setData = function(n) {
		this.setType(n);
	};
	
	LayoutModel.prototype.setType = function(i) {
		if(this.type !== i){
			this.type = i;
			this.trigger();
		}
	};
	
	return new LayoutModel();

});
