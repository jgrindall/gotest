
define(['app/components/buttons/tabbutton', 'app/game', 'app/components/container'],

function(TabButton, Game, Container){
	
	"use strict";
	
	var Tabs = function(options){
		Container.call(this, options);
		this.locData = this.options.locData;
		this.commsData = this.options.commsData;
		this.selectSignal = new Phaser.Signal();
		this.buttons = [];
	};
	
	Tabs.prototype = Object.create(Container.prototype);
	Tabs.prototype.constructor = Tabs;

	Tabs.prototype.loadLevel = function(){
		var that = this, levelData = this.locData.levelData, b;
		$.each(new Array(levelData.tabs), function(i) {
			var pos;
			pos = {"x":that.options.bounds.x + i * TabButton.WIDTH, "y":0 , "num":i};
			b = new TabButton(pos);
			b.create();
			if(i === 1){
				b.goToFrame(2);
			}
			b.mouseDownSignal.add($.proxy(that.click, that));
			that.group.add(b.sprite);
			that.buttons.push(b);
		}); 
		this.reload();
	};

	Tabs.prototype.selectIndex = function (index) {
		$.each(this.buttons, function(i, button){
			if(i === index){
				button.select();
			}
			else{
				button.deselect();
			}
		});
		this.selectSignal.dispatch({"index":index});
	};

	Tabs.prototype.click = function (data) {
		var index = this.group.getIndex(data.target.sprite);
		this.selectIndex(index);
	};

	Tabs.prototype.init = function () {
		var index = this.commsData.selectedIndex;
		this.selectIndex(index);
	};

	Tabs.prototype.create = function () {
		Container.prototype.create.call(this);
	};

	Tabs.prototype.reload = function(){

	};

	Tabs.prototype.onDown = function() {
		console.log("down");
	};

	Tabs.prototype.update = function() {
    
	};

	Tabs.prototype.shutdown = function(){
		//TODO, clean up
	};
	
	return Tabs;
	
});

