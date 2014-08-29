
define(['jquery', 'app/game',

'app/models/commmodel', 'app/models/commtickermodel',

'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel', 'app/utils/alertmanager'],

function($, Game,

commModel, commTickerModel,

screenModel, bgModel,

colorModel, speedModel, AlertManager){
	
	"use strict";
	
	var Storage = function(){
		
	};
	
	Storage.VERSION = "v1.0";
	
	Storage.SETTINGS_KEY = "2go_settings" + Storage.VERSION;
	
	Storage.DEFAULT = {
		bg:0,
		screen:0,
		speed:2,
		color:0,
		commands:[]
	};
	
	Storage.prototype.loadDefaults = function(){
		this.setModels(Storage.DEFAULT);
	};
	
	Storage.prototype.load = function(callback){
		var that = this;
		this.getForKey(Storage.SETTINGS_KEY, function(options){
			var json;
			if(options.success){
				json = options.data || Storage.DEFAULT;
				that.setModels(json);
				if(callback){
					callback({"success":true});
				}
			}
			else{
				AlertManager.makeGrowl({"label":"Error loading"}, null);
			}
		});
	};
	
	Storage.prototype.setModels = function(json){
		screenModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		bgModel.setData(json.bg);
		commModel.addFromJson(json.commands);
		commTickerModel.replay();
	};
		
	Storage.prototype.save = function(callback){
		this.saveForKey(Storage.SETTINGS_KEY, this.makeJson(), function(options){
			if(options.success){
				callback({"success":true});
			}
			else{
				callback({"success":false});
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
		json.color =	 	colorModel.getData().index;
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

