define(['app/scenes/comms/commslayout', 'app/consts/leveldata', 'app/scenes/game/gamemode', 'app/scenes/game/objectstate'],

function(CommsLayout, LevelData, GameMode, ObjectState) {
	
	"use strict";
	
	var CommsData = function(){
		this.selectedIndex = 0;
		this.layoutSignal = new Phaser.Signal();
		this.tabSignal = new Phaser.Signal();
	};
	
	CommsData.prototype.setSelectedTab = function(data){
		this.selectedIndex = data.index;
		this.tabSignal.dispatch();
	};

	CommsData.prototype.init = function(levelData){
		this.selectedIndex = 0;
		this.tiles = [];
		var that = this;
		if(levelData){
			$.each(new Array(levelData.tabs), function(i) {
				that.tiles[i] = [];
			});
		}
		this.mode = GameMode.UNKNOWN;
	};

	CommsData.prototype.getTilesLayout = function(n){
		var tiles, p, x, y;
		tiles = this.tiles[n];
		p = [];
		y = CommsLayout.TOP;
		x = CommsLayout.XPOS;
		$.each(tiles, function(i, id){
			var obj, indents, unindents;
			indents = LevelData.getIndents(id.type);
			unindents = LevelData.getUnindents(id.type);
			if(unindents){
				x -= CommsLayout.INDENT;
			}
			obj = {"type":id.type, "index":id.index, "x":x, "y":y};
			p.push(obj);
			y += CommsLayout.getBlockHeight(id.type);
			if(indents){
				x += CommsLayout.INDENT;
			}
		});
		return {"index":n, "positions":p};
	};
	
	CommsData.prototype.getCommands = function(){
		return [ObjectState.UPRIGHT, ObjectState.UPLEFT, ObjectState.UP, ObjectState.RIGHT, ObjectState.UP, ObjectState.UPRIGHT];
	};
	
	CommsData.prototype.layoutCurrentTiles = function(){
		var positions = [];
		positions.push ( this.getTilesLayout(this.selectedIndex) );
		this.layoutSignal.dispatch(positions);
	};

	CommsData.prototype.layoutAllTiles = function(c){
		var that = this, positions = [];
		$.each(this.tiles, function(i){
			var p = that.getTilesLayout(i);
			positions.push(p);
		});
		this.layoutSignal.dispatch(positions);
	};

	CommsData.prototype.log = function(){
		var tiles = this.currentTiles();
		var s = "";
		$.each(tiles, function(i, obj){
			s += "\n"+i+"   "+JSON.stringify(obj);
		});
		console.log("LOG s: " + s);
	};
	
	CommsData.getInstance = function(){
		if(!CommsData.instance){
			CommsData.instance = new CommsData();
		}
		return CommsData.instance;
	};
	
	CommsData.prototype.currentTiles = function(){
		var tiles = this.tiles[this.selectedIndex];
		console.log("tiles "+JSON.stringify(this.tiles)+" , "+this.selectedIndex);
		return tiles;
	};

	CommsData.prototype.getDropPosition = function(block){
		var tiles, h, middleY, num, indents;
		tiles = this.currentTiles();
		h = CommsLayout.getBlockHeight(block.id.type);
		if(tiles.length === 0){
			return {"y":0, "indents":0};
		}
		middleY = block.sprite.y + (h/2);
		num = (middleY - CommsLayout.TOP) / h;
		num = Math.min(Math.floor(num + 0.5), tiles.length + 1);
		indents = (block.sprite.x - CommsLayout.XPOS)/CommsLayout.INDENT;
		indents = Math.max(0, indents);
		return {"y":num, "indents":indents};
	};

	CommsData.prototype.drop = function(block){
		var pos = this.getDropPosition(block);
		console.log("index "+pos.y+",  "+pos.indents);
		var tiles = this.currentTiles();
		tiles.splice(pos.y, 0, block.id);
		this.layoutCurrentTiles();
	};

	CommsData.prototype.reload = function(c){
		this.layoutAllTiles(c);
	};

	CommsData.prototype.getIndexOf = function(tiles, id){
		var i = -1;
		$.each(tiles, function(j, obj){
			if(obj.type === id.type && obj.index === id.index){
				i = j;
			}
		});
		return i;
	};

	CommsData.prototype.lift = function(block){
		var id = block.id;
		var tiles = this.currentTiles();
		var index = this.getIndexOf(tiles, block.id);
		tiles.splice(index, 1);
		this.layoutCurrentTiles();
	};

  	return CommsData;
});




