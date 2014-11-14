define(['phasercomponents', 'app/utils/errorcodes'],

function(PhaserComponents, ErrorCodes) {
	
	"use strict";
	
	var PurpleMashStorageAdapter = function(){
		PhaserComponents.Storage.AbstractStorageAdapter.call(this);
	};
	
	PhaserComponents.Utils.extends(PurpleMashStorageAdapter, PhaserComponents.Storage.AbstractStorageAdapter);

	PurpleMashStorageAdapter.THUMB = 			'/css/pmfilebrowser/2go.png';
	PurpleMashStorageAdapter.FILTER_SEP =		',';
	PurpleMashStorageAdapter.FILTER_LOAD = 		['.2go','.0pa'].join(PurpleMashStorageAdapter.FILTER_SEP);
	PurpleMashStorageAdapter.FILTER_SAVE = 		'.2go';

	PurpleMashStorageAdapter.prototype.loadDefaults = function(callback){
		if(window.AppVariables && window.AppVariables.getServerVars){
			window.AppVariables.getServerVars(this.onDefaultsLoaded.bind(this, callback));
		}
		else{
			console.log("window.AppVariables is ", window.AppVariables, window.AppVariables.getServerVars);
			callback({"success":false, "data":null});
		}
	};

	PurpleMashStorageAdapter.prototype.onDefaultsLoaded = function(callback){
		var fullPath = window.AppVariables.get("fullPath");
		console.log("PM onDefaultsLoaded", fullPath);
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
		try{
			if (result.path && result.path.substr(result.path.length - 4) === ".0go") {
				callback({'success':false, 'response':ErrorCodes.WRONG_VERSION});
				window.parent.openExistingDocument({
					"fullpath": result.path,
					"launcher": "2go"
				});
			}
			else{
				if((typeof result) === 'string'){
					result = JSON.parse(result);
				}
				data = result.data;
				if((typeof data) === 'string'){
					data = JSON.parse(data);
				}
				if(data){
					callback({'success':true, 'response':data});
				}
				else{
					callback({'success':false, 'response':null});
				}
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
			window.DocumentHandler.open(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

  	return PurpleMashStorageAdapter;
});
