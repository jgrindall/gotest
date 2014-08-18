
define(['app/game', 'app/components/scroller', 'app/components/groupmarker'],function(Game, Scroller, GroupMarker){
	
	"use strict";
	
	var Pager = function(options){
		options.snapX = Game.w();
		Scroller.call(this, options);
	};
	
	Pager.prototype = Object.create(Scroller.prototype);
	Pager.prototype.constructor = Pager;
	
	Pager.prototype.addChildren = function(){
		Scroller.prototype.addChildren.call(this);
		this.groupMarker = new GroupMarker({"num":this.options.dataProvider.getNumPages()});
		this.groupMarker.create();
		Game.getInstance().world.add(this.groupMarker.group);
	};
	
	Pager.prototype.destroy = function() {
		Scroller.prototype.destroy.call(this);
		this.groupMarker = null;
	};
	
	Pager.prototype.snap = function() {
		Scroller.prototype.snap.call(this);
		var pageNum = -1 * Math.round(this.group.x / Game.w());
		if(this.groupMarker){
			this.groupMarker.setSelected(pageNum);
		}
	};

	return Pager;

});



