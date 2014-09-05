
define('app/components/scroller/pager',[ 'phasercomponents', 'app/components/scroller/groupmarker'],

function(PhaserComponents, GroupMarker){
	
	"use strict";
	
	var Pager = function(options){
		PhaserComponents.Scroller.call(this, options);
		if(options.snapX !== this.game.w){
			throw "should snap to game width";
		}
	};
	
	Pager.prototype = Object.create(PhaserComponents.Scroller.prototype);
	Pager.prototype.constructor = Pager;
	
	Pager.prototype.addChildren = function(){
		PhaserComponents.Scroller.prototype.addChildren.call(this);
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
		PhaserComponents.Scroller.prototype.destroy.call(this);
	};
	
	Pager.prototype.updateMarker = function() {
		if(this.groupMarker){
			this.groupMarker.setSelected(this.pageNum);
		}
	};
	
	Pager.prototype.gotoPage = function(p) {
		PhaserComponents.Scroller.prototype.gotoPage.call(this, p);
		this.updateMarker();
	};

	return Pager;

});



