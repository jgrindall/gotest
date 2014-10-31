
define('phasercomponents/utils/utils',[], function(){
	
	
	
	var Utils = function(){
		
	};
	
	Utils.extends = function(SubClassRef, SuperClassRef){
		var F = function(){
		
		};
		F.prototype = Object.create(SuperClassRef.prototype);
		SubClassRef.prototype = new F();
		SubClassRef.prototype.constructor = SubClassRef;
	};

	Utils.isTouch = function(){
		var msTouch, t0, t1, el = document.createElement('div');
		msTouch = window.navigator.msMaxTouchPoints;
  	 	el.setAttribute('ongesturestart', 'return;');
  	 	el.setAttribute('ontouchstart', 'return;');
  	 	t0 = (typeof el.ongesturestart === "function");
  	 	t1 = (typeof el.ontouchstart === "function");
   		return msTouch || t0 || t1;
	};

	Utils.clone = function(json){
		return JSON.parse(JSON.stringify(json));
	};

	Utils.isIos7 = function(){
		return Utils.isTouch() && navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i);	
	};

	Utils.isPortrait = function(){
		return (window.orientation === 0 || window.orientation === 180);
	};

	Utils.isLandscape = function(){
		return !Utils.isPortrait();
	};

	Utils.deviceIsIncorrectSize = function(){
		return (Utils.isPortrait() && window.innerWidth < window.innerHeight);
	};

	Utils.fitRect = function(rect, ratio) {
		var w, h, size;
		w = rect.w;
		h = rect.h;
		if(w/h > ratio){
			size = {"w":ratio*h, "h":h};
		}
		else{
			size = {"w":w, "h":w*(1/ratio)};
		}
		return size;
	};

	Utils.checkImplements = function(obj, theInterface) {
	    for (var member in theInterface) {
	        if (typeof obj[member] !== typeof theInterface[member]) {
	            throw("Object "+obj+" failed to implement interface member " + member);
	        }
	    }
	};

	Utils.debounce = function(f, waitDuration) {
		var timeout, returnFunction;
		returnFunction = function() {
			var context = this, args = arguments, later;
			later = function() {
				clearTimeout(timeout);
				timeout = null;
				f.apply(context, args);
			};
			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(later, waitDuration);
		};
		return returnFunction;
	};

	return Utils;
	
});




define(

	'phasercomponents/gamemanager',['phaser', 'phaserstatetrans', 'phasercomponents/utils/utils'],

function(Phaser, PhaserStateTrans, Utils){
	
	
	
	var GameManager = function(){

	};

	GameManager.RATIO = 1.3333;
	GameManager.SCROLL_BAR_SIZE = 15;

	GameManager.prototype.init = function(options, config){
		this.options = options;
		this.el = $("#"+this.options.containerTagId);
		this.body = $("body");
		this.html = $("html");
		this.makeGame(config);
	};

	GameManager.prototype.destroy = function(){
		this.el.empty();
		this.game.tweens.removeAll();
		this.game.stage.disableVisibilityChange = true;
		this.game.stage.destroy();
		this.game.destroy();
		this.game.stage = null;
		this.game = null;
		this.transitions = null;
		this.options = null;
	};

	GameManager.prototype.mapScene = function(key, scene, first){
		this.game.state.add(key, scene);
		if(first){
			this.firstSceneKey = key;
		}
	};

	GameManager.prototype.makeGame = function(config){
		var w, h, size, canvas;
		size = this.getSize();
		w = size.w;
    	h = size.h;
    	if(!this.game){
			this.game = new Phaser.Game(w, h, Phaser.CANVAS, this.options.containerTagId, config);
		}
		this.game.width = w;
		this.game.height = h;
		this.game.w = w;
		this.game.h = h;
		this.game.cx = w/2;
		this.game.cy = h/2;
		this.body.width(w).height(h + this.options.paddingBottom);
		this.el.width(w).height(h);
		canvas = $("#"+this.options.containerTagId+" canvas");
		canvas.width(w).height(h).attr("width", w).attr("height", h);
	};

	GameManager.prototype.resize = function(){
		this.makeGame();
	};

	GameManager.prototype.orient = function(){
		this.makeGame();
	};

	GameManager.prototype.start = function(){
		var settings = {'duration': 1500, 'properties': {'alpha': 0, 'scale': {'x': 2, 'y': 2}}};
		this.transitions = this.game.plugins.add(PhaserStateTrans);
		this.transitions.settings(settings);
		this.game.state.start(this.firstSceneKey);
	};

	GameManager.prototype.goToScene = function(key){
		this.transitions.to(key);
	};

	GameManager.prototype.stopScrollBars = function(){
		this.html.css("overflow", "hidden");
		this.body.width("100%").height("100%");
	};

	GameManager.prototype.enableScrollBars = function(){
		this.html.css("overflow", "auto");
	};

	GameManager.prototype.getAvailableSize = function(){
		var w, h;
		this.stopScrollBars();
		w = this.body.width();
		h = this.body.height();
		this.enableScrollBars();
		if (Utils.isIos7() && Utils.isLandscape() ) {
    		h = 672;
		}
		h -= this.options.paddingBottom;
		return {"w":w, "h":h};
	};

	GameManager.prototype.getSizeFit = function(){
		var size, availableSize;
		availableSize = this.getAvailableSize();
		if(availableSize.w/availableSize.h > GameManager.RATIO){
			size = {"w":GameManager.RATIO*availableSize.h, "h":availableSize.h};
		}
		else{
			size = {"w":availableSize.w, "h":availableSize.w*(1/GameManager.RATIO)};
		}
		return size;
	};

	GameManager.prototype.getSizeFill = function(){
		var size, availableSize;
		availableSize = this.getAvailableSize();
		size = {"w":availableSize.w, "h":availableSize.h};
		return size;
	};

	GameManager.prototype.getScene = function(){
		return this.game.state.getCurrentState();
	};

	GameManager.prototype.getSize = function(){
		var size;
		if(this.options.scaleType === "fill"){
			size = this.getSizeFill();
		}
		else{
			size = this.getSizeFit();
		}
		size.w = size.w * window.devicePixelRatio;
		size.h = size.h * window.devicePixelRatio;
		if(size.h < this.options.minHeight){
			size.w -= GameManager.SCROLL_BAR_SIZE;
			size.h = this.options.minHeight;
		}
		if(size.w < this.options.minWidth){
			size.h -= GameManager.SCROLL_BAR_SIZE;
			size.w = this.options.minWidth;
		}
		return size;
	};

	return GameManager;
	
});



define(

    'phasercomponents/injector',[],

	function() {
	
	

   	var Injector = function (){
   	    this.classRefs = {};
    };

    Injector.prototype.map = function(key, varNames, vals){
        var obj = this.classRefs[key];
        if(obj){
            obj.varNames = obj.varNames.concat(varNames);
            obj.vals = obj.vals.concat(vals);
        }
        else{
            this.classRefs[key] = {"varNames":varNames, "vals":vals};
        }
    };

    Injector.prototype.mapArray = function(keys, varNames, vals){
        var that = this;
        keys.forEach(function(key){
            that.map(key, varNames, vals);
        });
    };

    Injector.getInstance = function(){
        if(!Injector.instance){
            Injector.instance = new Injector();
        }
        return Injector.instance;
    };

    Injector.prototype.shutdown = function(){
        this.classRefs = {};
    };

    Injector.shutdown = function(){
        Injector.getInstance().shutdown();
        Injector.instance = null;
    };

    Injector.prototype.unInject = function(_instance){
        _instance.game = null;
        _instance.world = null;
        _instance.eventDispatcher = null;
    };

    Injector.prototype.getObj = function(key){
       return this.classRefs[key];
    };

    Injector.prototype.injectInto = function(_instance, key){
        var obj, i;
        obj = this.getObj(key);
        if(obj){
            for(i = 0; i < obj.varNames.length; i++){
                _instance[obj.varNames[i]] = obj.vals[i];
            }
        }
    };

	return Injector;
	
});


define(

	'phasercomponents/commands/commandmap',['phasercomponents/injector'],

function(Injector) {
	
	
	
	var CommandMap = function(){
		this.hash = {};
		Injector.getInstance().injectInto(this, "commandmap");
	};

	CommandMap.prototype.trigger = function(event, obj){
		var cmd, commandClassRefs;
		if(!obj || !obj.type){
			throw "Undefined command";
		}
		commandClassRefs = this.get(obj.type);
		if(commandClassRefs){
			commandClassRefs.forEach(function(CommandClassRef){
				if(CommandClassRef && (typeof CommandClassRef === "function")){
					cmd = new CommandClassRef();
					cmd.start(obj.data);
				}
			});
		}
	};

	CommandMap.prototype.destroy = function(){
		var eventName;
		for(eventName in this.hash){
			this.eventDispatcher.removeListener(eventName);
			this.hash[eventName] = null;
		}
		this.hash = null;
		Injector.getInstance().unInject(this);
	};

	CommandMap.prototype.map = function(eventName, CommandClassRef){
		var handler;
		if(!eventName || !CommandClassRef){
			throw "Error with map";
		}
		handler = this.trigger.bind(this);
		this.eventDispatcher.addListener(eventName, handler);
		if(!this.hash[eventName]){
			this.hash[eventName] = [];
		}
		this.hash[eventName].push(CommandClassRef);
	};
	
	CommandMap.prototype.get = function(eventName){
		return this.hash[eventName];  // array
	};
	
  	return CommandMap;
});





define('phasercomponents/events/eventdispatcher',[],

function() {
	
	/* A simple event aggregator */

	
	
	var EventDispatcher = function(){
		this.el = $(document);
	};
	
	EventDispatcher.prototype.addListener = function(name, method) {
		if(!name || !method){
			throw "No eventName/method";
		}
		this.el.on(name, method);
	};

	EventDispatcher.prototype.addOnce = function(name, method) {
		if(!name || !method){
			throw "No eventName/method";
		}
		this.el.once(name, method);
	};

	EventDispatcher.prototype.removeListener = function(name, method) {
		if(!name){
			throw "No eventName";
		}
		if(!method){
			this.el.off(name);
		}
		else{
			this.el.off(name, method);
		}
	};

	EventDispatcher.prototype.trigger = function(eventObj) {
		if(!eventObj || !eventObj.type){
			throw "No eventName";
		}
		else{
			this.el.trigger(eventObj.type, eventObj);
		}
	};

  	return EventDispatcher;
});






define(

	'phasercomponents/utils/abstractstorageadapter',[],

function(){
	
	

	var AbstractStorageAdapter = function(){
		
	};
	
	AbstractStorageAdapter.prototype.loadDefaults = function(callback){
		console.log("loadDefaults ", callback);
	};

	AbstractStorageAdapter.prototype.saveForKeyPath = function(keyPath, data, callback){
		console.log("save ", keyPath, data, callback);
	};

	AbstractStorageAdapter.prototype.getForKeyPath = function(keyPath, callback){
		console.log("load ", keyPath, callback);
	};

	AbstractStorageAdapter.prototype.destroy = function(){
		
	};

	return AbstractStorageAdapter;
	
});



define(

	'phasercomponents/utils/localstorageadapter',['phasercomponents/utils/utils','phasercomponents/utils/abstractstorageadapter'],

function(Utils, AbstractStorageAdapter){
	
	

	var LocalStorageAdapter = function(){
		AbstractStorageAdapter.call(this);
	};

	LocalStorageAdapter.DEFAULT_KEY = "app_settings";

	Utils.extends(LocalStorageAdapter, AbstractStorageAdapter);

	LocalStorageAdapter.prototype.loadDefaults = function(callback){
		callback({"success":true, "data":null});
	};

	LocalStorageAdapter.prototype.saveForKeyPath = function(keyPath, data, callback){
		if(!keyPath){
			keyPath = LocalStorageAdapter.DEFAULT_KEY;
		}
		window.localStorage.setItem(keyPath, JSON.stringify(data));
		callback({"success":true});
	};

	LocalStorageAdapter.prototype.getForKeyPath = function(keyPath, callback){
		var dataString, parsedData;
		if(!keyPath){
			keyPath = LocalStorageAdapter.DEFAULT_KEY;
		}
		dataString = window.localStorage.getItem(keyPath);
		if(dataString){
			try{
				parsedData = JSON.parse(dataString);
				callback({'success':true, 'response':parsedData});
			}
			catch(e){
				callback({'success':false, 'response':null});
			}
		}
		else{
			callback({'success':true, 'response':null});
		}
	};

	LocalStorageAdapter.prototype.destroy = function(){
		
	};

	return LocalStorageAdapter;
	
});



define(

	'phasercomponents/utils/storage',['phasercomponents/utils/localstorageadapter'],

function(LocalStorageAdapter){
	
	

	var Storage = function(){
		this.adapter = new LocalStorageAdapter();
	};
	
	Storage.prototype.setAdapter = function(adapter){
		this.adapter = adapter;
	};

	Storage.prototype.loadDefaults = function(callback){
		this.adapter.loadDefaults(function(data){
			if(data.success){
				callback({"success":true, "response":data.response});
			}
			else{
				callback({"success":false});
			}
		});
	};

	Storage.prototype.saveForKeyPath = function(keyPath, dataToSave, callback){
		this.adapter.saveForKeyPath(keyPath, dataToSave, function(data){
			if(data.success){
				callback({"success":true});
			}
			else{
				callback({"success":false});
			}
		});
	};

	Storage.prototype.getForKeyPath = function(keyPath, callback){
		this.adapter.getForKeyPath(keyPath, function(data){
			if(data.success){
				callback({"success":true, "response":data.response});
			}
			else{
				callback({"success":false});
			}
		});
	};
	
	Storage.prototype.destroy = function(){
		this.adapter.destroy();
		this.adapter = null;
	};

	return Storage;
	
});


define('phasercomponents/events/appevents',[],

function() {

	
	
	var AppEvents = function(){
		
	};

	AppEvents.ALERT_SHOWN =			"app:alertShown";
	AppEvents.CHANGE_SCENE =		"app:changeScene";
	AppEvents.PLAY_SOUND =			"app:playSound";
	AppEvents.PRE_SHUTDOWN =		"app:preShutdown";
	AppEvents.POST_SHUTDOWN =		"app:postShutdown";
	AppEvents.RESIZE =				"app:resize";
	AppEvents.ORIENT =				"app:orient";
	AppEvents.KEY_UP =				"app:keyUp";

  	return AppEvents;
});






define(

	'phasercomponents/utils/keymanager',['phasercomponents/injector', 'phasercomponents/events/appevents'],

	function(Injector, AppEvents){
	
	
	
	var KeyManager = function(){
		
	};

	KeyManager.prototype.init = function(){
		Injector.getInstance().injectInto(this, "keymanager");
	};
	
	KeyManager.prototype.keyDown = function(event){
		var code = event.keyCode, obj;
		if(this.codes && this.codes.indexOf(code) >= 0){
			event.stopPropagation();
			event.preventDefault();
			obj = {"type":AppEvents.KEY_UP, "data":{"keyCode":code}};
			this.eventDispatcher.trigger(obj);
		}
	};

	KeyManager.prototype.destroy = function(){
		$(document).off('keydown');
		this.codes = null;
	};

	KeyManager.prototype.setCodes = function(codes){
		this.codes = codes;
	};

	KeyManager.prototype.startListening = function(){
		if(this.codes.length >= 1){
			$(document).on('keydown', this.keyDown.bind(this));
		}
	};
	
	return KeyManager;
	
});


define('phasercomponents/utils/soundmanager',[], function(){
	
	
	
	var SoundManager = function(){
		this.sounds = {};
	};
	
	SoundManager.prototype.add = function(key, sound){
		this.sounds[key] = sound;
	};

	SoundManager.prototype.destroy = function(){
		this.sounds = {};
	};

	SoundManager.prototype.play = function(key){
		var sound = this.sounds[key];
		if(sound){
			sound.play("", 0, 0.5, false, true);
		}
	};
	
	return SoundManager;
	
});


define(

	'phasercomponents/utils/alertmanager',['phaser', 'phasercomponents/injector', 'phasercomponents/events/appevents'], 

function(Phaser, Injector, AppEvents){

	
	
	var AlertManager  = function(){

	};
	
	AlertManager.prototype.init = function(){
		this.inject();
		this.closeHandler = this.close.bind(this);
		this.eventDispatcher.addListener(AppEvents.RESIZE, this.reOpen);
		this.eventDispatcher.addListener(AppEvents.ORIENT, this.reOpen);
	};

	AlertManager.prototype.inject = function(){
		Injector.getInstance().injectInto(this, "alertmanager");
	};

	AlertManager.prototype.reOpen = function(){
		this.close();
	};

	AlertManager.prototype.removeBg = function(){
		if(this.bg){
			this.bg.destroy();
			this.bg = null;
		}
	};

	AlertManager.prototype.close = function(callback){
		var that = this;
		if(this.alert){
			this.alert.selectSignal.remove(this.callbackProxy);
			this.alert.hideMe();
			that.removeBg();
			that.alert.destroy();
			that.alert = null;
			that.eventDispatcher.trigger({"type":AppEvents.ALERT_SHOWN, "shown":false});
			if(callback && typeof(callback) === "function"){
				callback();
			}
		}
	};
	
	AlertManager.prototype.addBg = function(){
		this.bg = new Phaser.Graphics(this.game, 0, 0);
		this.bg.beginFill(0x000000);
		this.bg.alpha = 0;
    	this.bg.drawRect(0, 0, this.game.w, this.game.h);
    	this.bg.endFill();
		this.game.world.add(this.bg);
		this.game.add.tween(this.bg).to( {'alpha':0.75}, 500, Phaser.Easing.Linear.None, true, 50, false);
	};
	
	AlertManager.prototype.make = function(ClassRef, options, callback, bounds){
		var x, y, newBounds, newOptions;
		this.close();
		this.callbackProxy = this.buttonClick.bind(this, callback);
		x = (this.game.w - ClassRef.WIDTH)/2;
		y = (this.game.h - ClassRef.HEIGHT)/2;
		newBounds = bounds || {"x":x, "y":y};
		newBounds.w = ClassRef.WIDTH;
		newBounds.h = ClassRef.HEIGHT;
		newOptions = $.extend({}, options, {"bounds":newBounds});
		this.alert = new ClassRef(newOptions);
		this.alert.selectSignal.add(this.callbackProxy);
		if(this.alert.useBg()){
			this.addBg();
		}
		this.game.world.add(this.alert.group);
		this.eventDispatcher.trigger({"type":AppEvents.ALERT_SHOWN, "shown":true});
		this.alert.showMe();
	};

	AlertManager.prototype.buttonClick = function(callback, data){
		this.close();
		if(callback){
			callback(data);
		}
	};

	AlertManager.prototype.destroy = function(){
		this.close();
		this.eventDispatcher.removeListener(AppEvents.RESIZE, this.reOpen);
		this.eventDispatcher.removeListener(AppEvents.ORIENT, this.reOpen);
		this.closeHandler = null;
		Injector.getInstance().unInject(this);
	};

	return AlertManager;

});

	



define(

	'phasercomponents/commands/abstractcommand',['phasercomponents/injector'], function(Injector){
	
	
	
	var AbstractCommand = function(){
		Injector.getInstance().injectInto(this, "abstractcommand");
	};
	
	AbstractCommand.prototype.start = function(data){
		this.execute(data);
	};

	AbstractCommand.prototype.cleanUp = function(){
		
	};
	
	return AbstractCommand;

});





define('phasercomponents/commands/preshutdowncommand',[

	'phasercomponents/utils/utils',

	'phasercomponents/commands/abstractcommand'

	],

function(Utils,

	AbstractCommand) {
	
	
	
	var PreShutdownCommand = function(){
		AbstractCommand.call(this);
	};
	
	Utils.extends(PreShutdownCommand, AbstractCommand);

	PreShutdownCommand.prototype.execute = function(){
		
	};
	
  	return PreShutdownCommand;
});


define(

	'phasercomponents/commands/postshutdowncommand',['phasercomponents/utils/utils', 'phasercomponents/commands/abstractcommand'],

function(Utils, AbstractCommand) {
	
	
	
	var PostShutdownCommand = function(){
		AbstractCommand.call(this);
	};
	
	Utils.extends(PostShutdownCommand, AbstractCommand);

	PostShutdownCommand.prototype.execute = function(){
		
	};
	
  	return PostShutdownCommand;
});


define('phasercomponents/commands/playsoundcommand',[

	'phasercomponents/utils/utils', 
	
	'phasercomponents/commands/abstractcommand', 'phasercomponents/injector'],

function(Utils, AbstractCommand, Injector) {
	
	
	
	var PlaySoundCommand = function(){
		AbstractCommand.call(this);
		Injector.getInstance().injectInto(this, "playsoundcommand");
	};
	
	Utils.extends(PlaySoundCommand, AbstractCommand);

	PlaySoundCommand.prototype.execute = function(data){
		this.soundManager.play(data);
	};
	
  	return PlaySoundCommand;
});



define( 'phasercomponents/context',['phasercomponents/gamemanager',

	'phasercomponents/commands/commandmap', 'phasercomponents/events/eventdispatcher', 'phasercomponents/utils/storage',

	'phasercomponents/events/appevents', 'phasercomponents/utils/keymanager','phasercomponents/utils/soundmanager',

    'phasercomponents/injector', 'phasercomponents/utils/alertmanager',

    'phasercomponents/commands/preshutdowncommand', 'phasercomponents/commands/postshutdowncommand',

	'phasercomponents/commands/playsoundcommand', 'phasercomponents/utils/utils'],

	function(GameManager,

		CommandMap, EventDispatcher, Storage,

		AppEvents, KeyManager, SoundManager,

        Injector, AlertManager,

        PreShutdownCommand, PostShutdownCommand,

		PlaySoundCommand, Utils) {
	
	

   	var Context = function (options){
   		this.options = options;
    };

    Context.prototype.start = function(){
        this.gameManager = new GameManager();
        this.makeGame();
    };

    Context.prototype.inject = function(){
        var game, eventDispatcher, alertManager, soundManager, storage;
        game = this.gameManager.game;
        eventDispatcher = this.eventDispatcher;
        alertManager = this.alertManager;
        soundManager = this.soundManager;
        storage = this.storage;
        Injector.getInstance().mapArray(["alertmanager", "abstractmodel", "commandmap"],        ["game", "eventDispatcher"],                                [game, eventDispatcher]);
        Injector.getInstance().map("keymanager",                                                ["eventDispatcher"],                                        [eventDispatcher]);
        Injector.getInstance().map("view",                                                      ["game", "eventDispatcher", "alertManager"],                [game, eventDispatcher, alertManager]);
        Injector.getInstance().map("abstractcommand",                                           ["game", "eventDispatcher", "alertManager", "storage"],     [game, eventDispatcher, alertManager, storage]);
        Injector.getInstance().map("scene",                                                     ["game", "eventDispatcher", "world", "alertManager"],       [game, eventDispatcher, game.world, alertManager]);
        Injector.getInstance().map("playsoundcommand",                                          ["soundManager"],                                           [soundManager]);
    };

    Context.prototype.onChangeScene = function(){
    	
    };

    Context.prototype.mapFonts = function(){
    	
    };

    Context.prototype.makeGame = function(){
    	var config = {
    		"preload":this.preload.bind(this),
    		"create":this.gameCreated.bind(this),
    	};
    	this.gameManager.init(this.options, config);
    };

    Context.prototype.removeListeners = function(){
        $(window).off("resize");
        this.resizeHandler = null;
        $(window).off("orientationchange");
        this.orientHandler = null;
    };

    Context.prototype.addListeners = function(){
    	this.resizeHandler = Utils.debounce(this.onResize.bind(this), 237);
    	$(window).on("resize", this.resizeHandler);
        this.orientHandler = Utils.debounce(this.onOrient.bind(this), 500);
        $(window).on("orientationchange", this.orientHandler);
        document.addEventListener('focusout', this.scrollTop.bind(this));
        this.sceneHandler = this.onChangeScene.bind(this);
        this.eventDispatcher.addListener(AppEvents.CHANGE_SCENE, this.sceneHandler);
        this.scrollTop();
    };

    Context.prototype.scrollTop = function(){
        window.scrollTo(0, 0);
    };

    Context.prototype.onOrient = function(){
        var that = this;
        setTimeout(function(){
            that.gameManager.orient();
            that.eventDispatcher.trigger({"type":AppEvents.ORIENT});
            that.scrollTop();
        }, 300);
    };

    Context.prototype.onResize = function(){
        var that = this;
        setTimeout(function(){
            that.gameManager.resize();
            that.eventDispatcher.trigger({"type":AppEvents.RESIZE});
            that.scrollTop();
        }, 300);
    };

    Context.prototype.setupKeys = function(){

    };

    Context.prototype.mapScenes = function(){
    	
    };

    Context.prototype.addSounds = function(){
    	
    };

    Context.prototype.addStorage = function(){
        
    };

    Context.prototype.mapCommands = function(){
        this.commandMap = new CommandMap();
        this.commandMap.map(AppEvents.PLAY_SOUND,               PlaySoundCommand);
        this.commandMap.map(AppEvents.PRE_SHUTDOWN,             PreShutdownCommand);
        this.commandMap.map(AppEvents.POST_SHUTDOWN,            PostShutdownCommand);
    };

	Context.prototype.gameCreated = function(){
        this.mapFonts();
        this.eventDispatcher = new EventDispatcher();
        this.alertManager = new AlertManager();
        this.keyManager = new KeyManager();
        this.soundManager = new SoundManager();
        this.storage = new Storage();
        this.addListeners();
		this.inject();
        this.mapCommands();
    	this.mapScenes();
    	this.addSounds();
        this.addStorage();
        this.keyManager.init();
        this.alertManager.init();
        this.setupKeys();
        this.keyManager.startListening();
		this.gameManager.start();
	};
	
     Context.prototype.shutdown = function(){
        this.eventDispatcher.removeListener(AppEvents.CHANGE_SCENE, this.sceneHandler);
        this.sceneHandler = null;
        this.eventDispatcher.trigger({"type":AppEvents.PRE_SHUTDOWN});
        this.removeListeners();
        this.commandMap.destroy();
        this.gameManager.destroy();
        this.alertManager.destroy();
        this.soundManager.destroy();
        this.storage.destroy();
        this.keyManager.destroy();
        this.eventDispatcher.trigger({"type":AppEvents.POST_SHUTDOWN});
        this.gameManager = null;
        this.commandMap = null;
        this.keyManager = null;
        this.alertManager = null;
        this.soundManager = null;
        this.storage = null;
        this.eventDispatcher = null;
        Injector.shutdown();
    };

	Context.prototype.preload = function(){
		
	};
	
	return Context;
	
});



define(

	'phasercomponents/display/view',['phasercomponents/injector'], function(Injector){
	
	
	
	var View = function(options){
		this.options = options;
		this.bounds = options.bounds || {'x':0, 'y':0, 'w':100, 'h':100};
		this.model = options.model;
		this.inject();
		this.create();
	};

	View.prototype.inject = function(){
		Injector.getInstance().injectInto(this, "view");
	};

	View.prototype.create = function(){
		
	};

	View.prototype.moveTo = function(x, y){
		this.view.x = x;
		this.view.y = y;
	};
	
	View.prototype.getContentHeight = function(){
		return this.bounds.h;
	};
	
	View.prototype.getContentWidth = function(){
		return this.bounds.w;
	};

	View.prototype.destroy = function(){
		this.options = null;
		this.bounds = null;
		this.model = null;
		Injector.getInstance().unInject(this);
	};

	Object.defineProperty(View.prototype, "view", {
		get : function(){
			return (this.sprite || this.group);
		}
	});

	return View;

});





define(

	'phasercomponents/display/interactivesprite',['phaser', 'phasercomponents/display/view', 'phasercomponents/utils/utils'],

	function(Phaser, View, Utils){
	
	
	
	var InteractiveSprite = function(options){
		this.mouseUpSignal = new Phaser.Signal();
		this.mouseDownSignal = new Phaser.Signal();
		View.call(this, options);
	};
	
	Utils.extends(InteractiveSprite, View);
	
	InteractiveSprite.prototype.addListeners = function(){
		this.sprite.events.onInputDown.add(this.onMouseDown, this);
		this.sprite.events.onInputUp.add(this.onMouseUp, this);
	};

	InteractiveSprite.prototype.create = function(){
		var frame = 0;
		if(this.options.model){
			frame = this.options.model.get();
		}
		this.sprite = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.asset, frame);
	};

	InteractiveSprite.prototype.removeListeners = function(){
		this.sprite.events.onInputUp.remove(this.onMouseUp, this);
		this.sprite.events.onInputDown.remove(this.onMouseDown, this);
	};

	InteractiveSprite.prototype.enableInput = function(){
		if(!this.sprite.inputEnabled){
			this.sprite.inputEnabled = true;
			this.sprite.input.useHandCursor = true;
			this.addListeners();
		}
	};
	
	InteractiveSprite.prototype.disableInput = function(){
		if(this.sprite.inputEnabled){
			this.removeListeners();
			this.sprite.inputEnabled = false;
		}
	};
	
	InteractiveSprite.prototype.onMouseUp = function(){
		var localPoint = this.game.input.getLocalPosition(this.sprite, this.game.input.activePointer);
		this.mouseUpSignal.dispatch({"target":this, "localPoint":localPoint});
		this.mouseUpPoint = localPoint;
	};
	
	InteractiveSprite.prototype.onMouseDown = function(){
		var localPoint = this.game.input.getLocalPosition(this.sprite, this.game.input.activePointer);
		this.mouseDownPoint = localPoint;
		this.mouseDownSignal.dispatch({"target":this, "localPoint":localPoint});
	};
	
	InteractiveSprite.prototype.destroy = function(){
		this.disableInput();
		this.mouseDownSignal.dispose();
		this.mouseUpSignal.dispose();
		this.mouseDownSignal = null;
		this.mouseUpSignal = null;
		this.sprite.destroy(true);
		this.sprite = null;
		this.mouseDownPoint = null;
		this.mouseUpPoint = null;
		View.prototype.destroy.call(this);
	};

	return InteractiveSprite;

});



define(

	'phasercomponents/display/movieclip',['phasercomponents/display/interactivesprite', 'phasercomponents/utils/utils'],

	function(InteractiveSprite, Utils){
	
	
	
	var MovieClip = function(options){
		InteractiveSprite.call(this, options);
	};
	
	Utils.extends(MovieClip, InteractiveSprite);

	MovieClip.prototype.goTo = function(i){
		if(i === null || i === undefined){
			i = 0;
		}
		this.sprite.animations.play('frame'+i);
	};

	MovieClip.prototype.getIndex = function(){
		
	};

	MovieClip.prototype.init = function(){
		if(this.model){
			this.goTo(this.model.get());	
		}
	};

	MovieClip.prototype.loadTexture = function(s){
		var frameNum = this.sprite.animations.currentFrame.index;
		this.sprite.loadTexture(s);
		this.sprite.animations.play('frame'+frameNum);
	};

	MovieClip.prototype.create = function(){
		InteractiveSprite.prototype.create.call(this);
		for(var i = 0; i<= this.options.numFrames - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 0, true);
		}
		this.init();
	};
	
	MovieClip.prototype.destroy = function(){
		this.sprite.animations.destroy();
		InteractiveSprite.prototype.destroy.call(this);
	};

	return MovieClip;

});


define(

	'phasercomponents/display/container',['phaser', 'phasercomponents/display/view', 'phasercomponents/utils/utils'],

function(Phaser, View, Utils){
	
	
	
	var Container = function(options){
		View.call(this, options);
	};

	Utils.extends(Container, View);

	Container.prototype.create = function(){
		this.group = new Phaser.Group(this.game, null);
	};
	
	Container.prototype.setVisible = function(vis){
		this.group.visible = vis;
	};

	Container.prototype.destroy = function() {
		this.group.removeAll(true);
		View.prototype.destroy.call(this);
	};
	
	return Container;

});





define(
	
'phasercomponents/display/buttons/abstractbutton',['phaser', 'phasercomponents/display/view', 'phasercomponents/utils/utils',

'phasercomponents/events/appevents'],

function(Phaser, View, Utils,

	AppEvents){
	
	
	
	var AbstractButton = function(options){
		if(typeof options.disabledAlpha === 'undefined'){
			options.disabledAlpha = 0.5;
		}
		options.asset = options.asset || 'button';
		this.frames = options.frames || [0, 1, 2, 3];
		this.mouseDownSignal = new Phaser.Signal();
		this.mouseUpSignal = new Phaser.Signal();
		View.call(this, options);
	};

	Utils.extends(AbstractButton, View);

	AbstractButton.prototype.goToFrame = function(i){
		this.sprite.setFrames(this.frames[i], this.frames[i], this.frames[i], this.frames[i]);
	};

	AbstractButton.prototype.resetFrames = function(){
		this.sprite.setFrames(this.frames[0], this.frames[1], this.frames[2], this.frames[3]);
	};

	AbstractButton.prototype.select = function(){
		this.goToFrame(1);
	};

	AbstractButton.prototype.deselect = function(){
		this.goToFrame(0);
	};

	AbstractButton.prototype.create = function(){
		this.sprite = new Phaser.Button(this.game, this.bounds.x, this.bounds.y, this.options.asset, this.callback, this, this.frames[0], this.frames[1], this.frames[2], this.frames[3]);
		this.resetFrames();
		this.sprite.inputEnabled = false;
		this.enableInput();
	};

	AbstractButton.prototype.mouseUp = function(){
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	AbstractButton.prototype.addListeners = function(){
		this.sprite.events.onInputUp.add(this.mouseUp, this);
		this.sprite.events.onInputDown.add(this.mouseDown, this);
	};

	AbstractButton.prototype.removeListeners = function(){
		this.sprite.events.onInputUp.remove(this.mouseUp, this);
		this.sprite.events.onInputDown.remove(this.mouseDown, this);
	};

	AbstractButton.prototype.enableInput = function(){
		if(!this.sprite.inputEnabled){
			this.sprite.inputEnabled = true;
			this.tweenAlpha(1, true);
			this.sprite.input.useHandCursor = true;
			//this.sprite.tint = 0xFFFFFF;
			this.addListeners();
		}
	};
	
	AbstractButton.prototype.disableInput = function(){
		if(this.sprite.inputEnabled){
			this.sprite.inputEnabled = false;
			this.tweenAlpha(this.options.disabledAlpha, false);
			//this.sprite.tint = 0xdddddd;
			this.removeListeners();
		}
	};

	AbstractButton.prototype.stopTweens = function(){
		if(this.fadeTween){
			this.fadeTween.stop();
			this.fadeTween = null;
		}
	};

	AbstractButton.prototype.tweenAlpha = function(a, immediate){
		var duration, delay;
		duration = 250;
		delay = 500;
		this.stopTweens();
		if(immediate){
			duration = 50;
			delay = 50;
		}
		this.fadeTween = this.game.add.tween(this.sprite).to( {'alpha':a}, duration, Phaser.Easing.Linear.None, true, delay, false);
	};
	
	AbstractButton.prototype.mouseDown = function(){
		this.mouseDownSignal.dispatch({"target":this});
	};
	
	AbstractButton.prototype.destroy = function(){
		this.removeListeners();
		this.stopTweens();
		this.sprite.inputEnabled = false;
		this.sprite.destroy(true);
		this.mouseDownSignal = null;
		this.mouseUpSignal = null;
		View.prototype.destroy.call(this);
	};

	return AbstractButton;

});



define('phasercomponents/models/abstractmodel',['phaser', 'phasercomponents/injector'],

function(Phaser, Injector){
	
	
	
	var AbstractModel  = function(){
		this.changeSignal = new Phaser.Signal();
		Injector.getInstance().injectInto(this, "abstractmodel");
		this.value = null;
	};
	
	AbstractModel.prototype.trigger = function() {
		this.changeSignal.dispatch(this.value);
	};
	
	AbstractModel.prototype.decideTrigger = function(val, force) {
		if(force){
			return true;
		}
		if(this.value === null || this.value === undefined){
			return true;
		}
		if(typeof val === 'number'){
			return (val !== this.value);
		}
		else if(typeof val === 'object'){
			return (JSON.stringify(val) !== JSON.stringify(this.value));
		}
		else {
			return (val !== this.value);
		}
	};

	AbstractModel.prototype.set = function(val, options) {
		var trigger, force = false, silent = false;
		if(options && options.force){
			force = true;
		}
		if(options && options.silent){
			silent = true;
		}
		trigger = !silent && this.decideTrigger(val, force);
		this.value = val;
		if(trigger){
			this.trigger();
		}
	};

	AbstractModel.prototype.get = function() {
		return this.value;
	};
	
	AbstractModel.prototype.destroy = function() {
		this.changeSignal.dispose();
		this.changeSignal = null;
		Injector.getInstance().unInject(this);
		this.value = null;
	};
	
	return AbstractModel;

});
	


define(

	'phasercomponents/models/incrementmodel',['phasercomponents/models/abstractmodel', 'phasercomponents/utils/utils'],

function(AbstractModel, Utils){
	
	
	
	var IncrementModel  = function(options){
		this.num = options.num;
		AbstractModel.call(this);
	};

	Utils.extends(IncrementModel, AbstractModel);
	
	IncrementModel.prototype.increment = function() {
		var newValue = (this.get() + 1) % this.num;
		this.set(newValue);
	};

	IncrementModel.prototype.decrement = function() {
		var newValue = (this.get() - 1) % this.num;
		if(newValue < 0){
			newValue += this.num;
		}
		this.set(newValue);
	};
	
	return IncrementModel;

});
	


define(

	'phasercomponents/models/togglemodel',['phasercomponents/models/incrementmodel', 'phasercomponents/utils/utils'],

function(IncrementModel, Utils){
	
	
	
	var ToggleModel  = function(){
		IncrementModel.call(this, {"num":2});
	};
	
	Utils.extends(ToggleModel, IncrementModel);
	
	return ToggleModel;

});
	


define(

	'phasercomponents/models/movieclipmodel',['phasercomponents/models/abstractmodel', 'phasercomponents/utils/utils'],

function(AbstractModel, Utils){
	
	
	
	var MovieClipModel  = function(){
		AbstractModel.call(this);
	};
	
	Utils.extends(MovieClipModel, AbstractModel);
	
	return MovieClipModel;

});
	


define(

	'phasercomponents/display/buttongrid/buttongridmodel',['phasercomponents/models/abstractmodel', 'phasercomponents/utils/utils'],

function(AbstractModel, Utils){
	
	
	
	var ButtonGridModel  = function(){
		AbstractModel.call(this);
	};
	
	Utils.extends(ButtonGridModel, AbstractModel);
	
	return ButtonGridModel;

});
	


define('phasercomponents/display/buttongrid/buttongrid',['phaser', 'phasercomponents/display/container',

'phasercomponents/display/buttongrid/buttongridmodel', 'phasercomponents/utils/utils'],

function(Phaser, Container,

ButtonGridModel, Utils){
	
	
	
	var ButtonGrid = function(options){
		if(options.performSelect === null || options.performSelect === undefined){
			options.performSelect = true;
		}
		options.model = options.model || new ButtonGridModel();
		options.data = options.data || [];
		this.spaceX = options.bounds.w / options.numX;
		this.spaceY = options.bounds.h / options.numY;
		this.marginX = (this.spaceX - options.buttonClass.WIDTH)/2;
		this.marginY = (this.spaceY - options.buttonClass.HEIGHT)/2;
		this.buttons = [];
		this.changeSignal = new Phaser.Signal();
		this.clickSignal = new Phaser.Signal();
		Container.call(this, options);
		this.model.changeSignal.add(this.onSelectedChanged, this);
		this.init();
	};
	
	Utils.extends(ButtonGrid, Container);

	ButtonGrid.prototype.init = function(){
		this.showSelected(this.model.get());
	};

	ButtonGrid.prototype.onSelectedChanged = function(value){
		this.showSelected(value);
		this.changeSignal.dispatch({"index":value, "grid":this});
	};
	
	ButtonGrid.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addButtons();
	};
	
	ButtonGrid.prototype.disableInput = function(){
		this.buttons.forEach(function(b){
			b.disableInput();
		});
	};
	
	ButtonGrid.prototype.enableInput = function(){
		this.buttons.forEach(function(b){
			b.enableInput();
		});
	};
	
	ButtonGrid.prototype.showSelected = function(index) {
		this.buttons.forEach(function(button, i){
			if(i === index){
				button.select();
			}
			else{
				button.deselect();
			}
		});
	};
	
	ButtonGrid.prototype.addButtons = function(){
		var pos, i, j, b, n = 0, options, ClassRef;
		ClassRef = this.options.buttonClass;
		this.buttonGroup = new Phaser.Group(this.game, null);
		for(i = 1; i <= this.options.numY; i++){
			for(j = 1; j <= this.options.numX; j++){
				pos = {"x":this.bounds.x + this.spaceX * (j - 1), "y":this.bounds.y + this.spaceY * (i - 1)};
				pos.x += this.marginX;
				pos.y += this.marginY;
				options = {"bounds":pos, "index":n, "data":this.options.data[n], "frames":[0, 1, 2, 3], "sfx":this.options.sfx};
				b = new ClassRef(options);
				b.mouseUpSignal.add(this.buttonUp, this);
				this.buttonGroup.add(b.view);
				this.buttons.push(b);
				n++;
			}
		}
		this.group.add(this.buttonGroup);
	};
	
	ButtonGrid.prototype.getButtonAt = function(i) {
		return this.buttons[i];
	};

	ButtonGrid.prototype.buttonUp = function(data) {
		var target, index;
		target = data.target.view;
		index = this.buttonGroup.getIndex(target);
		if(this.options.performSelect){
			this.model.set(index);
		}
		this.clickSignal.dispatch({"index":index, "grid":this});
	};
	
	ButtonGrid.prototype.destroy = function() {
		var that = this;
		this.model.changeSignal.remove(this.onSelectedChanged, this);
		this.buttons.forEach(function(b){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		Container.prototype.destroy.call(this);
		this.buttonGroup.destroy(true);
		this.changeSignal.dispose();
		this.clickSignal.dispose();
		this.changeSignal = null;
		this.clickSignal = null;
		this.buttons = [];
		this.model = null;
		this.signal = null;
	};
	
	return ButtonGrid;

});





define(

	'phasercomponents/display/buttongrid/buttonbar',['phasercomponents/display/buttongrid/buttongrid', 'phasercomponents/utils/utils'],

function(ButtonGrid, Utils){
	
	
	
	var ButtonBar = function(options){
		this.direction = null;
		if(options.numX === 1){
			this.direction = ButtonBar.VERTICAL;
		}
		else if(options.numY === 1){
			this.direction = ButtonBar.HORIZONTAL;
		}
		if(!this.direction){
			throw "Not a button bar";
		}
		ButtonGrid.call(this, options);
	};
	
	ButtonBar.HORIZONTAL = "horizontal";
	ButtonBar.VERTICAL = "vertical";
	
	Utils.extends(ButtonBar, ButtonGrid);
	
	ButtonBar.prototype.create = function(){
		ButtonGrid.prototype.create.call(this);
	};

	ButtonBar.prototype.enableButtonAt = function(i){
		this.getButtonAt(i).enableInput();
	};
	
	ButtonBar.prototype.disableButtonAt = function(i){
		this.getButtonAt(i).disableInput();
	};
	
	ButtonBar.prototype.getButtonAt = function(i){
		return this.buttons[i];
	};
	
	ButtonBar.prototype.addButtons = function(){
		ButtonGrid.prototype.addButtons.call(this);
	};
	
	ButtonBar.prototype.destroy = function() {
		ButtonGrid.prototype.destroy.call(this);
	};
	
	ButtonBar.prototype.buttonUp = function(data) {
		ButtonGrid.prototype.buttonUp.call(this, data);
	};
	
	return ButtonBar;

});





define(

	'phasercomponents/display/buttongrid/tabbuttonbar',['phasercomponents/display/buttongrid/buttonbar', 'phasercomponents/utils/utils'],

function(ButtonBar, Utils){
	
	
	
	var TabButtonBar = function(game, options){
		ButtonBar.call(this, game, options);
	};
	
	Utils.extends(TabButtonBar, ButtonBar);
	
	TabButtonBar.prototype.create = function(){
		ButtonBar.prototype.create.call(this);
		if(this.model.get() === null){
			this.model.set(0);
		}
	};
	
	return TabButtonBar;
	
});



define('phasercomponents/display/slider/abstractslider',['phaser', 'phasercomponents/display/container',

'phasercomponents/display/interactivesprite', 'phasercomponents/utils/utils', 'phasercomponents/events/appevents'],

function(Phaser, Container,

InteractiveSprite, Utils, AppEvents){
	
	
	
	var AbstractSlider = function(options){
		var index;
		options.model.changeSignal.add(this.onChanged, this);
		Container.call(this, options);
		index = this.model.get();
		if(index !== null){
			this.goTo(index);
		}
	};
	
	AbstractSlider.TOLERANCE = 25;

	Utils.extends(AbstractSlider, Container);

	AbstractSlider.prototype.getSize = function(){
		return this.bounds[this.options.sizeKey];
	};

	AbstractSlider.prototype.getHandleSize = function(){
		return this.options.handleSize[this.options.sizeKey];
	};

	AbstractSlider.prototype.getOrigin = function(){
		return this.bounds[this.options.dirKey];
	};

	AbstractSlider.prototype.setMask = function(p){
		console.log("setMask", p);
		this.mask.scale[this.options.dirKey] = Math.max(p, 0.01);
	};
	
	AbstractSlider.prototype.getViewOrigin = function(){
		return this.view[this.options.dirKey];
	};

	AbstractSlider.prototype.getMousePos = function(p) {
		return p[this.options.dirKey];
	};

	AbstractSlider.prototype.moveHandleTo = function(d) {
		this.handle.sprite[this.options.dirKey] = this.bounds.x + d;	
	};

	AbstractSlider.prototype.getHandlePos = function() {
		return this.handle.sprite[this.options.dirKey] - this.getOrigin();
	};

	AbstractSlider.prototype.getStepDist = function(){
		return (this.getSize() - this.getHandleSize()) / this.options.num;
	};

	AbstractSlider.prototype.onChanged = function(value){
		this.goTo(value);
	};
	
	AbstractSlider.prototype.goTo = function(n) {
		console.log("goTo", n);
		this.posHandle(this.getHandleSize()/2 + (n * this.getStepDist()));
	};
	
	AbstractSlider.prototype.toMin = function() {
		this.model.set(0);
	};

	AbstractSlider.prototype.toMax = function() {
		this.model.set(this.options.num);
	};

	AbstractSlider.prototype.posHandle = function(d) {
		var p = d/this.getSize();
		this.moveHandleTo(d);
		this.setMask(p);
	};

	AbstractSlider.prototype.disableInput = function() {
		this.handle.disableInput();
		this.removeListeners();
	};
	
	AbstractSlider.prototype.enableInput = function() {
		this.handle.enableInput();
		this.handle.sprite.input.useHandCursor = true;
		this.addListeners();
	};	
	
	AbstractSlider.prototype.onUp = function() {
		this.removeMoveListeners();
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.snap();
	};
	
	AbstractSlider.prototype.snap = function() {
		var num = (this.getHandlePos() - this.getHandleSize()/2) / this.getStepDist();
		num = Math.round(num);
		this.model.set(num);
	};

	AbstractSlider.prototype.isOutside = function(localPoint) {
		if(localPoint.x < - AbstractSlider.TOLERANCE || localPoint.x > this.bounds.w + AbstractSlider.TOLERANCE){
			return true;
		}
		else if(localPoint.y < - AbstractSlider.TOLERANCE || localPoint.y > this.bounds.h + AbstractSlider.TOLERANCE){
			return true;
		}
		return false;
	};
	
	AbstractSlider.prototype.move = function() {
		var d, localPoint;
		localPoint = this.game.input.getLocalPosition(this.group, this.game.input.activePointer);
		localPoint.x -= this.bounds.x;
		localPoint.y -= this.bounds.y;
		if(this.isOutside(localPoint)){
			this.onUp();
		}
		else{
			d = Math.min(Math.max(this.getMousePos(localPoint), this.getHandleSize()/2), this.getSize() - this.getHandleSize()/2);
			this.posHandle(d);
		}
	};
	
	AbstractSlider.prototype.startDragging = function() {
		this.addMoveListeners();
	};
	
	AbstractSlider.prototype.addMoveListeners = function(){
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.moveCallback = this.move.bind(this);
		this.game.input.mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
	};

	AbstractSlider.prototype.removeMoveListeners = function(){
		this.game.input.onUp.remove(this.onUp, this);
		this.game.input.moveCallback = null;
		this.game.input.mouse.mouseOutCallback = null;
	};

	AbstractSlider.prototype.addListeners = function(){
		this.handle.mouseDownSignal.add(this.startDragging, this);
	};
	
	AbstractSlider.prototype.removeListeners = function(){
		this.handle.mouseDownSignal.remove(this.startDragging, this);
		this.removeMoveListeners();
	};
	
	AbstractSlider.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	AbstractSlider.prototype.removeHandle = function(){
		if(this.handle){
			this.group.remove(this.handle.sprite);
			this.handle.destroy();
			this.handle = null;
		}
	};

	AbstractSlider.prototype.addHandle = function(){
		var x, y, options;
		x = this.bounds.x + this.options.handleSize.w/2;
		y = this.bounds.y + this.options.handleSize.h/2;
		options = {"asset":this.options.handle, "bounds":{'x':x, 'y':y}};
		this.handle = new InteractiveSprite(options);
		this.handle.sprite.anchor.setTo(0.5, 0.5);
		this.group.add(this.handle.sprite);
	};
	
	AbstractSlider.prototype.addBg = function(){
		this.bg = new Phaser.Sprite(this.game,  this.bounds.x, this.bounds.y, this.options.sliderbg);
		this.group.add(this.bg);
	};

	AbstractSlider.prototype.addHighlight = function(){
		this.hl = new Phaser.Sprite(this.game,  this.bounds.x, this.bounds.y, this.options.sliderhl);
		this.group.add(this.hl);
	};

	AbstractSlider.prototype.addMask = function(){
		this.mask = new Phaser.Graphics(this.game, this.bounds.x, this.bounds.y);
   		this.mask.beginFill(0xff0000);
   		this.mask.drawRect(0, 0, this.bounds.w, this.bounds.h);
   		this.mask.endFill();
   		this.group.add(this.mask);
   		this.hl.mask = this.mask;
	};

	AbstractSlider.prototype.removeBg = function(){
		if(this.bg){
			this.group.remove(this.bg);
			this.bg.destroy(true);
			this.bg = null;
		}
	};

	AbstractSlider.prototype.removeHighlight = function(){
		if(this.hl){
			this.group.remove(this.hl);
			this.hl.destroy(true);
			this.hl = null;
		}
	};

	AbstractSlider.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addHighlight();
		this.addHandle();
		this.addMask();
		this.enableInput();
	};
	
	AbstractSlider.prototype.destroy = function(){
		this.removeListeners();
		this.removeBg();
		this.removeHandle();
		this.removeHighlight();
		this.model.changeSignal.remove(this.onChanged, this);		
		Container.prototype.destroy.call(this);
	};
	
	return AbstractSlider;

});




define('phasercomponents/display/slider/slider',['phasercomponents/utils/utils',

'phasercomponents/display/slider/abstractslider'],

function(Utils,

AbstractSlider){
	
	
	
	var Slider = function(options){
		options.dirKey = 'x';
		options.sizeKey = 'w';
		AbstractSlider.call(this, options);
	};
	
	Utils.extends(Slider, AbstractSlider);

	return Slider;

});


	

define('phasercomponents/display/slider/vslider',['phasercomponents/utils/utils',

'phasercomponents/display/slider/abstractslider'],

function(Utils,

AbstractSlider){
	
	
	
	var VSlider = function(options){
		options.dirKey = 'y';
		options.sizeKey = 'h';
		AbstractSlider.call(this, options);
	};
	
	Utils.extends(VSlider, AbstractSlider);

	return VSlider;

});


	

define(

	'phasercomponents/display/scroller/scroller',['phaser', 'phasercomponents/display/container', 'phasercomponents/utils/utils'],

function(Phaser, Container, Utils){
	
	

	var Scroller = function(options){
		this.x0 = null;
		this.children = [];
		this.dragging = false;
		this.minX = 0;
		this.pageNum = 0;
		this.selectSignal = new Phaser.Signal();
		this.pageSignal = new Phaser.Signal();
		Container.call(this, options);
	};
	
	Utils.extends(Scroller, Container);
	
	Scroller.MIN_MOVE = 10;
	
	Scroller.prototype.create = function(){
		Container.prototype.create.call(this);
		this.contentGroup = new Phaser.Group(this.game, null);
		this.addChildren();
	    this.addListeners();
	    this.group.add(this.contentGroup);
	};
	
	Scroller.prototype.addListeners = function() {
		this.game.input.onDown.add(this.onDown, this);
	};
	
	Scroller.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Scroller.prototype.add = function(child) {
		this.contentGroup.add(child.group);
		this.children.push(child);
		var x, w, m;
		x = child.options.bounds.x;
		w = child.options.bounds.w;
		m = -1*(x + w - this.game.width);
		this.minX = Math.min(this.minX, m);
		if(child.clickSignal){
			child.clickSignal.add(this.select, this);
		}
	};
	
	Scroller.prototype.getCurrentPage = function() {
		return this.children[this.pageNum];
	};
	
	Scroller.prototype.setSelected = function(i) {
		this.getCurrentPage().model.setSelected(i);
	};
	
	Scroller.prototype.gotoPage = function(p) {
		this.pageNum = p;
		this.pageSignal.dispatch({"pageNum":p});
		this.tweenTo(-this.options.snapX * p);
	};
	
	Scroller.prototype.next = function() {
		this.gotoPage(this.pageNum + 1);
	};
	
	Scroller.prototype.prev = function() {
		this.gotoPage(this.pageNum - 1);
	};
	
	Scroller.prototype.tweenTo = function(x) {
		this.moveTween = this.game.add.tween(this.contentGroup).to({'x': x}, 250, Phaser.Easing.Quadratic.Out, true, 20, false);
	};
	
	Scroller.prototype.select = function(data){
		var page = this.contentGroup.getIndex(data.grid.group);
		if(Math.abs(this.dx) < Scroller.MIN_MOVE){
			this.selectSignal.dispatch({"index":data.index, "page":page});
			data.grid.showSelected(data.index);
		}
	};
	
	Scroller.prototype.addChildren = function(){
		var i, num = this.options.dataProvider.getNumPages();
		for(i = 0; i < num; i++){
			this.add(this.options.dataProvider.getPageAt(i, this));
		}
	};
	
	Scroller.prototype.onDown = function() {
		this.startDragging();
	};
	
	Scroller.prototype.onUp = function() {
		this.dragging = false;
		this.game.input.moveCallback = null;
		this.snap();
	};
	
	Scroller.prototype.snap = function() {
		var pageNum = -Math.round(this.contentGroup.x / this.options.snapX);
		this.gotoPage(pageNum);
	};

	Scroller.prototype.buttonUp = function() {
		this.game.input.moveCallback = null;
		this.x0 = null;
		if(Math.abs(this.dx) > Scroller.MIN_MOVE){
			this.snap();
		}
	};

	Scroller.prototype.move = function(pointer, x) {
		var xpos;
		if(this.x0 === null){
			this.x0 = x;
		}
		this.dx = this.x0 - x;
		xpos = this.startX - this.dx;
		xpos = Math.min(Math.max(xpos, this.minX), 0);
		this.contentGroup.x = xpos;
	};
	
	Scroller.prototype.startDragging = function() {
		this.startX = this.contentGroup.x;
		this.dx = 0;
		this.x0 = null;
		this.dragging = true;
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
		this.game.input.moveCallback = this.move.bind(this);
	};
	
	Scroller.prototype.removeListeners = function() {
		this.game.input.onDown.remove(this.onDown, this);
		this.game.input.onUp.remove(this.onUp, this);
		this.game.input.moveCallback = null;
		this.game.input.mouse.mouseOutCallback = null;
	};
	
	Scroller.prototype.destroy = function() {
		var that = this;
		this.children.forEach(function(child){
			if(child.clickSignal){
				child.clickSignal.remove(that.select, that);
			}
			child.destroy();
		});
		this.moveTween.stop();
		this.removeListeners();
		this.pageSignal.dispose();
		this.selectSignal.dispose();
		this.pageSignal = null;
		this.selectSignal = null;
		Container.prototype.destroy.call(this);
	};
	
	return Scroller;

});





define(

	'phasercomponents/display/scroll/vscrollbar',['phasercomponents/display/interactivesprite', 'phasercomponents/utils/utils'],

function(InteractiveSprite, Utils){

	
	
	var VScrollBar  = function(options){
		InteractiveSprite.call(this, options);
	};
	
	VScrollBar.WIDTH = 20;
	VScrollBar.HEIGHT = 100;

	Utils.extends(VScrollBar, InteractiveSprite);
	
	VScrollBar.prototype.create = function(){
		InteractiveSprite.prototype.create.call(this);
		this.scrollPos = 0;
		this.resize(VScrollBar.HEIGHT);
		this.hide();
	};

	VScrollBar.prototype.hide = function(){
		this.disableInput();
		this.view.visible = false;
	};

	VScrollBar.prototype.show = function(){
		this.enableInput();
		this.view.visible = true;
	};

	VScrollBar.prototype.moveTo = function(y){
		this.sprite.y = y;
		this.scrollPos = y;
	};
	
	VScrollBar.prototype.resize = function(h){
		var scale = h/VScrollBar.HEIGHT;
		this.sprite.scale = {'x':1, 'y':scale};
	};

	VScrollBar.prototype.destroy = function(){
		InteractiveSprite.prototype.destroy.call(this);
	};

	return VScrollBar;
});
	




define('phasercomponents/display/scroll/vscroller',['phasercomponents/display/container', 'phasercomponents/utils/utils',

	'phasercomponents/display/scroll/vscrollbar'],

function(Container, Utils, 

	VScrollBar){
	
	
	
	var VScroller  = function(options){
		console.log("vscroller constructor ", JSON.stringify(options.bounds));
		Container.call(this, options);
	};
	
	Utils.extends(VScroller, Container);
	
	VScroller.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addMask();
		this.addScrollBar();
		this.scrollBar.view.alpha = 0.4;
	};

	VScroller.prototype.addListeners = function(){
		this.scrollBar.mouseDownSignal.add(this.startDragging, this);
	};

	VScroller.prototype.removeListeners = function(){
		this.scrollBar.mouseDownSignal.remove(this.startDragging, this);
	};

	VScroller.prototype.addScrollBar = function(){
		var options ={};
		options.bounds = {'x':this.bounds.x + this.bounds.w - VScrollBar.WIDTH - 2, 'y':this.bounds.y, 'w':VScrollBar.WIDTH, 'h':VScrollBar.HEIGHT};
		options.asset = this.options.scrollBarAsset;
		this.scrollBar = new VScrollBar(options);
    	this.group.add(this.scrollBar.view);
	};

	VScroller.prototype.move = function(pointer) {
		var localPoint, dy, newY;
		localPoint = this.game.input.getLocalPosition(this.group, pointer);
		dy = localPoint.y - this.mouse0;
		newY = this.y0 + dy;
		newY = this.bound(newY);
		this.goTo(newY);
	};

	VScroller.prototype.bound = function(y){
		var min, max, H, h, Hminush;
		H = this.getContentHeight();
		h = this.getScrollHeight();
		Hminush = H - h;
		min = 0;
		max = (h/H)*Hminush;
		return Math.max(Math.min(y, max), min);
	};

	VScroller.prototype.goTo = function(y){
		if(this.contents){
			var H, h, Hminush, cy;
			H = this.getContentHeight();
			h = this.getScrollHeight();
			Hminush = H - h;
			cy = -y*H/h;
			this.scrollBar.moveTo(y);
			this.contents.view.y = cy;
		}
	};

	VScroller.prototype.onUp = function() {
		this.removeMoveListeners();
		this.scrollBar.view.alpha = 0.5;
	};

	VScroller.prototype.removeMoveListeners = function(){
		this.game.input.onUp.remove(this.onUp, this);
		this.game.input.moveCallback = null;
		this.game.input.mouse.mouseOutCallback = null;
	};

	VScroller.prototype.getContentHeight = function() {
		return this.contents.getContentHeight();
	};

	VScroller.prototype.getScrollHeight = function() {
		return this.bounds.h;
	};

	VScroller.prototype.update = function() {
		var H, h;
		H = this.getContentHeight();
		h = this.getScrollHeight();
		this.removeListeners();
		this.removeMoveListeners();
		this.scale();
		if(H > h + 1){
			this.addListeners();
			this.scrollBar.show();
		}
		else{
			this.scrollBar.hide();
		}
	};

	VScroller.prototype.scale = function() {
		if(this.contents){
			var H, h, barH;
			H = this.getContentHeight();
			h = this.getScrollHeight();
			barH = h*h/H;
			this.scrollBar.resize(h*h/H);
		}
	};
	
	VScroller.prototype.startDragging = function() {
		var localPoint = this.game.input.getLocalPosition(this.group, this.game.input.activePointer);
		this.mouse0 = localPoint.y;
		this.y0 = this.scrollBar.scrollPos;
		this.addMoveListeners();
		this.scrollBar.view.alpha = 1;
	};
	
	VScroller.prototype.mouseOutCallback = function() {
		this.onUp();
	};

	VScroller.prototype.addMoveListeners = function(){
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.moveCallback = this.move.bind(this);
		this.game.input.mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
	};

	VScroller.prototype.setContents = function(contents){
		this.removeContents();
		this.contents = contents;
		this.group.add(this.contents.view);
		//this.contents.view.mask = this.mask;
		this.update();
	};

	VScroller.prototype.addMask = function(){
		this.mask = new Phaser.Graphics(this.game, 0, 0);
		this.mask.beginFill(0xff0000);
		this.mask.alpha = 0.2;
		console.log("drawing mask", JSON.stringify(this.options.bounds));
    	this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    	this.mask.endFill();
    	this.group.add(this.mask);
	};

	VScroller.prototype.removeContents = function(){
		if(this.contents){
			this.contents.view.mask = null;
			this.group.remove(this.contents.view);
			this.contents.destroy();
			this.contents = null;
		}
	};

	VScroller.prototype.destroy = function(){
		this.removeContents();
		this.removeListeners();
		this.removeMoveListeners();
		this.group.remove(this.mask);
		this.group.remove(this.scrollBar);
		this.contents = null;
		this.mask = null;
		Container.prototype.destroy.call(this);
	};

	return VScroller;
});
	



define('phasercomponents/display/tabpanel/tabpanel',['phasercomponents/display/container',

	'phasercomponents/utils/utils', 'phasercomponents/display/buttongrid/tabbuttonbar'

],

function(Container,

	Utils, TabButtonBar

){
	
	
	
	var TabPanel = function(options){
		Container.call(this, options);
	};
	
	Utils.extends(TabPanel, Container);

	TabPanel.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addButtonBar();
		this.addPanels();
		this.showPanel(0);
	};
	
	TabPanel.prototype.getData = function(){
		var i, panel, data = [];
		for(i = 0; i < this.options.panels.length; i++){
			panel = this.options.panels[i];
			data.push(panel.getData());
		}
		return data;
	};

	TabPanel.prototype.addButtonBar = function(){
		console.log("addButtonBar");
		var options, bounds, data, i, w, h;
		w = this.options.panels.length * this.options.buttonClass.WIDTH;
		h = this.options.buttonClass.HEIGHT;
		bounds = {'x':this.bounds.x, 'y':this.bounds.y, 'w':w, 'h':h};
		data = [];
		for(i = 0; i < this.options.panels.length; i++){
			data.push({"num":i});	
		}
		options = {"bounds":bounds, "numX":this.options.panels.length, "performSelect":true, "numY":1, "buttonClass":this.options.buttonClass, "data":data};
		this.buttonBar = new TabButtonBar(options);
		this.buttonBar.changeSignal.add(this.barClick, this);
		this.group.add(this.buttonBar.view);
	};
	
	TabPanel.prototype.barClick = function(data){
		this.showPanel(data.index);
	};

	TabPanel.prototype.showPanel = function(index){
		var i, panel;
		for(i = 0; i < this.options.panels.length; i++){
			panel = this.options.panels[i];
			panel.view.visible = (i === index);
		}
	};

	TabPanel.prototype.addPanels = function(){
		var i, panel, that = this;
		for(i = 0; i < this.options.panels.length; i++){
			panel = this.options.panels[i];
			that.group.add(panel.view);
		}
	};

	TabPanel.prototype.removeButtons = function(){
		this.buttonBar.changeSignal.remove(this.barClick, this);
		this.group.remove(this.buttonBar.view);
		this.buttonBar.destroy(true);
		this.buttonBar = null;
	};

	TabPanel.prototype.removePanels = function(){
		var that = this;
		this.options.panels.forEach(function(panel){
			that.group.remove(panel.view);
			panel.destroy(true);
		});
	};

	TabPanel.prototype.destroy = function(){
		this.removePanels();
		this.removeButtons();
		Container.prototype.destroy.call(this);
	};

	return TabPanel;

});











define(

	'phasercomponents/scene',['phasercomponents/injector'],

	function(Injector){
	
	
	
	var Scene  = function(){
		this.inject();
	};

	Scene.prototype.inject = function() {
		Injector.getInstance().injectInto(this, "scene");
	};

	Scene.prototype.shutdown = function() {
		Injector.getInstance().unInject(this);
	};

	return Scene;

});
	
	





define('phasercomponents/display/scroller/groupmarker',[

	'phasercomponents/display/container', 'phasercomponents/utils/utils'],

function(Container, Utils){
	
	
	
	var GroupMarker = function(options){
		this.buttons = [];
		Container.call(this, options);
	};
	
	Utils.extends(GroupMarker, Container);
	
	GroupMarker.prototype.create = function(){
		var b, i, x, y, ClassRef;
		ClassRef = this.options.buttonClass;
		Container.prototype.create.call(this);
		for(i = 0; i <= this.options.num - 1; i++){
			x = this.bounds.x + i * ClassRef.WIDTH;
			y = this.bounds.y;
			b = new ClassRef({'bounds':{"x":x, "y":y}});
			this.group.add(b.sprite);
			this.buttons.push(b);
		}
		this.setSelected(0);
	};
	
	GroupMarker.prototype.destroy = function() {
		this.buttons.forEach(function(button){
			button.destroy();
		});
		this.buttons = [];
		Container.prototype.destroy.call(this);
	};
	
	GroupMarker.prototype.setSelected = function(index) {
		this.buttons.forEach(function(button, i){
			if(i === index){
				button.select();
			}
			else{
				button.deselect();
			}
		});
	};

	return GroupMarker;

});





define(

	'phasercomponents/display/scroller/pager',['phasercomponents/display/scroller/groupmarker',

	'phasercomponents/display/scroller/scroller', 'phasercomponents/utils/utils'],

function(GroupMarker, Scroller, Utils){
	
	
	
	var Pager = function(options){
		Scroller.call(this, options);
		if(options.snapX !== this.game.w){
			throw "should snap to game width";
		}
	};
	
	Utils.extends(Pager, Scroller);
	
	Pager.prototype.addChildren = function(){
		var numPages, bounds, buttonClass;
		Scroller.prototype.addChildren.call(this);
		buttonClass = this.options.markerButtonClass;
		numPages = this.numPages();
		bounds = {'x':this.bounds.x + this.bounds.w/2 - (numPages/2)*buttonClass.WIDTH, 'y':this.bounds.y + this.bounds.h - 110};
		if(numPages >= 2){
			this.groupMarker = new GroupMarker({"num":numPages, "buttonClass":buttonClass, "bounds":bounds});
			this.group.add(this.groupMarker.group);
		}
	};
	
	Pager.prototype.numPages = function() {
		return this.options.dataProvider.getNumPages();
	};
	
	Pager.prototype.destroy = function() {
		if(this.groupMarker){
			this.groupMarker.destroy();
			this.groupMarker = null;
		}
		Scroller.prototype.destroy.call(this);
	};
	
	Pager.prototype.updateMarker = function() {
		if(this.groupMarker){
			this.groupMarker.setSelected(this.pageNum);
		}
	};
	
	Pager.prototype.gotoPage = function(p) {
		Scroller.prototype.gotoPage.call(this, p);
		this.updateMarker();
	};

	return Pager;

});





define(

	'phasercomponents/display/buttons/multibutton',['phasercomponents/display/movieclip', 'phasercomponents/utils/utils', 'phasercomponents/events/appevents'],

function(MovieClip, Utils, AppEvents){
	
	
	
	var MultiButton = function(options){
		MovieClip.call(this, options);
		this.model.changeSignal.add(this.onChanged, this);
	};

	Utils.extends(MultiButton, MovieClip);

	MultiButton.prototype.onChanged = function(value){
		this.goTo(value);
	};

	MultiButton.prototype.create = function(){
		MovieClip.prototype.create.call(this);
		this.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	MultiButton.prototype.setFrame = function(frame, options){
		this.model.set(frame, options);
	};

	MultiButton.prototype.mouseUp = function(data){
		var p, frame;
		p = data.localPoint.x / this.bounds.w;
		frame = Math.floor(this.options.numSegments * p);
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.setFrame(frame);
	};
	
	MultiButton.prototype.destroy = function(){
		this.disableInput();
		this.mouseUpSignal.remove(this.mouseUp, this);
		this.model.changeSignal.remove(this.onChanged, this);
		MovieClip.prototype.destroy.call(this);
	};

	return MultiButton;

});




define(

	'phasercomponents/display/buttons/steppermodel',['phasercomponents/models/incrementmodel', 'phasercomponents/utils/utils'],

function(IncrementModel, Utils){
	
	
	
	var StepperModel = function(options){
		IncrementModel.call(this, options);
	};

	Utils.extends(StepperModel, IncrementModel);
	
	return StepperModel;

});
	


define('phasercomponents/display/buttons/stepperbutton',[ 
	
'phasercomponents/display/movieclip', 'phasercomponents/utils/utils',

'phasercomponents/events/appevents', 'phasercomponents/display/buttons/steppermodel'],

function(MovieClip, Utils, AppEvents, StepperModel){
	
	
	
	var StepperButton = function(options){
		options.model = options.model || new StepperModel({"num":options.numFrames});
		MovieClip.call(this, options);
		this.mouseUpSignal.add(this.onStep, this);
		this.model.changeSignal.add(this.onChanged, this);
		this.enableInput();
	};

	Utils.extends(StepperButton, MovieClip);

	StepperButton.prototype.onChanged = function(value){
		this.goTo(value);
	};

	StepperButton.prototype.onStep = function(){
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.performStep();
	};
	
	StepperButton.prototype.performStep = function(){
		this.model.increment();
	};

	StepperButton.prototype.destroy = function(){
		this.model.changeSignal.remove(this.onChanged, this);
		this.mouseUpSignal.remove(this.onStep, this);
		this.model = null;
		this.sprite.destroy(true);
		this.options = null;
		MovieClip.prototype.destroy.call(this);
	};

	return StepperButton;

});




define('phasercomponents/display/buttons/vstepperbutton',[ 
	
'phasercomponents/display/buttons/stepperbutton', 'phasercomponents/utils/utils'],

function(StepperButton, Utils){
	
	
	
	var VStepperButton = function(options){
		StepperButton.call(this, options);
	};

	Utils.extends(VStepperButton, StepperButton);

	VStepperButton.prototype.onMouseUp = function(){
		StepperButton.prototype.onMouseUp.call(this);
		var frame = Math.round(this.options.numFrames * (this.bounds.h - this.mouseUpPoint.y) / this.bounds.h);
		frame = Math.max(Math.min(frame, this.options.numFrames), 0);
		this.model.set(frame);
	};

	VStepperButton.prototype.performStep = function(){
		
	};

	return VStepperButton;

});




define('phasercomponents/text/textfactory',['phaser'], function(Phaser){
	
	
	
	var TextFactory  = function(){
		
	};

	TextFactory.registerFont = function(key, fontData){
		if(!TextFactory.fonts){
			TextFactory.fonts = {};
		}
		TextFactory.fonts[key] = fontData;
	};

	TextFactory.make = function(key, game, x, y, label){
		var fontData, font, text;
		fontData = TextFactory.fonts[key];
		font = {"font": fontData.size+"px "+ fontData.fontName, "align": fontData.align, "fill":fontData.color};
		text = new Phaser.Text(game, x, y, label, font);
		return text;
	};
	
	return TextFactory;

});
	
	



define(

	'phasercomponents/display/buttons/radiobuttons',['phasercomponents/display/container', 'phasercomponents/utils/utils',

	'phasercomponents/display/buttongrid/buttonbar',

	'phasercomponents/text/textfactory'

],

function(Container, Utils,

	ButtonBar, TextFactory

){
	
	
	
	var RadioButtons  = function(options){
		options.numX = 1;
		Container.call(this, options);
	};
	
	RadioButtons.WIDTH = 100;
	RadioButtons.HEIGHT = 80;

	Utils.extends(RadioButtons, Container);

	RadioButtons.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addButtons();
		this.addLabels();
	};

	RadioButtons.prototype.addLabels = function(){
		var that = this;
		this.buttons.buttons.forEach(function(button, i){
			var label, bounds;
			bounds = button.bounds;
			label = TextFactory.make(that.options.fontKey, that.game, bounds.x + 41, bounds.y + 13, that.options.labels[i]);
			that.group.add(label);
		});
	};

	RadioButtons.prototype.disableInput = function(){
		this.buttons.disableInput();
	};

	RadioButtons.prototype.enableInput = function(){
		this.buttons.enableInput();
	};
	
	RadioButtons.prototype.addButtons = function(){
		this.buttons = new ButtonBar(this.options);
		this.group.add(this.buttons.group);
	};
	
	RadioButtons.prototype.destroy = function(){
		this.group.remove(this.buttons.group);
		this.buttons.destroy();
		this.buttons = null;
		Container.prototype.destroy.call(this);
	};

	return RadioButtons;

});
	



define(

	'phasercomponents/display/buttons/togglebutton',['phasercomponents/display/buttons/stepperbutton', 'phasercomponents/utils/utils'],

function(StepperButton, Utils){
	
	
	
	var ToggleButton = function(options){
		options.numFrames = 2;
		StepperButton.call(this, options);
	};

	ToggleButton.WIDTH = 120;
	ToggleButton.HEIGHT = 60;

	Utils.extends(ToggleButton, StepperButton);

	return ToggleButton;

});




define('phasercomponents/preloader',['phaser'], function(Phaser){
	
	
	
	var Preloader = function(game, assets){
		this.numLoaded = 0;
		this.game = game;
		this.assets = assets;
		this.loadSignal = new Phaser.Signal();
	};
	
	Preloader.prototype.loadNext = function(){
		var obj, type, key, asset;
		obj = this.assets[this.numLoaded];
		type = obj.type;
		key = obj.key;
		asset = obj.asset;
		if(!key || !asset){
			throw "Asset not found";
		}
		if(type === "image"){
			this.game.load.image(key, asset);
		}
		else if(type === "spritesheet"){
			this.game.load.spritesheet(key, asset, obj.w, obj.h);
		}
		else if(type === "tilemap"){
			this.game.load.tilemap(key, asset, null, Phaser.Tilemap.TILED_JSON);
		}
		else if(type === "sound"){
			this.game.load.audio(key, asset);
		}
	};
	
	Preloader.prototype.start = function(){
		this.game.load.onFileComplete.add(this.fileLoaded.bind(this));
		this.loadNext();
	};

	Preloader.prototype.fileLoaded = function() {
		this.numLoaded++;
		this.loadSignal.dispatch({"numLoaded":this.numLoaded, "total":this.assets.length});
		if(this.numLoaded < this.assets.length){
			this.loadNext();
		}
	};

	Preloader.prototype.destroy = function() {
		this.loadSignal = null;
	};
	
	return Preloader;

});







define('phasercomponents/display/popups/abstractpopup',['phaser', 'phasercomponents/events/appevents',

'phasercomponents/display/container', 'phasercomponents/utils/utils'],

function(Phaser, AppEvents,

Container, Utils){
	
	
		
	var AbstractPopup = function(options){
		this.buttons = [];
		this.selectSignal = new Phaser.Signal();
		Container.call(this, options);
		this.group.y = this.game.h + 50;
	};
	
	Utils.extends(AbstractPopup, Container);
	
	AbstractPopup.prototype.addPanel = function () {
		if(this.options.bgasset){
			this.panel = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.bgasset);
			this.group.add(this.panel);
		}
	};

	AbstractPopup.prototype.removePanel = function () {
		if(this.panel){
			this.group.remove(this.panel);
			this.panel = null;
		}
	};
	
	AbstractPopup.prototype.useBg = function () {
		return true;
	};

	AbstractPopup.prototype.showMe = function () {
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.moveTween = this.game.add.tween(this.group).to( {'y': 0}, 400, Phaser.Easing.Back.Out, true, 201, false);
		this.moveTween.onComplete.add(this.onShown, this);
	};

	AbstractPopup.prototype.onShown = function () {
		this.moveTween.onComplete.remove(this.onShown, this);
		this.moveTween = null;
	};

	AbstractPopup.prototype.hideMe = function () {
		this.hideTween = this.game.add.tween(this.group).to( {'y': this.game.h + 50}, 400, Phaser.Easing.Back.Out, true, 202, false);
	};

	AbstractPopup.prototype.getData = function() {
		return {};
	};
	
	AbstractPopup.prototype.buttonUp = function(data) {
		var index, selectionData;
		index = this.buttonGroup.getIndex(data.target.view);
		selectionData = this.getData();
		this.selectSignal.dispatch({"index":index, "selection":selectionData});
	};

	AbstractPopup.prototype.addButton = function (ClassRef, bounds) {
		var b = new ClassRef({'bounds':bounds});
		b.mouseUpSignal.add(this.buttonUp, this);
		this.buttonGroup.add(b.view);
		this.buttons.push(b);
		this.group.bringToTop(this.buttonGroup);
	};
	
	AbstractPopup.prototype.addButtonGroup = function () {
		this.buttonGroup = new Phaser.Group(this.game, null);
		this.group.add(this.buttonGroup);
	};
	
	AbstractPopup.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addPanel();
		this.addButtonGroup();
	};

	AbstractPopup.prototype.removeTweens = function () {
		if(this.moveTween){
			this.moveTween.stop();
		}
		if(this.hideTween){
			this.hideTween.stop();
		}
	};

	AbstractPopup.prototype.destroyButtons = function () {
		var that = this;
		this.buttons.forEach(function(b){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		this.buttons = [];
	};

	AbstractPopup.prototype.destroy = function () {
		this.removeTweens();
		this.destroyButtons();
		this.removePanel();
		this.selectSignal.dispose();
		this.selectSignal = null;
		this.buttonGroup = null;
		Container.prototype.destroy.call(this);
	};
	
	return AbstractPopup;
	
});
	





define(

	'phasercomponents/display/loaderbar',['phasercomponents/display/movieclip', 'phasercomponents/utils/utils'], 

	function(MovieClip, Utils){
	
	
	
	var LoaderBar = function(options){
		this.name = "loaderbar";
		MovieClip.call(this, options);
		this.create();
	};
	
	Utils.extends(LoaderBar, MovieClip);

	LoaderBar.prototype.goToPercent = function(p){
		var g;
		g = (this.options.numFrames - 1)/100;
		MovieClip.prototype.goTo.call(this, Math.round(p*g));
	};
	
	LoaderBar.prototype.destroy = function(){
		MovieClip.prototype.destroy.call(this);
	};
	
	return LoaderBar;

});


define( 'phasercomponents/drag/abstractaccepter',[], function(){
	
	

	var AbstractAccepter = function(data){
		this.data = data;
	};

	AbstractAccepter.prototype.willAccept = function(){
		return false;
	};

	return AbstractAccepter;
});


define(

	'phasercomponents/drag/abstractdragview',['phasercomponents/utils/utils', 'phasercomponents/display/interactivesprite'],

	function(Utils, InteractiveSprite){
	
	

	var AbstractDragView = function(options){
		options.origPos = {'x':options.bounds.x, 'y':options.bounds.y};
		InteractiveSprite.call(this, options);
	};

	Utils.extends(AbstractDragView, InteractiveSprite);

	AbstractDragView.prototype.snap = function(target, bounds){
		this.moveTo(target.sprite.x + target.sprite.width/2 + bounds.x - this.sprite.width/2, target.sprite.y + target.sprite.height/2 + bounds.y - this.sprite.height/2);
	};

	AbstractDragView.prototype.reset = function(){
		this.moveTo(this.options.origPos.x, this.options.origPos.y);
	};

	AbstractDragView.prototype.create = function(){
		InteractiveSprite.prototype.create.call(this);
		this.enableInput();
	};

	return AbstractDragView;

});


define(

	'phasercomponents/drag/abstractdropview',['phasercomponents/utils/utils', 'phasercomponents/display/movieclip'],

	function(Utils, MovieClip){

	

	var AbstractDropView = function(options){
		MovieClip.call(this, options);
	};

	Utils.extends(AbstractDropView, MovieClip);

	AbstractDropView.prototype.highlight = function(){

	};

	AbstractDropView.prototype.color = function(){
		
	};

	return AbstractDropView;
});

define( 'phasercomponents/drag/dragfailtypes',[], function(){
	
	

	var DragFailTypes = function(){
	
	};

	DragFailTypes.FAIL_RETURN = 0;
	DragFailTypes.FAIL_REMOVE = 1;

	return DragFailTypes;
});


define(

	'phasercomponents/drag/dragmanager',['phasercomponents/drag/dragfailtypes', 'phaser'],

	function(DragFailTypes, Phaser){
	
	

	var DragManager = function(container, game, options){
		this.game = game;
		this.container = container;
		this.options = options;
		this.model = options.model;
		this.editSignal = new Phaser.Signal();
		if(this.options.fail === null || this.options.fail === undefined){
			throw "No fail specified";
		}
		this.views = [];
		this.targets = [];
		this.draggedView = null;
		this.enabled = true;
	};

	DragManager.TOLERANCE = 35;
	
	DragManager.prototype.enableInput = function(){
		var that = this;
		if(this.enabled){
			return;
		}
		this.views.forEach(function(view){
			view.mouseDownSignal.add(that.downHandler, that);
		});
		this.enabled = true;
	};

	DragManager.prototype.disableInput = function(){
		var that = this;
		if(!this.enabled){
			return;
		}
		this.views.forEach(function(view){
			view.mouseDownSignal.remove(that.downHandler, that);
		});
		this.enabled = false;
	};
		
	DragManager.prototype.clear = function(){
		this.destroyViews();
		this.model.clear();
	};

	DragManager.prototype.addTarget = function(target, row){
		this.targets.push(target);
		this.model.addRow(row);
	};

	DragManager.prototype.removeTarget = function(target){
		var index = this.targets.indexOf(target);
		this.targets.splice(index, 1);
		this.model.removeRowAt(index);
	};

	DragManager.prototype.addDrag = function(view){
		view.mouseDownSignal.add(this.downHandler, this);
		this.views.push(view);
	};

	DragManager.prototype.startDrag = function(view){
		if(this.enabled){
			this.addMoveListeners();
			this.draggedView = view;
			this.model.removeView(view);
		}
	};

	DragManager.prototype.downHandler = function(data){
		this.startDrag(data.target);
	};

	DragManager.prototype.getClosest = function(){
		var i, x, y, index = -1, target, dist, w, h, dx, dy;
		x = this.draggedView.sprite.x;
		y = this.draggedView.sprite.y;
		w = this.draggedView.sprite.width;
		h = this.draggedView.sprite.height;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			dx = x + w/2 - target.sprite.x - target.sprite.width/2;
			dy = y + h/2 - target.sprite.y - target.sprite.height/2;
			dist = Math.sqrt(dx*dx + dy*dy);
			if(dist < DragManager.TOLERANCE){
				index = i;
				break;
			}
		}
		return index;
	};

	DragManager.prototype.addMoveListeners = function(){
		this.game.input.moveCallback = this.onMove.bind(this);
		this.game.input.onUp.add(this.onUp, this);
	};

	DragManager.prototype.removeMoveListeners = function(){
		this.game.input.moveCallback = null;
		this.game.input.onUp.remove(this.onUp, this);
	};

	DragManager.prototype.snapTo = function(view, rowIndex, zoneIndex){
		var hitzone = this.model.addView(view, rowIndex, zoneIndex);
		if(hitzone){
			view.snap(this.targets[rowIndex], hitzone.bounds);
		}
	};

	DragManager.prototype.drop = function(){
		if(this.dropPosition && this.dropPosition.rowIndex >= 0){
			this.snapTo(this.draggedView, this.dropPosition.rowIndex, this.dropPosition.zoneIndex);
			this.targets[this.dropPosition.rowIndex].highlight(false);
			this.editSignal.dispatch();
		}
		else{
			this.fail();
			this.editSignal.dispatch();
		}
	};

	DragManager.prototype.removeView = function(view){
		var index;
		if(view){
			index = this.views.indexOf(view);
			view.mouseDownSignal.remove(this.downHandler, this);
			view.destroy(true);
			this.views.splice(index, 1);
		}
	};

	DragManager.prototype.fail = function(){
		if(this.options.fail === DragFailTypes.FAIL_RETURN){
			this.draggedView.reset();
		}
		else if (this.options.fail === DragFailTypes.FAIL_REMOVE){
			this.removeView(this.draggedView);
			this.draggedView = null;
		}
	};

	DragManager.prototype.onUp = function(){
		this.setDropPosition();
		this.drop();
		this.removeMoveListeners();
		this.draggedView = null;
	};

	DragManager.prototype.setDropPosition = function(){
		var rowIndex, zoneIndex;
		rowIndex = this.getClosest();
		if(rowIndex >= 0){
			zoneIndex = this.model.getZoneIndex(this.draggedView, rowIndex);
			if(zoneIndex === -1){
				rowIndex = -1;
			}
		}
		this.dropPosition = {"rowIndex":rowIndex, "zoneIndex":zoneIndex};
	};

	DragManager.prototype.checkTargets = function(){
		var rowIndex;
		this.setDropPosition();
		rowIndex = this.dropPosition.rowIndex;
		this.targets.forEach(function(target, i){
			target.highlight(i === rowIndex);
		});
	};

	DragManager.prototype.onMove = function(pointer){
		var newX, newY, p;
		p = this.game.input.getLocalPosition(this.container, pointer);
		newX = p.x - this.draggedView.view.width/2;
		newY = p.y - this.draggedView.view.height/2;
		this.draggedView.moveTo(newX, newY);
		this.checkTargets();
	};

	DragManager.prototype.destroyTargets = function(){
		while(this.targets.length > 0){
			this.removeTarget(this.targets[0]);
		}
	};

	DragManager.prototype.destroyViews = function(){
		this.removeMoveListeners();
		while(this.views.length > 0){
			this.removeView(this.views[0]);
		}
	};

	DragManager.prototype.destroy = function(){
		this.destroyViews();
		this.destroyTargets();
		this.editSignal.dispose();
		this.editSignal = null;
		this.model.clear();
		this.model = null;
		this.views = null;
		this.targets = null;
		this.draggedView = null;
		this.dropPosition = null;
	};

	return DragManager;
});


define( 'phasercomponents/drag/dragmodel',[], function(){
	
	

	var DragModel = function(){
		this.rows = [];
	};

	DragModel.prototype.toJson = function(){
		var json = [];
		this.rows.forEach(function(row){
			json.push(row.toJson());
		});
		return json;
	};

	DragModel.prototype.addView = function(view, rowIndex, zoneIndex){
		var row, hitzone = null;
		row = this.rows[rowIndex];
		if(row){
			hitzone = row.add(view, zoneIndex);
		}
		return hitzone;
	};

	DragModel.prototype.clear = function(){
		var that = this;
		this.rows.forEach(function(row, i){
			that.clearRowAt(i);
		});
	};

	DragModel.prototype.addRow = function(row){
		this.rows.push(row);
	};

	DragModel.prototype.clearRowAt = function(i){
		this.rows[i].clear();
	};

	DragModel.prototype.removeRowAt = function(i){
		this.rows[i].destroy();
		this.rows.splice(i, 1);
	};

	DragModel.prototype.removeView = function(view){
		this.rows.forEach(function(row){
			row.remove(view);
		});
	};

	DragModel.prototype.getZoneIndex = function(view, i){
		return this.rows[i].getZoneIndex(view);
	};

	return DragModel;
});


define( 'phasercomponents/drag/hitzone',[], function(){
	
	

	var HitZone = function(accepter, bounds){
		this.accepter = accepter;
		this.bounds = bounds;
		this.view = null;
	};

	HitZone.prototype.willAccept = function(view){
		var accept = (this.view === null && this.accepter.willAccept(view));
		return accept;
	};

	HitZone.prototype.toJson = function(){
		if(this.view){
			return this.view.toJson();
		}
		else {
			return {};
		}
	};

	HitZone.prototype.clear = function(){
		this.view = null;
	};

	HitZone.prototype.add = function(view){
		this.view = view;
	};

	HitZone.prototype.remove = function(view){
		if(this.view === view){
			this.clear();
		}
	};

	HitZone.prototype.destroy = function(){
		this.clear();
		this.accepter = null;
		this.bounds = null;
	};

	return HitZone;
});


define( 'phasercomponents/drag/hitzonerow',[], function(){
	
	

	var HitZoneRow = function(hitzones){
		this.hitzones = hitzones;
	};

	HitZoneRow.prototype.getAcceptedIndex = function(view){
		var i, index = -1, hitzone;
		for(i = 0; i < this.hitzones.length; i++){
			hitzone = this.hitzones[i];
			if(hitzone.willAccept(view)){
				index = i;
				break;
			}
		}
		return index;
	};

	HitZoneRow.prototype.toJson = function(){
		var json = [];
		this.hitzones.forEach(function(hitzone){
			json.push(hitzone.toJson());
		});
		return json;
	};

	HitZoneRow.prototype.add = function(view, zoneIndex){
		var hitzone = this.hitzones[zoneIndex];
		if(hitzone){
			hitzone.add(view);
		}
		return hitzone;
	};

	HitZoneRow.prototype.clear = function(){
		this.hitzones.forEach(function(hitzone){
			hitzone.clear();
		});
	};

	HitZoneRow.prototype.getZoneIndex = function(view){
		return this.getAcceptedIndex(view);
	};

	HitZoneRow.prototype.remove = function(view){
		this.hitzones.forEach(function(hitzone){
			hitzone.remove(view);
		});
	};

	HitZoneRow.prototype.destroy = function(){
		this.hitzones.forEach(function(hitzone){
			hitzone.destroy();
		});
		this.hitzones = [];
	};

	return HitZoneRow;
});



define('phasercomponents',[

	'phasercomponents/context',
	'phasercomponents/injector',
	'phasercomponents/display/movieclip',
	'phasercomponents/display/container',
	'phasercomponents/display/interactivesprite',
	'phasercomponents/display/buttons/abstractbutton',
	'phasercomponents/models/abstractmodel',
	'phasercomponents/models/togglemodel',
	'phasercomponents/models/incrementmodel',
	'phasercomponents/models/movieclipmodel',
	'phasercomponents/display/buttongrid/buttongrid',
	'phasercomponents/display/buttongrid/buttongridmodel',
	'phasercomponents/display/buttongrid/tabbuttonbar',
	'phasercomponents/display/buttongrid/buttonbar',
	'phasercomponents/events/eventdispatcher',
	'phasercomponents/events/appevents',
	'phasercomponents/display/slider/slider',
	'phasercomponents/display/slider/vslider',
	'phasercomponents/display/scroller/scroller',
	'phasercomponents/display/scroll/vscroller',
	'phasercomponents/display/tabpanel/tabpanel',
	'phasercomponents/scene',
	'phasercomponents/display/view',
	'phasercomponents/utils/storage',
	'phasercomponents/utils/abstractstorageadapter',
	'phasercomponents/utils/alertmanager',
	'phasercomponents/utils/soundmanager',
	'phasercomponents/utils/keymanager',
	'phasercomponents/commands/abstractcommand',
	'phasercomponents/display/scroller/pager',
	'phasercomponents/display/buttons/multibutton',
	'phasercomponents/display/buttons/stepperbutton',
	'phasercomponents/display/buttons/vstepperbutton',
	'phasercomponents/display/buttons/radiobuttons',
	'phasercomponents/display/buttons/togglebutton',
	'phasercomponents/preloader',
	'phasercomponents/display/popups/abstractpopup',
	'phasercomponents/display/loaderbar',
	'phasercomponents/utils/utils',
	'phasercomponents/text/textfactory',
	'phasercomponents/drag/abstractaccepter',
	'phasercomponents/drag/abstractdragview',
	'phasercomponents/drag/abstractdropview',
	'phasercomponents/drag/dragmanager',
	'phasercomponents/drag/dragfailtypes',
	'phasercomponents/drag/dragmodel',
	'phasercomponents/drag/hitzone',
	'phasercomponents/drag/hitzonerow'
	], 

	function (Context,
		Injector,
		MovieClip,
		Container,
		InteractiveSprite, 
		AbstractButton, 
		AbstractModel,
		ToggleModel,
		IncrementModel,
		MovieClipModel,
		ButtonGrid,
		ButtonGridModel,
		TabButtonBar,
		ButtonBar,
		EventDispatcher,
		AppEvents,
		Slider, 
		VSlider, 
		Scroller,
		VScroller,
		TabPanel,
		Scene,
		View,
		Storage,
		AbstractStorageAdapter,
		AlertManager,
		SoundManager,
		KeyManager,
		AbstractCommand, 
		Pager,
		MultiButton,
		StepperButton,
		VStepperButton,
		RadioButtons,
		ToggleButton,
		Preloader,
		AbstractPopup,
		LoaderBar,
		Utils,
		TextFactory,
		AbstractAccepter,
		AbstractDragView,
		AbstractDropView,
		DragManager,
		DragFailTypes,
		DragModel,
		HitZone,
		HitZoneRow
	) {

    

    var Display = {
    	'MovieClip': 			MovieClip,
        'Container': 			Container,
        'InteractiveSprite': 	InteractiveSprite,
        'AbstractButton': 		AbstractButton,
        'Preloader': 			Preloader,
        'AbstractPopup':  		AbstractPopup,
        'ButtonGrid': 			ButtonGrid,
        'ButtonBar': 			ButtonBar,
        'Slider': 				Slider,
        'VSlider': 				VSlider,
        'Scroller': 			Scroller,
        'Pager': 				Pager,
        'View': 				View,
        'MultiButton': 			MultiButton,
        'StepperButton': 		StepperButton,
        'VStepperButton': 		VStepperButton,
        'RadioButtons': 		RadioButtons,
        'ToggleButton': 		ToggleButton,
        'LoaderBar': 			LoaderBar,
        'VScroller': 			VScroller,
        'TabButtonBar': 		TabButtonBar,
        'TabPanel': 			TabPanel
    };

    var Model = {
    	'AbstractModel': 		AbstractModel,
    	'IncrementModel': 		IncrementModel,
    	'MovieClipModel': 		MovieClipModel,
    	'ToggleModel': 			ToggleModel,
       	'ButtonGridModel': 		ButtonGridModel
    };

    var Events = {
    	'EventDispatcher': 		EventDispatcher,
       	'AppEvents':			AppEvents
    };

    var Storage = {
    	  'Storage': 					Storage,
    	  'AbstractStorageAdapter': 	AbstractStorageAdapter
    };

    var Drag = {
    	'AbstractAccepter': 		AbstractAccepter,
       	'AbstractDragView':			AbstractDragView,
       	'AbstractDropView': 		AbstractDropView,
       	'DragManager': 				DragManager,
       	'DragModel': 				DragModel,
       	'HitZone': 					HitZone,
       	'HitZoneRow': 				HitZoneRow,
       	'DragFailTypes': 			DragFailTypes
    };

    var Commands = {
    	'AbstractCommand': 		AbstractCommand
    };

    return {
        'Display':				Display,
        'Model':				Model,
        'Events':				Events,
        'Drag':					Drag,
        'TextFactory':          TextFactory,
        'Commands':				Commands,
        'Context': 				Context,
        'Utils': 				Utils,
        'Storage': 				Storage,
        'Scene': 				Scene,
        'AlertManager': 		AlertManager,
        'Injector': 			Injector,
        'KeyManager': 			KeyManager,
        'SoundManager': 		SoundManager
    };
    
});

