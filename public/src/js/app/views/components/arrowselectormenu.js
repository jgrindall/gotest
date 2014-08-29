
define(['app/game', 'app/components/buttons/arrowbutton',

'app/views/components/selectormenu', 'app/components/container',

'app/components/scroller/pager'

],

function(Game, ArrowButton, 

SelectorMenu, Container,

Pager)

{
	
	"use strict";
		
	var ArrowSelectorMenu = function(options){
		SelectorMenu.call(this, options);
		this.selectedPage = null;
		this.selectedIndex = null;
	};
	
	ArrowSelectorMenu.prototype = Object.create(SelectorMenu.prototype);
	ArrowSelectorMenu.prototype.constructor = ArrowSelectorMenu;
	
	ArrowSelectorMenu.prototype.addArrows = function () {
		if(this.options.dataProvider.getNumPages() >= 2){
			this.leftButton = new ArrowButton({"data":{"num":0, "visible":true}, "bounds":{'x':20, 'y':Game.cy()}});
			this.rightButton = new ArrowButton({"data":{"num":1, "visible":true}, "bounds":{'x':Game.w() - 60, 'y':Game.cy()}});
			this.leftButton.sprite.alpha = 0;
			this.rightButton.sprite.alpha = 0;
			this.group.add(this.leftButton.sprite);
			this.group.add(this.rightButton.sprite);
			this.addArrowListeners();
			this.showArrows();
		}
	};
	
	ArrowSelectorMenu.prototype.showArrows = function () {
		this.leftTween = Game.getInstance().add.tween(this.leftButton.sprite).to( {alpha: 1}, 700, Phaser.Easing.Linear.None, true, 1000, false);
		this.rightTween = Game.getInstance().add.tween(this.rightButton.sprite).to( {alpha: 1}, 700, Phaser.Easing.Linear.None, true, 1000, false);
		this.leftTween.onComplete.add(this.onArrowsShown, this);
	};
	
	ArrowSelectorMenu.prototype.onArrowsShown = function () {
		this.leftButton.disableInput();
		this.leftTween.onComplete.remove(this.onArrowsShown, this);
	};
	
	ArrowSelectorMenu.prototype.addArrowListeners = function () {
		this.leftButton.mouseUpSignal.add(this.leftClicked, this);
		this.rightButton.mouseUpSignal.add(this.rightClicked, this);
	};
	
	ArrowSelectorMenu.prototype.gotoPage = function (p) {
		this.pager.gotoPage(p);
	};
	
	ArrowSelectorMenu.prototype.setSelected = function (i) {
		this.pager.setSelected(i);
	};
	
	ArrowSelectorMenu.prototype.create = function () {
		SelectorMenu.prototype.create.call(this);
		this.addPager();
		this.addArrows();
		this.group.bringToTop(this.buttonGroup);
	};
	
	ArrowSelectorMenu.prototype.addPager = function () {
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
	
	ArrowSelectorMenu.prototype.removePager = function () {
		if(this.pager){
			this.pager.pageSignal.remove(this.choose, this);
			this.pager.selectSignal.remove(this.onSelected, this);
			this.pager.destroy();
			this.pager = null;
		}
	};
	
	ArrowSelectorMenu.prototype.removeTweens = function () {
		if(this.leftTween){
			this.leftTween.onComplete.remove(this.onArrowsShown, this);
			this.leftTween.stop();
			this.leftTween = null;
		}
		if(this.rightTween){
			this.rightTween.stop();
			this.rightTween = null;
		}
	};
	
	ArrowSelectorMenu.prototype.removeButtons = function () {
		if(this.leftButton){
			this.leftButton.destroy();
			this.leftButton = null;
		}
		if(this.rightButton){
			this.rightButton.destroy();
			this.rightButton = null;
		}
	};
	
	ArrowSelectorMenu.prototype.destroy = function () {
		this.removePager();
		this.removeTweens();
		this.removeButtons();
		SelectorMenu.prototype.destroy.call(this);
	};

	return ArrowSelectorMenu;
	
});


