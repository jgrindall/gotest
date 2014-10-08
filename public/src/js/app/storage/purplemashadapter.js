define(['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var PurpleMashAdapter = function(){
		PhaserComponents.Storage.AbstractStorageAdapter.call(this);
	};
	
	PhaserComponents.Utils.extends(PurpleMashAdapter, PhaserComponents.Storage.AbstractStorageAdapter);

	PurpleMashAdapter.THUMB = 			'/css/pmfilebrowser/2go.png';
	PurpleMashAdapter.FILTER_SEP =		',';
	PurpleMashAdapter.FILTER_LOAD = 	['.2go','.0pa'].join(PurpleMashAdapter.FILTER_SEP);
	PurpleMashAdapter.FILTER_SAVE = 	'.2go';

	PurpleMashAdapter.prototype.loadDefaults = function(callback){
		if(window.AppVariables && window.AppVariables.getServerVars){
			window.AppVariables.getServerVars(this.onDefaultsLoaded.bind(this, callback));
		}
		else{
			callback({"success":false, "data":null});
		}
	};

	PurpleMashAdapter.prototype.onDefaultsLoaded = function(callback){
		var fullPath = window.AppVariables.get("fullPath");
		if(fullPath){
			this.getForKeyPath(fullPath, callback);
		}
		else{
			callback({"success":true, "data":null});
		}
	};

	PurpleMashAdapter.prototype.saveForKeyPath = function(keyPath, data, callback){
		var options;
		console.log("saveForKeyPath window.DocumentHandler ", window.DocumentHandler);
		if(window.DocumentHandler){
			options = {};
			options.thumb = PurpleMashAdapter.THUMB;
			options.filter = PurpleMashAdapter.FILTER_SAVE;
			options.onSave = this.onFileSaved.bind(this, callback);
			options.data = data;
			console.log("options ", options);
			window.DocumentHandler.save(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

	PurpleMashAdapter.prototype.onFileSaved = function(callback, result){
		console.log("onFileSaved ", callback, result, JSON.stringify(result));
		callback({"success":true, "data":result});
	};

	PurpleMashAdapter.prototype.onFileLoaded = function(callback, result){
		console.log("onFileLoaded ", callback, result, JSON.stringify(result));
		callback({"success":true, "data":result});
	};

	PurpleMashAdapter.prototype.getForKeyPath = function(keyPath, callback){
		var options;
		console.log("getForKeyPath window.DocumentHandler ", window.DocumentHandler);
		if(window.DocumentHandler){
			options = {};
			options.thumb = PurpleMashAdapter.THUMB;
			options.filter = PurpleMashAdapter.FILTER_LOAD;
			options.path = keyPath;
			options.onOpen = this.onFileLoaded.bind(this, callback);
			console.log("options ", options);
			window.DocumentHandler.open(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

  	return PurpleMashAdapter;
});
