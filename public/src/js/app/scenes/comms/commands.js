
define(['app/scenes/comms/blocksfactory', 'app/game', 'app/scenes/comms/commslayout', 'app/scenes/comms/commsgroup'],

function(BlocksFactory, Game, CommsLayout, CommsGroup){
	
	"use strict";
	
	var Commands = function(commsData, locData){
		this.mainGroup = null;
		this.targetGroups = [];
		this.locData = locData;
		this.commsData = commsData;
		commsData.layoutSignal.add(this.onLayout, this);
		commsData.tabSignal.add(this.onSelectTab, this);
	};

	Commands.prototype.onSelectTab = function(){
		var index = this.commsData.selectedIndex;
		$.each(this.targetGroups, function(i, group){
			group.visible = (i === index);
		});
		this.currentGroup = this.targetGroups[index];
	};

	Commands.prototype.onLayoutGroup = function(obj){
		var that = this;
		$.each(obj.positions, function(j, pos){
			var block, sprite, index;
			block = that.getBlockByIndexAndType(pos.index, pos.type);
			sprite = block.sprite;
			index = that.mainGroup.getIndex(sprite);
			if(index >= 0){
				// it's in the mainGroup
				that.mainGroup.remove(sprite);
				that.targetGroups[obj.index].add(sprite);
			}
			sprite.x = pos.x;
			sprite.y = pos.y;
		});
		this.update();
	};

	Commands.prototype.onLayout = function(data){
		var that = this;
		$.each(data, function(i, obj){
			that.onLayoutGroup(obj);
		});
	};

	Commands.prototype.loadLevel = function(){
		var i, b, that = this, levelData = this.locData.levelData;
		this.makeGroups(levelData.tabs);
		$.each(levelData.tiles, function(type, v){
			$.each(new Array(v), function(i) {
				b = BlocksFactory.create(type);
				b.create();
				b.clickSignal.add($.proxy(that.blockDown, that));
				b.releaseSignal.add($.proxy(that.blockUp, that));
				b.origPos = {"x":b.sprite.x, "y":b.sprite.y};
				b.id = {"type":type, "index":i};
				that.mainGroup.add(b.sprite);
			});  
		});
		this.commsData.reload(this);
	};

	Commands.prototype.getBlockByIndexAndType = function(index, type){
		var blockFound = null;
		$.each(this.targetGroups, function(i, group){
			group.forEach(function(sprite){
				if(sprite.block.id.type === type && sprite.block.id.index === index){
					blockFound = sprite.block;
				}
			});
		});
		this.mainGroup.forEach(function(sprite){
			if(sprite.block.id.type === type && sprite.block.id.index === index){
				blockFound = sprite.block;
			}
		});
		return blockFound;
	};

	Commands.prototype.makeGroups = function(numTabs){
		var that = this;
		$.each(new Array(numTabs), function(i) {
			var group = new CommsGroup(Game.getInstance());
			group.create();
			Game.getInstance().world.add(group);
			that.targetGroups.push(group);
		});
		this.mainGroup = new Phaser.Group(Game.getInstance());
		Game.getInstance().world.add(this.mainGroup);
		this.currentGroup = this.targetGroups[this.commsData.selectedIndex];
	};

	Commands.prototype.create = function() {
		this.dragger = null;
		Game.getInput().onDown.add($.proxy(this.onDown, this));
	};

	Commands.prototype.onUp = function() {
		Game.getInput().moveCallback = null;
	};

	Commands.prototype.onDown = function() {
		var input = Game.getInput();
		var hits = this.mainGroup.hitTest(input) || this.currentGroup.hitTest(input);
		if(!hits){
			this.startY = this.currentGroup.y;
			this.y0 = input.activePointer.y;
			input.onUp.add($.proxy(this.onUp, this));
			input.moveCallback = $.proxy(this.move, this);
			input.mouse.mouseOutCallback = $.proxy(this.mouseOutCallback, this);
			
		}
	};
	
	Commands.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Commands.prototype.move = function() {
		var input = Game.getInput();
		var num = this.commsData.currentTiles().length;
		var miny = -1 * CommsLayout.getBlockHeight(1) * num;
		var maxy = 0;
		var y = this.startY - (this.y0 - input.activePointer.y);
		y = Math.min(y, maxy);
		y = Math.max(y, miny);
		this.currentGroup.y = y;
	};

	Commands.prototype.blockDown = function(data) {
		var mainIndex = this.mainGroup.getIndex(data.target.sprite);
		if(mainIndex >= 0){
			// on the left, don't do anything yet
		}
		else{
			// on the right, unsnap it!
			this.currentGroup.remove(data.target.sprite);
			this.mainGroup.add(data.target.sprite);
			data.target.sprite.y += this.currentGroup.y;
			this.lift(data);
		}
	};

	Commands.prototype.lift = function(data) {
		this.commsData.lift(data.target);
	};

	Commands.prototype.drop = function(data) {
		this.commsData.drop(data.target);
	};

	Commands.prototype.blockUp = function(data) {
		var input =  Game.getInput();
		input.onUp.removeAll();
		input.moveCallback = null;
		var block = data.target;
		var sprite = block.sprite;
		if(sprite.x > 200){
			data.target.sprite.y -= this.currentGroup.y;
			this.drop(data);
		}
		else{
			// go back
			sprite.x = block.origPos.x;
			sprite.y = block.origPos.y;
		}
	};

	Commands.prototype.update = function() {
    
	};

	Commands.prototype.shutdown = function(){
		this.commsData.layoutSignal.removeAll(this);
		this.commsData.tabSignal.removeAll(this);
	};
	
	return Commands;
	
});
