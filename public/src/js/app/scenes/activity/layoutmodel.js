
define(['app/game', 'app/scenes/activity/abstractmodel',

'app/scenes/activity/commandtypes'],

function(Game, AbstractModel,

CommandTypes){
	
	"use strict";
	
	var LayoutModel  = function(){
		AbstractModel.call(this);
		this.type = CommandTypes.NSEW;
	};
	
	LayoutModel.prototype = Object.create(AbstractModel.prototype);
	LayoutModel.prototype.constructor = LayoutModel;
	
	LayoutModel.prototype.getData = function() {
		return {"type":this.type};
	};
	
	LayoutModel.prototype.load = function() {
		this.changeSignal.dispatch({"type":this.type});
	};
	
	LayoutModel.prototype.setType = function(i) {
		if(this.type !== i){
			this.type = i;
			this.trigger();
		}
	};
	
	return new LayoutModel();

});
