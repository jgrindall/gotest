
define(['app/game', 'app/components/buttons/dirbutton',

'app/scenes/activity/selectormenu', 'app/components/container', 'app/components/pager'

],

function(Game, DirButton, 

SelectorMenu, Container, Pager)

{
	
	"use strict";
		
	var ArrowSelectorMenu = function(options){
		SelectorMenu.call(this, options);
	};
	
	ArrowSelectorMenu.prototype = Object.create(SelectorMenu.prototype);
	ArrowSelectorMenu.prototype.constructor = ArrowSelectorMenu;
	
	ArrowSelectorMenu.prototype.addNavigation = function () {
		if(this.options.dataProvider.getNumPages() >= 2){
			this.leftButton = new DirButton({"data":{"num":3, "visible":true}, "bounds":{'x':20, 'y':Game.cy()}});
			this.leftButton.mouseUpSignal.add(this.leftClicked, this);
			this.rightButton = new DirButton({"data":{"num":5, "visible":true}, "bounds":{'x':Game.w() - 60, 'y':Game.cy()}});
			this.rightButton.mouseUpSignal.add(this.rightClicked, this);
			this.group.add(this.leftButton.sprite);
			this.group.add(this.rightButton.sprite);
			this.leftButton.disableInput();
		}
	};
	
	ArrowSelectorMenu.prototype.gotoPage = function (p) {
		this.pager.gotoPage(p);
	};
	
	ArrowSelectorMenu.prototype.setSelected = function (i) {
		this.pager.setSelected(i);
	};
	
	ArrowSelectorMenu.prototype.addUI = function () {
		var options = $.extend({}, this.options, {'bgasset':'panel'});
		this.pager = new Pager(options);
		this.pager.pageSignal.add(this.choose, this);
		this.pager.selectSignal.add(this.onSelected, this);
		this.group.add(this.pager.group);
	};
	
	ArrowSelectorMenu.prototype.onSelected = function (data) {
		this.selectedPage = data.page;
		this.selectedIndex = data.index;
	};
	
	ArrowSelectorMenu.prototype.getData = function () {
		return {"selectedPage":this.selectedPage, "selectedIndex": this.selectedIndex};
	};
	
	ArrowSelectorMenu.prototype.enableButtons = function () {
		if(this.leftButton){
			if(this.selectedPage>=1){
				this.leftButton.enableInput();
			}
			else{
				this.leftButton.disableInput();
			}
		}
		if(this.rightButton){
			if(this.selectedPage <= this.pager.numPages() - 2){
				this.rightButton.enableInput();
			}
			else{
				this.rightButton.disableInput();
			}
		}
	};
	
	ArrowSelectorMenu.prototype.choose = function (data) {
		this.selectedPage = data.pageNum;
		this.enableButtons();
	};
	
	ArrowSelectorMenu.prototype.leftClicked = function () {
		this.pager.prev();
	};
	
	ArrowSelectorMenu.prototype.rightClicked = function () {
		this.pager.next();
	};
	
	ArrowSelectorMenu.prototype.destroy = function () {
		if(this.pager){
			this.pager.pageSignal.remove(this.choose, this);
			this.pager.selectSignal.remove(this.onSelected, this);
			this.pager.destroy();
		}
		if(this.leftButton){
			this.leftButton.destroy();
			this.leftButton = null;
		}
		if(this.rightButton){
			this.rightButton.destroy();
			this.rightButton = null;
		}
		this.pager = null;
		SelectorMenu.prototype.destroy.call(this);
	};

	return ArrowSelectorMenu;
	
});


