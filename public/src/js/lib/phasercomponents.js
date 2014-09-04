
define('phasercomponents/gamemanager', ['phaser', 'phaserstatetrans'],

function(Phaser, PhaserStateTrans){
	
	
	
	var GameManager = function(){

	};

	GameManager.prototype.init = function(el, config){
		var w, h;
		w = this.getWidth();
    	h = this.getHeight();
		this.game = new Phaser.Game(w, h, Phaser.AUTO, el, config);
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
		settings = {'duration': 300,	'properties': {'alpha': 0, 'scale': {'x': 1.05, 'y': 1.05}}};
		this.transitions.settings(settings);
		this.game.state.start(this.firstSceneKey);
	};

	GameManager.prototype.goToScene = function(key){
		this.transitions.to(key);
	};

	GameManager.prototype.getWidth = function(){
		return 1024 * window.devicePixelRatio;
	};
	
	GameManager.prototype.getHeight = function(){
		return 570 * window.devicePixelRatio;
	};
	
	return GameManager;
	
});


define('phasercomponents/commandmap',[],

function() {
	
	
	
	var CommandMap = function(){
		this.hash = {};	
	};
	
	CommandMap.prototype.setEventDispatcher = function(eventDispatcher){
		this.eventDispatcher = eventDispatcher;
	};

	CommandMap.prototype.trigger = function(event, obj){
		if(!obj || !obj.type){
			throw "Undefined command";
		}
		var CommandClassRef = this.get(obj.type);
		if(CommandClassRef){
			(new CommandClassRef()).start(obj.data);
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
			console.log("TRIGGER "+eventObj.type+"  "+eventObj.data);
			for(var i in eventObj.data){
				console.log("eventObj "+i+"   "+eventObj.data[i]);
			}
			this.el.trigger(eventObj.type, eventObj);
		}
	};

  	return EventDispatcher;
});






define('phasercomponents/context',['phasercomponents/gamemanager',

	'phasercomponents/commandmap', 'phasercomponents/events/eventdispatcher'],

	function(GameManager, CommandMap, EventDispatcher) {
	
	

   	var Context = function ( ){
		this.commandMap = new CommandMap();
		this.gameManager = new GameManager();
		Context.eventDispatcher = new EventDispatcher();
		Context.eventDispatcher.addListener("scene", this.onChangeScene.bind(this));
		this.commandMap.setEventDispatcher(Context.eventDispatcher);
		this.mapCommands();
		this.makeGame();
    };
	
    Context.prototype.onChangeScene = function(){
    	
    };

    Context.prototype.makeGame = function(){
    	var config = {
    		"preload":this.preload.bind(this),
    		"create":this.create.bind(this)
    	};
    	this.gameManager.init(this.el, config);
    };

    Context.prototype.mapScenes = function(){
    	
    };

    Context.prototype.mapCommands = function(){
    	
    };

	Context.prototype.create = function(){
		Context.game = this.gameManager.game;
    	this.mapScenes();
		this.gameManager.start();
	};
	
	Context.prototype.preload = function(){
		
	};
	
	return Context;
	
});



define('phasercomponents/display/movieclip', ['phaser'], function(Phaser){
	
	
	
	var MovieClip = function(game, options){
		this.options = options;
		this.game = game;
		this.create();
	};
	
	MovieClip.prototype.goTo = function(i){
		this.sprite.animations.play('frame'+i);
	};

	MovieClip.prototype.create = function(){
		var i;
		this.sprite = new Phaser.Sprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 0, true);
		}
		this.goTo(this.options.defaultFrame);
	};
	
	MovieClip.prototype.destroy = function(){
		this.options = null;
		this.sprite.animations.destroy();
		this.sprite.destroy(true);
		this.game = null;
	};

	return MovieClip;

});



define('phasercomponents/display/view', ['phasercomponents/context'], function(Context){
	
	
	
	var View = function(){
		this.game = Context.game;
	};

	return View;

});



define('phasercomponents/display/container',['phaser', 'phasercomponents/display/view'],

function(Phaser, View){
	
	
	
	var Container = function(options){
		View.call(this);
		this.options = options || {};
		this.bounds = this.options.bounds;
		this.create();
	};

	Container.prototype = Object.create(View.prototype);
	Container.prototype.constructor = Container;

	Container.prototype.create = function(){
		this.group = new Phaser.Group(this.game);
	};
	
	Container.prototype.setVisible = function(vis){
		this.group.visible = vis;
	};

	Container.prototype.destroy = function() {
		this.group.removeAll(true);
	};
	
	return Container;

});





define('phasercomponents/display/interactivesprite',['phaser'], function(Phaser){
	
	
	
	var InteractiveSprite = function(game, x, y, asset, frame){
		Phaser.Sprite.call(this, game, x, y, asset, frame || 0);
		this.mouseUpSignal = new Phaser.Signal();
		this.mouseDownSignal = new Phaser.Signal();
	};
	
	InteractiveSprite.prototype = Object.create(Phaser.Sprite.prototype);
	InteractiveSprite.prototype.constructor = InteractiveSprite;
	
	InteractiveSprite.prototype.addListeners = function(){
		this.game.input.onUp.add(this.onMouseUp, this);
		this.game.input.onDown.add(this.onMouseDown, this);
	};
	
	InteractiveSprite.prototype.removeListeners = function(){
		this.game.input.onUp.remove(this.onMouseUp, this);
		this.game.input.onDown.remove(this.onMouseDown, this);
	};
	
	InteractiveSprite.prototype.enableInput = function(){
		if(!this.inputEnabled){
			this.inputEnabled = true;
			this.game.input.useHandCursor = true;
			this.addListeners();
		}
	};
	
	InteractiveSprite.prototype.disableInput = function(){
		if(this.inputEnabled && this.game.input){
			this.removeListeners();
			this.inputEnabled = false;
		}
	};

	InteractiveSprite.prototype.hitData = function(data){
		var input, hits, pointer, localPoint;
		input = this.game.input;
		if(!this.inputEnabled){
			return {'hits':false};
		}
		pointer = input.activePointer;
		localPoint = input.getLocalPosition(this, pointer);
		hits = input.hitTest(this, pointer, localPoint);
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
		Phaser.Sprite.prototype.destroy.call(this, children);
	};

	return InteractiveSprite;

});



define('phasercomponents/display/abstractbutton',
	
['phaser', 'phasercomponents/display/view'], function(Phaser, View){
	
	
	
	var AbstractButton = function(options){
		View.call(this);
		this.options = options;
		this.frames = options.frames || [0, 1, 2, 3];
		this.mouseDownSignal = new Phaser.Signal();
		this.mouseUpSignal = new Phaser.Signal();
		this.create();
	};

	AbstractButton.prototype = Object.create(View.prototype);
	AbstractButton.prototype.constructor = AbstractButton;

	AbstractButton.prototype.goToFrame = function(i){
		this.sprite.setFrames(this.frames[i], this.frames[i], this.frames[i], this.frames[i]);
	};

	AbstractButton.prototype.resetFrames = function(i){
		this.sprite.setFrames(this.frames[0], this.frames[1], this.frames[2], this.frames[3]);
	};

	AbstractButton.prototype.select = function(){
		this.goToFrame(this.frames[1]);
	};

	AbstractButton.prototype.deselect = function(){
		this.goToFrame(this.frames[0]);
	};

	AbstractButton.prototype.create = function(){
		this.sprite = new Phaser.Button(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset, this.callback, this, this.frames[0], this.frames[1], this.frames[2], this.frames[3]);
		this.sprite.events.onInputUp.add(this.mouseUp, this);
		this.sprite.events.onInputDown.add(this.mouseDown, this);
		this.resetFrames();
		this.enableInput();
	};

	AbstractButton.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	AbstractButton.prototype.enableInput = function(){
		this.sprite.inputEnabled = true;
		this.sprite.alpha = 1;
		this.sprite.input.useHandCursor = true;
	};
	
	AbstractButton.prototype.disableInput = function(){
		this.sprite.inputEnabled = false;
		this.sprite.alpha = 0.6;
	};
	
	AbstractButton.prototype.mouseDown = function(){
		this.mouseDownSignal.dispatch({"target":this});
	};
	
	AbstractButton.prototype.destroy = function(){
		this.sprite.events.onInputUp.remove(this.mouseUp, this);
		this.sprite.events.onInputDown.remove(this.mouseDown, this);
		this.sprite.inputEnabled = false;
		this.sprite.destroy(true);
		this.mouseDownSignal = null;
		this.mouseUpSignal = null;
	};

	return AbstractButton;

});



define('phasercomponents/models/abstractmodel',['phaser'],

function(Phaser){
	
	
	
	var AbstractModel  = function(){
		this.changeSignal = new Phaser.Signal();
	};
	
	AbstractModel.prototype.trigger = function(command) {
		this.changeSignal.dispatch(this.getData());
	};
	
	AbstractModel.prototype.setData = function(n) {
		
	};
	
	AbstractModel.prototype.getData = function() {
		return {};
	};
	
	AbstractModel.prototype.destroy = function(command) {
		this.changeSignal.dispose();
		this.changeSignal = null;
	};
	
	return AbstractModel;

});
	


define('phasercomponents/display/buttongrid/buttongridmodel',['phasercomponents/models/abstractmodel'],

function(AbstractModel){
	
	
	
	var ButtonGridModel  = function(){
		AbstractModel.call(this);
		this.selected = null;
	};
	
	ButtonGridModel.prototype = Object.create(AbstractModel.prototype);
	ButtonGridModel.prototype.constructor = ButtonGridModel;
	
	ButtonGridModel.prototype.getData = function(){
		return {"index":this.selected};
	};
	
	ButtonGridModel.prototype.setData = function(n) {
		this.setSelected(n);
	};
	
	ButtonGridModel.prototype.setSelected = function(i) {
		if(this.selected !== i){
			this.selected = i;
			this.trigger();
		}
	};
	
	return ButtonGridModel;

});
	


define('phasercomponents/display/buttongrid/buttongrid',['phaser', 'phasercomponents/display/container',

'phasercomponents/display/buttongrid/buttongridmodel'],

function(Phaser, Container,

ButtonGridModel){
	
	
	
	var ButtonGrid = function(game, options){
		this.game = game;
		if(options.performSelect === null || options.performSelect === undefined){
			options.performSelect = true;
		}
		this.model = options.model || new ButtonGridModel();
		this.model.changeSignal.add(this.onSelectedChanged, this);
		this.data = options.data || [];
		this.spaceX = options.bounds.w / options.numX;
		this.spaceY = options.bounds.h / options.numY;
		this.marginX = (this.spaceX - options.buttonClass.WIDTH)/2;
		this.marginY = (this.spaceY - options.buttonClass.HEIGHT)/2;
		this.buttons = [];
		Container.call(this, this.game, options);
		this.changeSignal = new Phaser.Signal();
		this.clickSignal = new Phaser.Signal();
		this.showSelected(this.model.getData().index);
	};
	
	ButtonGrid.prototype = Object.create(Container.prototype);
	ButtonGrid.prototype.constructor = ButtonGrid;
	
	ButtonGrid.prototype.onSelectedChanged = function(data){
		var index = data.index;
		this.showSelected(index);
		this.changeSignal.dispatch({"index":index, "grid":this});
	};
	
	ButtonGrid.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addButtons();
	};
	
	ButtonGrid.prototype.disableAll = function(){
		this.buttons.forEach(function(b, i){
			b.disableInput();
		});
	};
	
	ButtonGrid.prototype.enableAll = function(){
		this.buttons.forEach(function(b){
			b.enableInput();
		});
	};
	
	ButtonGrid.prototype.addBg = function(){
		if(this.options.bgasset){
			this.bg = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.bgasset);
			this.group.add(this.bg);
		}
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
				options = {"bounds":pos, "index":n, "data":this.data[n], "frames":[0, 1, 2, 3]};
				b = new ClassRef(options);
				b.mouseUpSignal.add(this.buttonUp, this);
				this.buttonGroup.add(b.group || b.sprite);
				this.buttons.push(b);
				n++;
			}
		}
		this.group.add(this.buttonGroup);
	};
	
	ButtonGrid.prototype.buttonUp = function(data) {
		var target, index;
		target = data.target.group || data.target.sprite;
		index = this.buttonGroup.getIndex(target);
		if(this.options.performSelect){
			this.model.setData(index);
		}
		this.clickSignal.dispatch({"index":index, "grid":this});
	};
	
	ButtonGrid.prototype.destroy = function() {
		var that = this;
		this.model.changeSignal.remove(this.onSelectedChanged, this);
		this.buttons.forEach(function(b, i){
			b.mouseUpSignal.remove(that.buttonUp, that);
			b.destroy();
		});
		Container.prototype.destroy.call(this);
		this.buttonGroup.destroy(true);
		this.bg = null;
		this.changeSignal = null;
		this.buttons = [];
		this.model = null;
		this.signal = null;
	};
	
	return ButtonGrid;

});





define('phasercomponents/display/buttongrid/buttonbar',['phasercomponents/display/buttongrid/buttongrid'],

function(ButtonGrid){
	
	
	
	var ButtonBar = function(game, options){
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
		ButtonGrid.call(this, game, options);
	};
	
	ButtonBar.HORIZONTAL = "horizontal";
	ButtonBar.VERTICAL = "vertical";
	
	ButtonBar.prototype = Object.create(ButtonGrid.prototype);
	ButtonBar.prototype.constructor = ButtonBar;
	
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





define('phasercomponents/display/buttongrid/tabbuttonbar',['phasercomponents/display/buttongrid/buttonbar'],

function(ButtonBar){
	
	
	
	var TabButtonBar = function(game, options){
		ButtonBar.call(this, game, options);
	};
	
	TabButtonBar.prototype = Object.create(ButtonBar.prototype);
	TabButtonBar.prototype.constructor = TabButtonBar;
	
	TabButtonBar.prototype.create = function(){
		ButtonBar.prototype.create.call(this);
		this.setSelected(0);
	};
	
	return TabButtonBar;
	
});



define('phasercomponents/display/slider/slider',['phaser', 'phasercomponents/display/container',

'phasercomponents/display/interactivesprite'],

function(Phaser, Container,

InteractiveSprite){
	
	
	
	var Slider = function(game, options){
		var index;
		this.game = game;
		this.num = Math.floor(Math.random() * 1000);
		this.model = options.model;
		this.stepDist = (Slider.WIDTH - Slider.HANDLEWIDTH) / options.num;
		this.model.changeSignal.add(this.onChanged, this);
		Container.call(this, this.game, options);
		index = this.model.getData().index;
		if(index !== null){
			this.goTo(index);
		}
	};
	
	Slider.WIDTH = 			200;
	Slider.HEIGHT = 		40;
	Slider.HANDLEWIDTH = 	40;
	Slider.HANDLEHEIGHT = 	40;
	
	Slider.prototype = Object.create(Container.prototype);
	Slider.prototype.constructor = Slider;
	
	Slider.prototype.onChanged = function(data){
		this.goTo(data.index);
	};
	
	Slider.prototype.goTo = function(n) {
		this.handle.x = this.bounds.x + Slider.HANDLEWIDTH/2 + (n * this.stepDist);
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
		this.game.input.moveCallback = null;
		this.game.input.mouse.mouseOutCallback = null;
		this.game.input.onDown.remove(this.onUp, this);
		this.snap();
	};
	
	Slider.prototype.snap = function() {
		var num;
		num = (this.handle.x - Slider.HANDLEWIDTH/2 - this.bounds.x) / this.stepDist;
		num = Math.round(num);
		this.goTo(num);
		this.model.setData(num);
	};

	Slider.prototype.isOutside = function(x, y) {
		if(x < this.bounds.x  - 20 || x > this.bounds.x + Slider.WIDTH + 20){
			return true;
		}
		else if(y < this.bounds.y - 30 || y > this.bounds.y + Slider.HEIGHT + 30){
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
			this.handle.x =  xpos;
		}
	};
	
	Slider.prototype.startDragging = function(data) {
		this.dragging = true;
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.moveCallback = this.move.bind(this);
		this.game.input.mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
	};
	
	Slider.prototype.addListeners = function(){
		this.handle.mouseDownSignal.add(this.startDragging, this);
	};
	
	Slider.prototype.removeListeners = function(){
		this.handle.mouseDownSignal.remove(this.startDragging, this);
		this.game.input.onDown.remove(this.onUp, this);
	};
	
	Slider.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Slider.prototype.addHandle = function(){
		var x, y;
		x = this.bounds.x + Slider.HANDLEHEIGHT/2;
		y = this.bounds.y + Slider.HANDLEHEIGHT/2;
		this.handle = new InteractiveSprite(this.game, x, y, 'sliderhandle');
		this.handle.anchor.setTo(0.5, 0.5);
		this.group.add(this.handle);
	};
	
	Slider.prototype.addBg = function(){
		this.bg = new Phaser.Sprite(this.game,  this.bounds.x, this.bounds.y, 'sliderbg');
		this.group.add(this.bg);
	};
	
	Slider.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addHandle();
		this.enableInput();
	};
	
	Slider.prototype.destroy = function(){
		this.removeListeners();
		this.bg.destroy(true);
		this.model.changeSignal.remove(this.onChanged, this);
		this.game.input.onUp.remove(this.onUp, this);
		this.game.input.moveCallback = null;
		this.game.input.mouse.mouseOutCallback = null;
		this.handle.destroy();
		this.handle = null;
		this.bg = null;
	};
	
	return Slider;

});


	

define('phasercomponents/display/scroller/scroller',['phaser', 'phasercomponents/display/container'],

function(Phaser, Container){
	
	

	var Scroller = function(game, options){
		this.x0 = null;
		this.game = game;
		this.children = [];
		this.dragging = false;
		this.minX = 0;
		this.pageNum = 0;
		this.selectSignal = new Phaser.Signal();
		this.pageSignal = new Phaser.Signal();
		Container.call(this, this.game, options);
	};
	
	Scroller.prototype = Object.create(Container.prototype);
	Scroller.prototype.constructor = Scroller;
	
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

	Scroller.prototype.buttonUp = function(data) {
		this.game.input.moveCallback = null;
		this.x0 = null;
		var targetIndex = this.group.getIndex(data.target.sprite);
		if(Math.abs(this.dx) > Scroller.MIN_MOVE){
			this.snap();
		}
	};

	Scroller.prototype.move = function(pointer, x, y) {
		var xpos;
		if(this.x0 === null){
			this.x0 = x;
		}
		this.dx = this.x0 - x;
		xpos = this.startX - this.dx;
		xpos = Math.min(Math.max(xpos, this.minX), 0);
		this.contentGroup.x = xpos;
	};
	
	Scroller.prototype.startDragging = function(data) {
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
		console.log("Context.eventDispatcher "+Context.eventDispatcher);
		this.eventDispatcher = Context.eventDispatcher;
	};

	Scene.prototype.shutdown = function() {
		this.game = null;
		this.world = null;
		this.eventDispatcher = null;
	};

	return Scene;

});
	
	





define('phasercomponents',[

	'phasercomponents/context',

	'phasercomponents/display/movieclip',

	'phasercomponents/display/container',

	'phasercomponents/display/interactivesprite',

	'phasercomponents/display/abstractbutton',

	'phasercomponents/models/abstractmodel',

	'phasercomponents/display/buttongrid/buttongrid',

	'phasercomponents/display/buttongrid/buttongridmodel',

	'phasercomponents/display/buttongrid/tabbuttonbar',

	'phasercomponents/display/buttongrid/buttonbar',

	'phasercomponents/events/eventdispatcher',

	'phasercomponents/display/slider/slider',

	'phasercomponents/display/scroller/scroller',

	'phasercomponents/scene',

	'phasercomponents/display/view'
	
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

		Slider, 

		Scroller,

		Scene,

		View

		) {
		
    



    return {
        'MovieClip': 			MovieClip,
        'Container': 			Container,
        'InteractiveSprite': 	InteractiveSprite,
        'AbstractButton': 		AbstractButton,
        'AbstractModel': 		AbstractModel,
        'ButtonGrid': 			ButtonGrid,
       	'ButtonGridModel': 		ButtonGridModel,
    	'TabButtonBar': 		TabButtonBar,
        'ButtonBar': 			ButtonBar,
        'EventDispatcher': 		EventDispatcher,
        'Slider': 				Slider,
        'Scroller': 			Scroller,
        'Context': 				Context,
        'Scene': 				Scene,
        'View': 				View
    };
    

});

