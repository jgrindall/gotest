
define(['jquery', 'app/levelstate'],

function($, LevelState){
	
	"use strict";
	
	var Storage = function(){
		
	};
	
	Storage.LEVEL_PROGESS_KEY = "levelData";
	
	Storage.DEFAULT_PROGRESS = [];
	Storage.DEFAULT_PROGRESS.push([LevelState.OPEN, LevelState.OPEN, LevelState.OPEN, LevelState.OPEN, LevelState.OPEN, LevelState.OPEN, LevelState.OPEN, LevelState.OPEN, LevelState.OPEN]);
	Storage.DEFAULT_PROGRESS.push([LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED, LevelState.LOCKED]);
	Storage.DEFAULT_PROGRESS.push([LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED, LevelState.COMPLETED]);
	
	Storage.prototype.init = function(){
		var data;
		this.cache = [];
		this.persistence = localStorage;
		data = this.loadAllLevelData();
		if(!data){
			this.saveForKey(Storage.LEVEL_PROGESS_KEY, Storage.DEFAULT_PROGRESS);
		}
	};
	
	Storage.prototype.saveForKey = function(key, data){
		this.persistence.setItem(key, JSON.stringify(data));
		this.addToCache(key, data);
	};
	
	Storage.prototype.loadAllLevelData = function(){
		return this.getForKey(Storage.LEVEL_PROGESS_KEY);
	};
	
	Storage.prototype.setLevelDataForPageAndLevel = function(page, level, i){
		var levelData = this.loadAllLevelData();
		levelData[page][level] = i;
		this.saveForKey(Storage.LEVEL_PROGESS_KEY, levelData);
	};
	
	Storage.prototype.loadLevelDataForPageAndLevel = function(page, level){
		var levelData = this.loadLevelDataForPage(page);
		return levelData[level];
	};
	
	Storage.prototype.loadLevelDataForPage = function(page){
		var levelData = this.loadAllLevelData();
		return levelData[page];
	};
	
	Storage.prototype.addToCache = function(key, data){
		this.cache[key] = data;
	};
	
	Storage.prototype.getForKey = function(key){
		var data;
		data = this.cache[key];
		if(!data){
			data = this.persistence.getItem(key);
			if(data){
				data = $.parseJSON(data);
				this.addToCache(key, data);
			}
		}
		return data;
	};
	
	Storage.getInstance = function(){
		if(!Storage.instance){
			Storage.instance = new Storage();
			Storage.instance.init();
		}
		return Storage.instance;
	};
	
	return Storage;
	
});

