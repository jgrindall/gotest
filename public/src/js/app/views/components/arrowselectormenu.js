
define(['app/views/buttons/arrowbutton',

'app/views/components/selectormenu', 'app/views/buttons/markerbutton',

'phasercomponents', 'app/assets'

],

function(ArrowButton, 

SelectorMenu, MarkerButton,

PhaserComponents, Assets)

{
	
	"use strict";
		
	var ArrowSelectorMenu = function(options){
		SelectorMenu.call(this, options);
		this.selectedPage = null;
		this.selectedIndex = null;
	};
	
	PhaserComponents.Utils.extends(ArrowSelectorMenu, SelectorMenu);
	
	ArrowSelectorMenu.prototype.addArrows = function () {
		var x, w, d;
		x = this.bounds.x;
		w = this.bounds.w;
		d = (this.game.w - w)/2;
		if(this.options.dataProvider.getNumPages() >= 2){
			this.leftButton = new ArrowButton({"data":{"num":0, "visible":true}, "bounds":{'x':d - 20 - ArrowButton.WIDTH, 'y':this.game.cy - ArrowButton.HEIGHT/2}});
			this.rightButton = new ArrowButton({"data":{"num":1, "visible":true}, "bounds":{'x':d + w + 20, 'y':this.game.cy - ArrowButton.HEIGHT/2}});
			this.group.add(this.leftButton.view);
			this.group.add(this.rightButton.view);
			this.addArrowListeners();
		}
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
	
	ArrowSelectorMenu.prototype.addTitle = function() {
		this.label = PhaserComponents.TextFactory.make('medium', this.game, this.bounds.x + 20, this.bounds.y + 8, this.options.label);
 		this.group.add(this.label);
	};

	ArrowSelectorMenu.prototype.create = function () {
		SelectorMenu.prototype.create.call(this);
		this.addPager();
		this.addArrows();
		this.addTitle();
		this.group.bringToTop(this.buttonGroup);
	};
	
	ArrowSelectorMenu.prototype.addPager = function () {
		var options = $.extend(!{}, this.options, {'markerButtonClass':MarkerButton,'bgasset':Assets.PANEL, 'snapX':this.game.w});
		this.pager = new PhaserComponents.Display.Pager(options);
		this.pager.pageSignal.add(this.choose, this);
		this.pager.selectSignal.add(this.onSelected, this);
		this.group.add(this.pager.view);
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


