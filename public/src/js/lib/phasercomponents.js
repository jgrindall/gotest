
define('phasercomponents/gamemanager', ['jquery', 'phaser', 'phaserstatetrans'],

function($, Phaser, PhaserStateTrans){
	
	
	
	var GameManager = function(){

	};

	GameManager.prototype.init = function(options, config){
		var w, h, size;
		this.options = options;
		size = this.getSize();
		w = size.w;
    	h = size.h;
		this.game = new Phaser.Game(w, h, Phaser.AUTO, this.options.containerTagId, config);
		this.game.w = w;
		this.game.h = h;
		this.game.cx = w/2;
		this.game.cy = h/2;
	};

	GameManager.prototype.mapScene = function(key, scene, first){
		this.game.state.add(key, scene);
		if(first){
			this.firstSceneKey = key;
		}
	};

	GameManager.prototype.start = function(){
		var settings;
		this.transitions = this.game.plugins.add(PhaserStateTrans);
		settings = {'duration': 400,	'properties': {'alpha': 0, 'scale': {'x': 1.1, 'y': 1.1}}};
		this.transitions.settings(settings);
		this.game.state.start(this.firstSceneKey);
	};

	GameManager.prototype.goToScene = function(key){
		this.transitions.to(key);
	};

	GameManager.prototype.getSizeFit = function(){
		var w, h, ratio, size, el;
		el = $("#"+this.options.containerTagId); 
		ratio  = 4/3;
		w = el.width();
		h = el.height();
		if(w/h > ratio){
			size = {"w":ratio*h, "h":h};
		}
		else{
			size = {"w":w, "h":w*(1/ratio)};
		}
		size.w = size.w * window.devicePixelRatio;
		size.h = size.h * window.devicePixelRatio;
		return size;
	};

	GameManager.prototype.getSizeFill = function(){
		var w, h, size, el;
		el = $("#"+this.options.containerTagId); 
		w = el.width();
		h = el.height();
		size = {"w":w, "h":h};
		size.w = size.w * window.devicePixelRatio;
		size.h = size.h * window.devicePixelRatio;
		return size;
	};

	GameManager.prototype.getSize = function(){
		var size;
		if(this.options.scaleType === "fill"){
			size = this.getSizeFill();
		}
		else{
			size = this.getSizeFit();
		}
		size.w = Math.max(size.w, this.options.minWidth);
		size.h = Math.max(size.h, this.options.minHeight);
		return size;
	};

	return GameManager;
	
});


define('phasercomponents/commands/commandmap',

	[],

function() {
	
	
	
	var CommandMap = function(){
		this.hash = {};
	};

	CommandMap.prototype.trigger = function(event, obj){
		var cmd, CommandClassRef;
		if(!obj || !obj.type){
			throw "Undefined command";
		}
		CommandClassRef = this.get(obj.type);
		if(CommandClassRef && (typeof CommandClassRef === "function")){
			cmd = new CommandClassRef();
			cmd.eventDispatcher = this.eventDispatcher;
			cmd.game = this.game;
			cmd.start(obj.data);
		}
	};

	CommandMap.prototype.map = function(eventName, CommandClassRef){
		var handler;
		if(!eventName || !CommandClassRef || this.hash[eventName]){
			throw "Error with map";
		}
		handler = this.trigger.bind(this);
		this.eventDispatcher.addListener(eventName, handler);
		this.hash[eventName] = CommandClassRef;
		new CommandClassRef();
	};
	
	CommandMap.prototype.get = function(eventName){
		return this.hash[eventName];
	};
	
  	return CommandMap;
});





define('phasercomponents/events/eventdispatcher',['jquery'],

function($) {
	
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
		if(!name || !method){
			throw "No eventName/method";
		}
		this.el.off(name, method);
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





define('phasercomponents/events/appevents',[],

function() {

	
	
	var AppEvents = function(){
		
	};

	AppEvents.ALERT_SHOWN =			"app:alertShown";
	AppEvents.CHANGE_SCENE =		"app:changeScene";
	AppEvents.PLAY_SOUND =			"app:playSound";

  	return AppEvents;
});






define('phasercomponents/utils/soundmanager',[], function(){
	
	
	
	var SoundManager = function(){
		this.sounds = {};
	};
	
	SoundManager.prototype.add = function(key, sound){
		this.sounds[key] = sound;
	};

	SoundManager.getInstance = function(){
		if(!SoundManager.instance){
			SoundManager.instance = new SoundManager();
		}
		return SoundManager.instance;
	};
	
	SoundManager.prototype.play = function(key){
		var sound = this.sounds[key];
		if(sound){
			sound.play();
		}
	};
	
	return SoundManager;
	
});


define('phasercomponents/commands/abstractcommand',

	[], function(){
	
	
	
	var AbstractCommand = function(){
		
	};
	
	AbstractCommand.prototype.start = function(data){
		this.execute(data);
	};

	AbstractCommand.prototype.cleanUp = function(){
		this.eventDispatcher = null;
		this.game = null;
	};
	
	return AbstractCommand;

});





define('phasercomponents/commands/playsoundcommand',[

	'phasercomponents/utils/soundmanager', 'phasercomponents/commands/abstractcommand'],

function(SoundManager, AbstractCommand) {
	
	
	
	var PlaySoundCommand = function(){
		AbstractCommand.call(this);
	};
	
	PlaySoundCommand.prototype = Object.create(AbstractCommand.prototype);
	PlaySoundCommand.prototype.constructor = PlaySoundCommand;

	PlaySoundCommand.prototype.execute = function(data){
		SoundManager.getInstance().play(data);
	};
	
  	return PlaySoundCommand;
});



define('phasercomponents/context',['phasercomponents/gamemanager',

	'phasercomponents/commands/commandmap', 'phasercomponents/events/eventdispatcher',

	'phasercomponents/events/appevents', 

	'phasercomponents/commands/playsoundcommand'],

	function(GameManager, CommandMap, EventDispatcher,

		AppEvents, PlaySoundCommand) {
	
	

   	var Context = function (options){
   		this.options = options;
		this.gameManager = new GameManager();
		this.commandMap = new CommandMap();
		this.mapFonts();
		Context.eventDispatcher = new EventDispatcher();
		Context.eventDispatcher.addListener(AppEvents.CHANGE_SCENE, this.onChangeScene.bind(this));
		this.makeGame();
    };
	
    Context.prototype.onChangeScene = function(){
    	
    };

    Context.prototype.mapFonts = function(){
    	
    };

    Context.prototype.makeGame = function(){
    	var config = {
    		"preload":this.preload.bind(this),
    		"create":this.create.bind(this),
    	};
    	this.gameManager.init(this.options, config);
    };

    Context.prototype.mapScenes = function(){
    	
    };

    Context.prototype.addSounds = function(){
    	
    };

    Context.prototype.mapCommands = function(){
    	this.commandMap.map(AppEvents.PLAY_SOUND, PlaySoundCommand);
    };

	Context.prototype.create = function(){
		Context.game = this.gameManager.game;
		this.game = this.gameManager.game;
		this.commandMap.eventDispatcher = Context.eventDispatcher;
		this.commandMap.game = Context.game;
		this.mapCommands();
    	this.mapScenes();
    	this.addSounds();
		this.gameManager.start();
	};
	
	Context.prototype.preload = function(){
		
	};
	
	return Context;
	
});



define('phasercomponents/display/view',

	['phasercomponents/context'], function(Context){
	
	
	
	var View = function(options){
		this.options = options;
		this.bounds = options.bounds || {'x':0, 'y':0, 'w':100, 'h':100};
		this.model = options.model;
		this.game = Context.game;
		this.eventDispatcher = Context.eventDispatcher;
		this.create();
	};

	View.prototype.create = function(){
		
	};

	View.prototype.destroy = function(){
		this.game = null;
		this.options = null;
		this.bounds = null;
		this.model = null;
		this.game = null;
		this.eventDispatcher = null;
	};

	Object.defineProperty(View.prototype, "view", {
		get : function(){
			return (this.sprite || this.group);
		}
	});

	return View;

});





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
	
	Utils.checkImplements = function(obj, theInterface) {
	    for (var member in theInterface) {
	        if (typeof obj[member] !== typeof theInterface[member]) {
	            throw("Object "+obj+" failed to implement interface member " + member);
	        }
	    }
	};

	return Utils;
	
});




define('phasercomponents/display/interactivesprite',

	['phaser', 'phasercomponents/display/view', 'phasercomponents/utils/utils'],

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
		this.sprite = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.asset, this.options.defaultFrame || 0);
	};

	InteractiveSprite.prototype.removeListeners = function(){
		this.sprite.events.onInputUp.remove(this.onMouseUp, this);
		this.sprite.events.onInputDown.remove(this.onMouseDown, this);
	};
	
	InteractiveSprite.prototype.enableInput = function(){
		if(!this.sprite.inputEnabled){
			this.sprite.inputEnabled = true;
			this.game.input.useHandCursor = true;
			this.addListeners();
		}
	};
	
	InteractiveSprite.prototype.disableInput = function(){
		if(this.sprite.inputEnabled){
			this.removeListeners();
			this.sprite.inputEnabled = false;
		}
	};

	InteractiveSprite.prototype.hitData = function(){
		var hits, pointer, localPoint;
		if(!this.sprite.inputEnabled){
			return {'hits':false};
		}
		pointer = this.game.input.activePointer;
		localPoint = this.game.input.getLocalPosition(this.sprite, pointer);
		hits = this.game.input.hitTest(this.sprite, pointer, localPoint);
		return  {'hits':hits, 'localPoint':localPoint};
	};
	
	InteractiveSprite.prototype.onMouseUp = function(){
		var hitData = this.hitData();
		if(hitData.hits){
			this.mouseUpSignal.dispatch({"localPoint":hitData.localPoint});
		}
	};
	
	InteractiveSprite.prototype.onMouseDown = function(){
		var hitData = this.hitData();
		if(hitData.hits){
			this.mouseDownSignal.dispatch({"localPoint":hitData.localPoint});
		}
	};
	
	InteractiveSprite.prototype.destroy = function(children){
		this.disableInput();
		this.mouseDownSignal.dispose();
		this.mouseUpSignal.dispose();
		this.mouseDownSignal = null;
		this.mouseUpSignal = null;
		View.prototype.destroy.call(this, children);
	};

	return InteractiveSprite;

});



define('phasercomponents/display/movieclip',

	['phasercomponents/display/interactivesprite', 'phasercomponents/utils/utils'],

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
		this.goTo(this.options.defaultFrame);
	};
	
	MovieClip.prototype.destroy = function(){
		this.sprite.animations.destroy();
		InteractiveSprite.prototype.destroy.call(this);
	};

	return MovieClip;

});


define('phasercomponents/display/container',

	['phaser', 'phasercomponents/display/view', 'phasercomponents/utils/utils'],

function(Phaser, View, Utils){
	
	
	
	var Container = function(options){
		View.call(this, options);
	};

	Utils.extends(Container, View);

	Container.prototype.create = function(){
		this.group = new Phaser.Group(this.game);
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





define('phasercomponents/display/buttons/abstractbutton',
	
['phaser', 'phasercomponents/display/view', 'phasercomponents/utils/utils',

'phasercomponents/events/appevents'],

function(Phaser, View, Utils,

	AppEvents){
	
	
	
	var AbstractButton = function(options){
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
		this.goToFrame(this.frames[1]);
	};

	AbstractButton.prototype.deselect = function(){
		this.goToFrame(this.frames[0]);
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
			this.addListeners();
		}
	};
	
	AbstractButton.prototype.stopTweens = function(){
		if(this.fadeTween){
			this.fadeTween.stop();
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

	AbstractButton.prototype.disableInput = function(){
		if(this.sprite.inputEnabled){
			this.sprite.inputEnabled = false;
			this.tweenAlpha(0.5, false);
			this.removeListeners();
		}
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



define('phasercomponents/models/abstractmodel',['phaser', 'phasercomponents/context'],

function(Phaser, Context){
	
	
	
	var AbstractModel  = function(){
		this.changeSignal = new Phaser.Signal();
		this.eventDispatcher = Context.eventDispatcher;
		this.value = null;
	};
	
	AbstractModel.prototype.trigger = function() {
		this.changeSignal.dispatch(this.value);
	};
	
	AbstractModel.prototype.set = function(val, options) {
		var currentVal, force = false;
		currentVal = this.value;
		if(options && options.force){
			force = true;
		}
		if(force || currentVal === null || currentVal === undefined || currentVal !== val){
			this.value = val;
			this.trigger();
		}
	};

	AbstractModel.prototype.get = function() {
		return this.value;
	};
	
	AbstractModel.prototype.destroy = function() {
		this.changeSignal.dispose();
		this.value = null;
		this.changeSignal = null;
		this.eventDispatcher = null;
	};
	
	return AbstractModel;

});
	


define('phasercomponents/display/buttongrid/buttongridmodel',

	['phasercomponents/models/abstractmodel', 'phasercomponents/utils/utils'],

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
		this.buttonGroup = new Phaser.Group(this.game, 0, 0);
		for(i = 1; i <= this.options.numY; i++){
			for(j = 1; j <= this.options.numX; j++){
				pos = {"x":this.bounds.x + this.spaceX * (j - 1), "y":this.bounds.y + this.spaceY * (i - 1)};
				pos.x += this.marginX;
				pos.y += this.marginY;
				options = {"bounds":pos, "index":n, "data":this.options.data[n], "frames":[0, 1, 2, 3]};
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
		this.changeSignal = null;
		this.buttons = [];
		this.model = null;
		this.signal = null;
	};
	
	return ButtonGrid;

});





define('phasercomponents/display/buttongrid/buttonbar',

	['phasercomponents/display/buttongrid/buttongrid', 'phasercomponents/utils/utils'],

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
		this.scale();
	};
	
	ButtonBar.prototype.scale = function(){
		var that = this;
		this.buttons.forEach(function(button, i){
			button.sprite.anchor.setTo(0.5, 0.5);
			button.sprite.x += button.sprite.width/2;
			button.sprite.y += button.sprite.height/2;
			button.sprite.scale = {'x':0.5, 'y':0.5};
			that.game.add.tween(button.sprite.scale).to( {'x':1, 'y':1}, 100, Phaser.Easing.Back.InOut, true, 50*i, false);
		});	
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





define('phasercomponents/display/buttongrid/tabbuttonbar',

	['phasercomponents/display/buttongrid/buttonbar', 'phasercomponents/utils/utils'],

function(ButtonBar, Utils){
	
	
	
	var TabButtonBar = function(game, options){
		ButtonBar.call(this, game, options);
	};
	
	Utils.extends(TabButtonBar, ButtonBar);
	
	TabButtonBar.prototype.create = function(){
		ButtonBar.prototype.create.call(this);
		this.setSelected(0);
	};
	
	return TabButtonBar;
	
});



define('phasercomponents/display/slider/slider',['phaser', 'phasercomponents/display/container',

'phasercomponents/display/interactivesprite', 'phasercomponents/utils/utils', 'phasercomponents/events/appevents'],

function(Phaser, Container,

InteractiveSprite, Utils, AppEvents){
	
	
	
	var Slider = function(options){
		var index;
		this.stepDist = (Slider.WIDTH - Slider.HANDLEWIDTH) / options.num;
		options.model.changeSignal.add(this.onChanged, this);
		Container.call(this, options);
		index = this.model.get();
		if(index !== null){
			this.goTo(index);
		}
	};
	
	Slider.WIDTH = 			210;
	Slider.HEIGHT = 		40;
	Slider.HANDLEWIDTH = 	40;
	Slider.HANDLEHEIGHT = 	40;
	Slider.TOLERANCE = 		25;

	Utils.extends(Slider, Container);
	
	Slider.prototype.onChanged = function(value){
		this.goTo(value);
	};
	
	Slider.prototype.goTo = function(n) {
		this.posHandle(this.bounds.x + Slider.HANDLEWIDTH/2 + (n * this.stepDist));
	};
	
	Slider.prototype.toMin = function() {
		this.model.set(0);
	};

	Slider.prototype.toMax = function() {
		this.model.set(this.options.num);
	};

	Slider.prototype.posHandle = function(x) {
		var p = (x - this.bounds.x)/this.bounds.w;
		this.handle.sprite.x = x;
		this.setMask(p);
	};

	Slider.prototype.disableInput = function() {
		this.handle.disableInput();
		this.removeListeners();
	};
	
	Slider.prototype.enableInput = function() {
		this.handle.enableInput();
		this.addListeners();
	};	
	
	Slider.prototype.onUp = function() {
		this.dragging = false;
		this.removeMoveListeners();
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.snap();
	};
	
	Slider.prototype.snap = function() {
		var num;
		num = (this.handle.sprite.x - Slider.HANDLEWIDTH/2 - this.bounds.x) / this.stepDist;
		num = Math.round(num);
		this.model.set(num);
	};

	Slider.prototype.isOutside = function(x, y) {
		if(x < this.bounds.x  - Slider.TOLERANCE || x > this.bounds.x + Slider.WIDTH + Slider.TOLERANCE){
			return true;
		}
		else if(y < this.bounds.y - Slider.TOLERANCE || y > this.bounds.y + Slider.HEIGHT + Slider.TOLERANCE){
			return true;
		}
		return false;
	};
	
	Slider.prototype.move = function(pointer, x, y) {
		var xpos, xmin, xmax;
		if(this.isOutside(x, y)){
			this.onUp();
		}
		else{
			xmin = this.bounds.x + Slider.HANDLEWIDTH/2;
			xmax = this.bounds.x + Slider.WIDTH - Slider.HANDLEWIDTH/2;
			xpos = Math.min(Math.max(x, xmin), xmax);
			this.posHandle(xpos);
		}
	};
	
	Slider.prototype.startDragging = function() {
		this.dragging = true;
		this.addMoveListeners();
	};
	
	Slider.prototype.addMoveListeners = function(){
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.moveCallback = this.move.bind(this);
		this.game.input.mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
	};

	Slider.prototype.removeMoveListeners = function(){
		this.game.input.onUp.remove(this.onUp, this);
		this.game.input.moveCallback = null;
		this.game.input.mouse.mouseOutCallback = null;
	};

	Slider.prototype.addListeners = function(){
		this.handle.mouseDownSignal.add(this.startDragging, this);
	};
	
	Slider.prototype.removeListeners = function(){
		this.handle.mouseDownSignal.remove(this.startDragging, this);
		this.removeMoveListeners();
	};
	
	Slider.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Slider.prototype.addHandle = function(){
		var x, y, options;
		x = this.bounds.x + Slider.HANDLEHEIGHT/2;
		y = this.bounds.y + Slider.HANDLEHEIGHT/2;
		options = {"asset":this.options.handle, "bounds":{'x':x, 'y':y}};
		this.handle = new InteractiveSprite(options);
		this.handle.sprite.anchor.setTo(0.5, 0.5);
		this.group.add(this.handle.sprite);
	};
	
	Slider.prototype.addBg = function(){
		this.bg = new Phaser.Sprite(this.game,  this.bounds.x, this.bounds.y, this.options.sliderbg);
		this.group.add(this.bg);
	};

	Slider.prototype.addHighlight = function(){
		this.hl = new Phaser.Sprite(this.game,  this.bounds.x, this.bounds.y, this.options.sliderhl);
		this.group.add(this.hl);
	};
	
	Slider.prototype.setMask = function(p){
		this.mask.scale.x = p;
	};

	Slider.prototype.addMask = function(){
		this.mask = new Phaser.Graphics(this.game, this.bounds.x, this.bounds.y);
   		this.mask.beginFill(0xff0000);
   		this.mask.drawRect(0, 0, this.bounds.w, this.bounds.h);
   		this.mask.endFill();
   		this.group.add(this.mask);
   		this.hl.mask = this.mask;
	};

	Slider.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addHighlight();
		this.addHandle();
		this.addMask();
		this.enableInput();
	};
	
	Slider.prototype.destroy = function(){
		this.removeListeners();
		this.bg.destroy(true);
		this.model.changeSignal.remove(this.onChanged, this);
		this.handle.destroy();
		this.handle = null;
		this.bg = null;
	};
	
	return Slider;

});


	

define('phasercomponents/display/scroller/scroller',

	['phaser', 'phasercomponents/display/container', 'phasercomponents/utils/utils'],

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
		this.contentGroup = new Phaser.Group(this.game);
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
		this.game.add.tween(this.contentGroup).to({'x': x}, 250, Phaser.Easing.Quadratic.Out, true, 20, false);
	};
	
	Scroller.prototype.select = function(data){
		var page = this.contentGroup.getIndex(data.grid.group);
		if(Math.abs(this.dx) < Scroller.MIN_MOVE){
			this.selectSignal.dispatch({"index":data.index, "page":page});
			data.grid.showSelected(data.index);
		}
	};
	
	Scroller.prototype.addChildren = function(){
		this.options.dataProvider.addAll(this);
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
		this.removeListeners();
		this.pageSignal.dispose();
		this.selectSignal.dispose();
		this.pageSignal = null;
		this.selectSignal = null;
		Container.prototype.destroy.call(this);
	};
	
	return Scroller;

});





define('phasercomponents/scene',

	['phasercomponents/context'],

	function(Context){
	
	
	
	var Scene  = function(){
		this.game = Context.game;
		this.world = Context.game.world;
		this.eventDispatcher = Context.eventDispatcher;
	};

	Scene.prototype.shutdown = function() {
		this.game = null;
		this.world = null;
		this.eventDispatcher = null;
	};

	return Scene;

});
	
	





define('phasercomponents/utils/alertmanager',

	['jquery', 'phaser', 'phasercomponents/context', 'phasercomponents/events/appevents'], 

function($, Phaser, Context, AppEvents){

	
	
	var AlertManager  = function(){
		this.game = Context.game;
		this.eventDispatcher = Context.eventDispatcher;
	};
	
	AlertManager.prototype.close = function(){
		var that = this;
		if(this.alert){
			this.alert.selectSignal.remove(this.callbackProxy);
			this.alert.hideMe();
			setTimeout(function(){
				that.alert.destroy();
				that.bg.destroy();
				that.bg = null;
				that.alert = null;
				that.eventDispatcher.trigger({"type":AppEvents.ALERT_SHOWN, "shown":false});
			}, 300);
		}
	};
	
	AlertManager.prototype.alertClick = function(){
		this.closeAlert();
	};
	
	AlertManager.prototype.addBg = function(){
		this.bg = new Phaser.Graphics(this.game, 0, 0);
		this.bg.beginFill(0x000000);
		this.bg.alpha = 0;
    	this.bg.drawRect(0, 0, this.game.w, this.game.h);
    	this.bg.endFill();
		this.game.world.add(this.bg);
		this.game.add.tween(this.bg).to( {'alpha':0.6}, 300, Phaser.Easing.Linear.None, true, 50, false);
	};
	
	AlertManager.prototype.make = function(ClassRef, options, callback){
		var x, y, bounds, newOptions;
		this.close();
		this.callbackProxy = this.buttonClick.bind(this, callback);
		x = (this.game.w - ClassRef.WIDTH)/2;
		y = (this.game.h - ClassRef.HEIGHT)/2;
		this.addBg();
		bounds = {"x":x, "y":y, "w":ClassRef.WIDTH, "h":ClassRef.HEIGHT};
		newOptions = $.extend({}, options, {"bounds":bounds});
		this.alert = new ClassRef(newOptions);
		this.alert.selectSignal.add(this.callbackProxy);
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
	
	AlertManager.getInstance = function(){
		if(!AlertManager.instance){
			AlertManager.instance = new AlertManager();
		}
		return AlertManager.instance;
	};
	
	return AlertManager;

});

	



define('phasercomponents/utils/storage',['phasercomponents/utils/alertmanager'],

function(AlertManager){
	
	

	var Storage = function(){
		
	};
	
	Storage.VERSION = "v1.0";
	
	Storage.SETTINGS_KEY = "2go_settings" + Storage.VERSION;
	
	Storage.prototype.load = function(callback){
		this.getForKey(Storage.SETTINGS_KEY, function(options){
			var json;
			if(options.success){
				json = options.data || Storage.DEFAULT;
				if(callback){
					callback({"success":true, "json":json});
				}
			}
			else{
				AlertManager.makeGrowl({"label":"Error loading"}, null);
			}
		});
	};
	
	Storage.prototype.save = function(json, callback){
		this.saveForKey(Storage.SETTINGS_KEY, json, function(options){
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
	
	Storage.prototype.getForKey = function(key, callback){
		var data;
		data = this.cache[key];
		if(!data){
			data = this.persistence.getItem(key);
			if(data){
				data = JSON.parse(data);
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



define('phasercomponents/utils/printmanager',[],

function(){
	
	
	
	var PrintManager = function(){
		
	};
	
	PrintManager.prototype.print = function(){
		
	};
	
	PrintManager.getInstance = function(){
		if(!PrintManager.instance){
			PrintManager.instance = new PrintManager();
			PrintManager.instance.init();
		}
		return PrintManager.instance;
	};
	
	return PrintManager;
	
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





define('phasercomponents/display/scroller/pager',

	['phasercomponents/display/scroller/groupmarker',

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
		bounds = {'x':this.bounds.x + this.bounds.w/2 - (numPages/2)*buttonClass.WIDTH, 'y':this.bounds.y + this.bounds.h - 83};
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





define('phasercomponents/display/buttons/multibutton',

	['phasercomponents/display/movieclip', 'phasercomponents/utils/utils', 'phasercomponents/events/appevents'],

function(MovieClip, Utils, AppEvents){
	
	
	
	var MultiButton = function(options){
		MovieClip.call(this, options);
		this.model.changeSignal.add(this.onChanged, this);
		this.init();
	};

	Utils.extends(MultiButton, MovieClip);

	MultiButton.prototype.init = function(){
		if(this.model){
			var index = this.model.get();
			if(index !== null){
				this.setFrame(index);
			}
		}
	};

	MultiButton.prototype.onChanged = function(value){
		this.goTo(value);
	};

	MultiButton.prototype.create = function(){
		MovieClip.prototype.create.call(this);
		this.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	MultiButton.prototype.setFrame = function(frame){
		this.model.set(frame);
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




define('phasercomponents/display/buttons/stepperbutton',[ 
	
'phasercomponents/display/movieclip', 'phasercomponents/utils/utils',

'phasercomponents/events/appevents'],

function(MovieClip, Utils, AppEvents){
	
	
	
	var StepperButton = function(options){
		MovieClip.call(this, options);
		this.mouseUpSignal.add(this.onStep, this);
		this.model.changeSignal.add(this.onChanged, this);
		this.enableInput();
		this.init();
	};

	Utils.extends(StepperButton, MovieClip);

	StepperButton.prototype.init = function(){
		var index = this.model.get();
		if(index !== null){
			this.goTo(index);
		}
	};

	StepperButton.prototype.onChanged = function(value){
		this.goTo(value);
	};
	
	StepperButton.prototype.create = function(){
		MovieClip.prototype.create.call(this);
	};

	StepperButton.prototype.onStep = function(){
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.model.increment();
	};
	
	StepperButton.prototype.destroy = function(){
		this.model.changeSignal.remove(this.onChanged, this);
		this.mouseUpSignal.remove(this.onStep, this);
		this.model = null;
		this.sprite.destroy(true);
		this.options = null;
	};

	return StepperButton;

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
		var fontData, font, text, fill;
		fontData = TextFactory.fonts[key];
		font = {"font": fontData.size+"px "+ fontData.fontName, "align": fontData.align};
		text = new Phaser.Text(game, x, y, label, font);
	    fill = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
		fill.addColorStop(0, fontData.color0);   
		fill.addColorStop(1, fontData.color1);
		text.fill = fill;
		return text;
	};
	
	return TextFactory;

});
	
	



define('phasercomponents/display/buttons/radiobuttons',

	['phasercomponents/display/container', 'phasercomponents/utils/utils',

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
	



define('phasercomponents/display/buttons/togglebutton',

	['phasercomponents/display/buttons/stepperbutton', 'phasercomponents/utils/utils'],

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
		this.panel = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.bgasset);
		this.group.add(this.panel);
	};
	
	AbstractPopup.prototype.showMe = function () {
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.game.add.tween(this.group).to( {y: 0}, 400, Phaser.Easing.Back.Out, true, 200, false);
	};

	AbstractPopup.prototype.hideMe = function () {
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
		this.game.add.tween(this.group).to( {y: this.game.h + 50}, 400, Phaser.Easing.Back.Out, true, 200, false);
	};

	AbstractPopup.prototype.getData = function() {
		return {};
	};
	
	AbstractPopup.prototype.buttonUp = function(data) {
		var index, selectionData;
		index = this.buttonGroup.getIndex(data.target.sprite);
		selectionData = this.getData();
		this.selectSignal.dispatch({"index":index, "selection":selectionData});
	};
	
	AbstractPopup.prototype.addButton = function (ClassRef, bounds) {
		var b = new ClassRef({'bounds':bounds});
		b.mouseUpSignal.add(this.buttonUp, this);
		this.buttonGroup.add(b.sprite);
		this.buttons.push(b);
		this.group.bringToTop(this.buttonGroup);
	};
	
	AbstractPopup.prototype.addButtonGroup = function () {
		this.buttonGroup = new Phaser.Group(this.game, 0, 0);
		this.group.add(this.buttonGroup);
	};
	
	AbstractPopup.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addPanel();
		this.addButtonGroup();
	};
	
	return AbstractPopup;
	
});
	





define('phasercomponents/display/loaderbar',

	['phasercomponents/display/movieclip', 'phasercomponents/utils/utils'], 

	function(MovieClip, Utils){
	
	
	
	var LoaderBar = function(options){
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


define('phasercomponents/drag/abstractaccepter', [], function(){
	
	

	var AbstractAccepter = function(data){
		this.data = data;
	};

	AbstractAccepter.prototype.willAccept = function(){
		return false;
	};

	return AbstractAccepter;
});


define('phasercomponents/drag/abstractdragview', [], function(){
	
	

	var AbstractDragView = function(game, options){
		options.bounds = options.bounds || {'x':0,'y':0};
		this.options = options;
		this.game = game;
		this.mouseDownSignal = new Phaser.Signal();
		this.create();
		this.options.origPos = {'x':options.bounds.x, 'y':options.bounds.y};
	};

	AbstractDragView.prototype.onMouseDown = function(){
		this.mouseDownSignal.dispatch({"target":this});
	};

	AbstractDragView.prototype.moveTo = function(x, y){
		this.sprite.x = x;
		this.sprite.y = y;
	};

	AbstractDragView.prototype.snap = function(target, bounds){
		this.moveTo(target.sprite.x + bounds.x, target.sprite.y + bounds.y);
	};

	AbstractDragView.prototype.reset = function(){
		this.sprite.x = this.options.origPos.x;
		this.sprite.x = this.options.origPos.y;
	};

	AbstractDragView.prototype.destroy = function(){
		this.sprite.events.onInputDown.remove(this.onMouseDown, this);
		this.sprite.inputEnabled = false;
		this.sprite.destroy();
		this.sprite = null;
		this.options = null;
	};

	AbstractDragView.prototype.reset = function(){
		this.sprite.x = this.options.origPos.x;
		this.sprite.x = this.options.origPos.y;
	};

	AbstractDragView.prototype.create = function(){
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(this.onMouseDown, this);
	};

	return AbstractDragView;

});


define('phasercomponents/drag/abstractdropview', [], function(){

	

	var AbstractDropView = function(game, options){
		this.game = game;
		this.options = options;
		this.create();
	};

	AbstractDropView.prototype.create = function(){
		
	};

	return AbstractDropView;
});


define('phasercomponents/drag/dragfailtypes', [], function(){
	
	

	var DragFailTypes = function(){
	
	};

	DragFailTypes.FAIL_RETURN = 0;
	DragFailTypes.FAIL_REMOVE = 1;

	return DragFailTypes;
});


define('phasercomponents/drag/dragmanager', ['phasercomponents/drag/dragfailtypes'], function(DragFailTypes){
	
	

	var DragManager = function(game, options){
		this.game = game;
		this.options = options;
		this.model = options.model;
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
		var i, x, y, index = -1, target, dist, w, h;
		x = this.draggedView.sprite.x;
		y = this.draggedView.sprite.y;
		w = this.draggedView.sprite.width;
		h = this.draggedView.sprite.height;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			dist = Math.abs(x + w/2 - target.sprite.x - target.sprite.width/2) + Math.abs(y +h/2 - target.sprite.y- target.sprite.height/2);
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
		view.snap(this.targets[rowIndex], hitzone.bounds);
	};

	DragManager.prototype.drop = function(){
		if(this.dropPosition.rowIndex >= 0){
			this.snapTo(this.draggedView, this.dropPosition.rowIndex, this.dropPosition.zoneIndex);
			this.targets[this.dropPosition.rowIndex].highlight(false);
		}
		else{
			this.fail();
		}
	};

	DragManager.prototype.removeView = function(view){
		var index;
		if(view){
			index = this.views.indexOf(view);
			this.views.splice(index, 1);
			view.mouseDownSignal.remove(this.downHandler, this);
			view.destroy();
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

	DragManager.prototype.onMove = function(pointer, x, y){
		this.draggedView.moveTo(x - this.draggedView.sprite.width/2, y - this.draggedView.sprite.height/2);
		this.checkTargets();
	};

	DragManager.prototype.destroyViews = function(){
		this.removeMoveListeners();
		while(this.views.length > 0){
			this.removeView(this.views[0]);
		}
	};

	DragManager.prototype.destroy = function(){
		this.destroyViews();
		this.model = null;
		this.views = null;
		this.targets = null;
	};

	return DragManager;
});


define('phasercomponents/drag/dragmodel', [], function(){
	
	

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
		var hitzone = this.rows[rowIndex].add(view, zoneIndex);
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


define('phasercomponents/drag/hitzone', [], function(){
	
	

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


define('phasercomponents/drag/hitzonerow', [], function(){
	
	

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
		hitzone.add(view);
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
	'phasercomponents/display/movieclip',
	'phasercomponents/display/container',
	'phasercomponents/display/interactivesprite',
	'phasercomponents/display/buttons/abstractbutton',
	'phasercomponents/models/abstractmodel',
	'phasercomponents/display/buttongrid/buttongrid',
	'phasercomponents/display/buttongrid/buttongridmodel',
	'phasercomponents/display/buttongrid/tabbuttonbar',
	'phasercomponents/display/buttongrid/buttonbar',
	'phasercomponents/events/eventdispatcher',
	'phasercomponents/events/appevents',
	'phasercomponents/display/slider/slider',
	'phasercomponents/display/scroller/scroller',
	'phasercomponents/scene',
	'phasercomponents/display/view',
	'phasercomponents/utils/storage',
	'phasercomponents/utils/alertmanager',
	'phasercomponents/utils/printmanager',
	'phasercomponents/utils/soundmanager',
	'phasercomponents/commands/abstractcommand',
	'phasercomponents/display/scroller/pager',
	'phasercomponents/display/buttons/multibutton',
	'phasercomponents/display/buttons/stepperbutton',
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
		MovieClip,
		Container,
		InteractiveSprite, 
		AbstractButton, 
		AbstractModel,
		ButtonGrid,
		ButtonGridModel,
		TabButtonBar,
		ButtonBar,
		EventDispatcher,
		AppEvents,
		Slider, 
		Scroller,
		Scene,
		View,
		Storage,
		AlertManager,
		PrintManager,
		SoundManager,
		AbstractCommand, 
		Pager,
		MultiButton,
		StepperButton,
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
    	'TabButtonBar': 		TabButtonBar,
        'ButtonBar': 			ButtonBar,
        'Slider': 				Slider,
        'Scroller': 			Scroller,
        'Pager': 				Pager,
        'View': 				View,
        'MultiButton': 			MultiButton,
        'StepperButton': 		StepperButton,
        'RadioButtons': 		RadioButtons,
        'ToggleButton': 		ToggleButton,
        'LoaderBar': 			LoaderBar,
    };

    var Model = {
    	'AbstractModel': 		AbstractModel,
       	'ButtonGridModel': 		ButtonGridModel
    };

    var Events = {
    	'EventDispatcher': 		EventDispatcher,
       	'AppEvents':			AppEvents
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
        'Scene': 				Scene,
        'Storage': 				Storage,
        'AlertManager': 		AlertManager,
        'PrintManager': 		PrintManager,
        'SoundManager': 		SoundManager
    };
    
});

