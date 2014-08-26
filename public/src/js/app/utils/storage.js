
define(['jquery', 'app/game',

'app/scenes/activity/commmodel', 'app/scenes/activity/layoutmodel', 'app/scenes/activity/bgmodel', 

'app/scenes/activity/colormodel', 'app/scenes/activity/speedmodel'],

function($, Game,

commModel, layoutModel, bgModel,

colorModel, speedModel){
	
	"use strict";
	
	var Storage = function(){
		
	};
	
	Storage.SETTINGS_KEY = "settings";
	
	Storage.DEFAULT = {
		"bg":1,
		"screen":0,
		"speed":2,
		"color":2,
		"commands":[
			{'direction':0, 'color':0, 'index':0, 'total':5},
			{'direction':5, 'color':1, 'index':1, 'total':5},
			{'direction':5, 'color':1, 'index':2, 'total':5},
			{'direction':5, 'color':1, 'index':3, 'total':5},
			{'direction':3, 'color':2, 'index':4, 'total':5},
			{'direction':2, 'color':3, 'index':0, 'total':1}
		]
	};
	
	Storage.prototype.load = function(){
		var json = this.getForKey(Storage.SETTINGS_KEY) || Storage.DEFAULT;
		layoutModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		bgModel.setData(json.bg);
		commModel.addFromJson(json.commands);
		commModel.playAll();
	};
	
	Storage.prototype.save = function(){
		this.saveForKey(Storage.SETTINGS_KEY, this.makeJson());
	};
	
	Storage.prototype.init = function(){
		this.cache = [];
		this.persistence = localStorage;
	};
	
	Storage.prototype.saveForKey = function(key, data){
		this.persistence.setItem(key, JSON.stringify(data));
		this.addToCache(key, data);
	};
	
	Storage.prototype.addToCache = function(key, data){
		this.cache[key] = data;
	};
	
	Storage.prototype.makeJson = function(){
		var json = {};
		json.bg = 			bgModel.getData().bg;
		json.screen = 		layoutModel.getData().bg;
		json.speed = 		speedModel.getData().speed;
		json.color =	 	colorModel.getData().color;
		json.commands = 	commModel.toJSON();
		return json;
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

