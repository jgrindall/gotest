
define(['jquery', 'app/game',

'app/scenes/activity/commmodel', 'app/scenes/activity/screenmodel', 'app/scenes/activity/bgmodel', 

'app/scenes/activity/colormodel', 'app/scenes/activity/speedmodel'],

function($, Game,

commModel, screenModel, bgModel,

colorModel, speedModel){
	
	"use strict";
	
	var Storage = function(){
		
	};
	
	Storage.VERSION = "1.0";
	
	Storage.SETTINGS_KEY = "2go_settings" + Storage.VERSION;
	
	Storage.DEFAULT = {
		bg:0,
		screen:0,
		speed:2,
		color:0,
		commands:[]
	};
	
	Storage.prototype.load = function(){
		var that = this;
		this.getForKey(Storage.SETTINGS_KEY, function(options){
			var json;
			if(options.success){
				json = options.data || Storage.DEFAULT;
				that.setModels(json);
				alert("loaded");	
			}
			else{
				alert("error loading");	
			}
		});
	};
	
	Storage.prototype.setModels = function(json){
		console.log("set the models "+JSON.stringify(json));
		screenModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		bgModel.setData(json.bg);
		commModel.addFromJson(json.commands);
		commModel.playAll();
	};
		
	Storage.prototype.save = function(){
		this.saveForKey(Storage.SETTINGS_KEY, this.makeJson(), function(options){
			if(options.success){
				alert("saved");
			}
			else{
				alert("error saving");
			}
		});
	};
	
	Storage.prototype.init = function(){
		this.cache = [];
		this.persistence = localStorage;
	};
	
	Storage.prototype.saveForKey = function(key, data, callback){
		this.persistence.setItem(key, JSON.stringify(data));
		this.addToCache(key, data);
		callback({success:true});
	};
	
	Storage.prototype.addToCache = function(key, data){
		this.cache[key] = data;
	};
	
	Storage.prototype.makeJson = function(){
		var json = {};
		json.bg = 			bgModel.getData().bg;
		json.screen = 		screenModel.getData().screen;
		json.speed = 		speedModel.getData().speed;
		json.color =	 	colorModel.getData().color;
		json.commands = 	commModel.toJson();
		return json;
	};
	
	Storage.prototype.getForKey = function(key, callback){
		var data;
		data = this.cache[key];
		if(!data){
			data = this.persistence.getItem(key);
			if(data){
				data = $.parseJSON(data);
				this.addToCache(key, data);
			}
		}
		callback({'success':true, 'data':data});
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

