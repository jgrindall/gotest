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
		console.log("1window.AppVariables is ", window.AppVariables);
		console.log("2window.AppVariables.getServerVars is ", window.AppVariables.getServerVars);
		if(window.AppVariables && window.AppVariables.getServerVars){
			window.AppVariables.getServerVars(this.onDefaultsLoaded.bind(this, callback));
		}
		else{
			callback({"success":false, "data":null});
		}
	};

	PurpleMashStorageAdapter.prototype.onDefaultsLoaded = function(callback){
		console.log("3window.AppVariables is ", window.AppVariables);
		var fullPath = window.AppVariables.get("fullPath");
		console.log("4PM onDefaultsLoaded", fullPath);
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
		console.log("1onFileLoaded result is ", result);
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
					console.log("1parse string");
					result = JSON.parse(result);
				}
				data = result.data;
				console.log("2onFileLoaded result is ", result);
				console.log("3onFileLoaded data is ", data);
				if((typeof data) === 'string'){
					console.log("2parse string");
					data = JSON.parse(data);
				}
				console.log("4onFileLoaded data is ", data);
				if(data){
					console.log("4onFileLoaded data is ", data, callback);
					callback({'success':true, 'response':data});
					console.log("done");
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
			console.log("window.DocumentHandler.open options = ", options);
			options.onOpen = this.onFileLoaded.bind(this, callback);
			window.DocumentHandler.open(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

  	return PurpleMashStorageAdapter;
});
