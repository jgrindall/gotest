
define(['app/game', 'app/components/scroller', 'app/components/groupmarker'],

function(Game, Scroller, GroupMarker){
	
	"use strict";
	
	var Pager = function(options){
		options.snapX = Game.w();
		Scroller.call(this, options);
		this.pageSignal = new Phaser.Signal();
	};
	
	Pager.prototype = Object.create(Scroller.prototype);
	Pager.prototype.constructor = Pager;
	
	Pager.prototype.addChildren = function(){
		var numPages;
		Scroller.prototype.addChildren.call(this);
		numPages = this.options.dataProvider.getNumPages();
		if(numPages >= 2){
			this.groupMarker = new GroupMarker({"num":numPages});
			this.group.add(this.groupMarker.group);
		}
	};
	
	Pager.prototype.destroy = function() {
		if(this.groupMarker){
			this.groupMarker.destroy();
			this.groupMarker = null;
		}
		this.pageSignal = null;
		Scroller.prototype.destroy.call(this);
	};
	
	Pager.prototype.snap = function() {
		Scroller.prototype.snap.call(this);
		var pageNum = -1 * Math.round(this.contentGroup.x / Game.w());
		if(this.groupMarker){
			this.groupMarker.setSelected(pageNum);
		}
		this.pageSignal.dispatch({"page":pageNum});
	};

	return Pager;

});



