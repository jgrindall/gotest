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
		if(window.DocumentHandler){
			options = {};
			options.thumb = PurpleMashAdapter.THUMB;
			options.filter = PurpleMashAdapter.FILTER_SAVE;
			options.onSave = this.onFileSaved.bind(this, callback);
			options.data = JSON.stringify(data);
			window.DocumentHandler.save(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

	PurpleMashAdapter.prototype.onFileSaved = function(callback, result){
		callback({"success":true, "data":result});
	};

	PurpleMashAdapter.prototype.onFileLoaded = function(callback, result){
		var data;
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

	PurpleMashAdapter.prototype.getForKeyPath = function(keyPath, callback){
		var options;
		if(window.DocumentHandler){
			options = {};
			options.thumb = PurpleMashAdapter.THUMB;
			options.filter = PurpleMashAdapter.FILTER_LOAD;
			options.path = keyPath;
			options.onOpen = this.onFileLoaded.bind(this, callback);
			window.DocumentHandler.open(options);
		}
		else{
			callback({"success":false, "data":null});
		}
	};

  	return PurpleMashAdapter;
});
