
define(['app/game', 'app/components/scroller', 'app/components/groupmarker'],

function(Game, Scroller, GroupMarker){
	
	"use strict";
	
	var Pager = function(options){
		options.snapX = Game.w(); // has to be this!
		console.log("pager options "+JSON.stringify(options));
		Scroller.call(this, options);
	};
	
	Pager.prototype = Object.create(Scroller.prototype);
	Pager.prototype.constructor = Pager;
	
	Pager.prototype.addChildren = function(){
		Scroller.prototype.addChildren.call(this);
		var numPages = this.numPages();
		if(numPages >= 2){
			this.groupMarker = new GroupMarker({"num":numPages});
			this.group.add(this.groupMarker.group);
		}
	};
	
	Pager.prototype.numPages = function() {
		return this.options.dataProvider.getNumPages();
	};
	
	Pager.prototype.destroy = function() {
		if(this.groupMarker){
			this.groupMarker.destroy();
			this.groupMarker = null;
		}
		Scroller.prototype.destroy.call(this);
	};
	
	Pager.prototype.updateMarker = function() {
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



