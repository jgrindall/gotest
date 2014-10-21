define(['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var PurpleMashStorageAdapter = function(){
		PhaserComponents.Storage.AbstractStorageAdapter.call(this);
	};
	
	PhaserComponents.Utils.extends(PurpleMashStorageAdapter, PhaserComponents.Storage.AbstractStorageAdapter);

	PurpleMashStorageAdapter.THUMB = 			'/css/pmfilebrowser/2go.png';
	PurpleMashStorageAdapter.FILTER_SEP =		',';
	PurpleMashStorageAdapter.FILTER_LOAD = 	['.2go','.0pa'].join(PurpleMashStorageAdapter.FILTER_SEP);
	PurpleMashStorageAdapter.FILTER_SAVE = 	'.2go';

	PurpleMashStorageAdapter.prototype.loadDefaults = function(callback){
		if(window.AppVariables && window.AppVariables.getServerVars){
			window.AppVariables.getServerVars(this.onDefaultsLoaded.bind(this, callback));
		}
		else{
			callback({"success":false, "data":null});
		}
	};

	PurpleMashStorageAdapter.prototype.onDefaultsLoaded = function(callback){
		var fullPath = window.AppVariables.get("fullPath");
		if(fullPath){
			this.getForKeyPath(fullPath, callback);
		}
		else{
			callback({"success":true, "data":null});
		}
	};

	PurpleMashStorageAdapter.prototype.saveForKeyPath = function(keyPath, data, callback){
		var options;
		if(window.DocumentHandler){
			options = {};
			options.thumb = PurpleMashStorageAdapter.THUMB;
			options.filter = PurpleMashStorageAdapter.FILTER_SAVE;
			options.onSave = this.onFileSaved.bind(this, callback);
			options.data = JSON.stringify(data);
			window.DocumentHandler.save(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

	PurpleMashStorageAdapter.prototype.onFileSaved = function(callback, result){
		callback({"success":true, "data":result});
	};

	PurpleMashStorageAdapter.prototype.onFileLoaded = function(callback, result){
		var data;
		console.log("len  ", arguments.length);
		for(var i = 0;i < arguments.length;i++){
			console.log("i  ", i, arguments[i]);
			console.log("i  ", i, JSON.stringify(arguments[i]));
		}
		console.log("0  ", callback);
		console.log("1  ", result);
		console.log("2  ", typeof result);
		console.log("3  ", JSON.stringify(result));
		try{
			if((typeof result) === 'string'){
				result = JSON.parse(result);
			}
			console.log("4  ", result);
			console.log("5  ", typeof result);
			console.log("6  ", JSON.stringify(result));
			data = result.data;
			console.log("7  ", data);
			console.log("8  ", typeof data);
			console.log("9  ", JSON.stringify(data));
			if((typeof data) === 'string'){
				data = JSON.parse(data);
			}
			console.log("10  ", data);
			console.log("11  ", typeof data);
			console.log("12  ", JSON.stringify(data));
			if(data){
				callback({'success':true, 'response':data});
			}
			else{
				callback({'success':false, 'response':null});
			}
		}
		catch(e){
			callback({'success':false, 'response':null});
		}
	};

	PurpleMashStorageAdapter.prototype.getForKeyPath = function(keyPath, callback){
		var options;
		if(window.DocumentHandler){
			options = {};
			options.thumb = PurpleMashStorageAdapter.THUMB;
			options.filter = PurpleMashStorageAdapter.FILTER_LOAD;
			if(keyPath){
				options.path = keyPath;
			}
			options.onOpen = this.onFileLoaded.bind(this, callback);
			console.log("hit window.DocumentHandler with the following options:");
			console.log(JSON.stringify(options));
			console.log("-----------------");
			window.DocumentHandler.open(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

  	return PurpleMashStorageAdapter;
});
