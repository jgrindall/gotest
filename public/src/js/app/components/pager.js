
define(['app/game', 'app/components/scroller', 'app/components/groupmarker'],

function(Game, Scroller, GroupMarker){
	
	"use strict";
	
	var Pager = function(options){
		options.snapX = Game.w(); // has to be this
		Scroller.call(this, options);
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
	
	Pager.prototype.updateMarker = function() {
		console.log("pager update "+this.pageNum);
		if(this.groupMarker){
			this.groupMarker.setSelected(this.pageNum);
		}
	};
	
	Pager.prototype.gotoPage = function(p) {
		Scroller.prototype.gotoPage.call(this, p);
		this.updateMarker();
	};

	return Pager;

});



