
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

	CommandMap.prototype.trigger = function(event, obj){
		var cmd;
		if(!obj || !obj.type){
			throw "Undefined command";
		}
		var CommandClassRef = this.get(obj.type);
		if(CommandClassRef && (typeof CommandClassRef === "function")){
			cmd = new CommandClassRef();
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






define('phasercomponents/context',['phasercomponents/gamemanager',

	'phasercomponents/commandmap', 'phasercomponents/events/eventdispatcher'],

	function(GameManager, CommandMap, EventDispatcher) {
	
	

   	var Context = function ( ){
		this.commandMap = new CommandMap();
		this.gameManager = new GameManager();
		Context.eventDispatcher = new EventDispatcher();
		Context.eventDispatcher.addListener("scene", this.onChangeScene.bind(this));
		this.commandMap.eventDispatcher = Context.eventDispatcher;
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



define('phasercomponents/display/view',

	['phasercomponents/context'], function(Context){
	
	
	
	var View = function(){
		this.game = Context.game;
		this.eventDispatcher = Context.eventDispatcher;
	};

	View.prototype.destroy = function(){
		this.game = null;
		this.eventDispatcher = null;
	};

	return View;

});



define('phasercomponents/display/movieclip', ['phaser', 'phasercomponents/display/view'],

	function(Phaser, View){
	
	
	
	var MovieClip = function(options){
		View.call(this);
		this.options = options;
		this.create();
	};
	
	MovieClip.prototype = Object.create(View.prototype);
	MovieClip.prototype.constructor = MovieClip;

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


define('phasercomponents/display/container',

	['phaser', 'phasercomponents/display/view'],

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
		View.prototype.destroy.call(this);
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



define('phasercomponents/display/buttons/abstractbutton',
	
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



define('phasercomponents/models/abstractmodel',['phaser', 'phasercomponents/context'],

function(Phaser, Context){
	
	
	
	var AbstractModel  = function(){
		this.changeSignal = new Phaser.Signal();
		this.eventDispatcher = Context.eventDispatcher;
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
	
	
	
	var ButtonGrid = function(options){
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
		Container.call(this, options);
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
		this.changeSignal = null;
		this.buttons = [];
		this.model = null;
		this.signal = null;
	};
	
	return ButtonGrid;

});





define('phasercomponents/display/buttongrid/buttonbar',['phasercomponents/display/buttongrid/buttongrid'],

function(ButtonGrid){
	
	
	
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
	
	
	
	var Slider = function(options){
		var index;
		this.num = Math.floor(Math.random() * 1000);
		this.model = options.model;
		this.stepDist = (Slider.WIDTH - Slider.HANDLEWIDTH) / options.num;
		this.model.changeSignal.add(this.onChanged, this);
		Container.call(this, options);
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

	['jquery', 'phaser', 'phasercomponents/context'], 

function($, Phaser, Context){

	
	
	var AlertManager  = function(){
		this.game = Context.game;
	};
	
	AlertManager.prototype.close = function(){
		if(this.alert){
			this.alert.selectSignal.remove(this.callbackProxy);
			this.alert.destroy();
			this.bg.destroy();
			this.bg = null;
			this.alert = null;
			//Game.alertSignal.dispatch({"show":false});
		}
	};
	
	AlertManager.prototype.alertClick = function(){
		this.closeAlert();
	};
	
	AlertManager.prototype.addBg = function(){
		this.bg = new Phaser.Graphics(this.game, 0, 0);
		this.bg.beginFill(0x000000);
		this.bg.alpha = 0.7;
    	this.bg.drawRect(0, 0, this.game.w, this.game.h);
    	this.bg.endFill();
		this.game.world.add(this.bg);
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
		//Game.alertSignal.dispatch({"show":true});
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
		var that = this;
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



define('phasercomponents/utils/soundmanager',['phasercomponents/context'], function(Context){
	
	
	
	var SoundManager = function(options){
		this.game = Context.game;
		this.fx = this.game.add.audio('sound1');
		this.fx.addMarker('home', 1, 1.0);
	};
	
	SoundManager.create = function(){
		SoundManager.instance = new SoundManager();
	};
	
	SoundManager.getInstance = function(){
		if(!SoundManager.instance){
			SoundManager.create();
		}
		return SoundManager.instance;
	};
	
	SoundManager.prototype.play = function(name){
		this.fx.play('home');
	};
	
	return SoundManager;
	
});


define('phasercomponents/abstractcommand',

	['phasercomponents/context'], function(Context){
	
	
	
	var AbstractCommand = function(){
		this.eventDispatcher = Context.eventDispatcher;
		this.game = Context.game;
	};
	
	AbstractCommand.prototype.start = function(data){
		this.execute(data);
	};

	AbstractCommand.prototype.cleanUp = function(){
		this.eventDispatcher = null;
	};
	
	return AbstractCommand;

});






define('phasercomponents/display/scroller/groupmarker',[

	'phasercomponents/display/container'],

function(Container){
	
	
	
	var GroupMarker = function(options){
		this.buttons = [];
		Container.call(this, options);
	};
	
	GroupMarker.prototype = Object.create(Container.prototype);
	GroupMarker.prototype.constructor = GroupMarker;
	
	GroupMarker.prototype.create = function(){
		var b, i, x, ClassRef;
		ClassRef = this.options.buttonClass;
		Container.prototype.create.call(this);
		for(i = 0; i <= this.options.num - 1; i++){
			x = this.game.cx - 20 * this.options.num + i * 40;
			b = new ClassRef({'bounds':{"x":x, "y":this.game.h - 40}});
			this.group.add(b.sprite);
			this.buttons.push(b);
		}
		this.setSelected(0);
	};
	
	GroupMarker.prototype.destroy = function() {
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

	['phasercomponents/display/scroller/groupmarker', 'phasercomponents/display/scroller/scroller'],

function(GroupMarker, Scroller){
	
	
	
	var Pager = function(options){
		Scroller.call(this, options);
		if(options.snapX !== this.game.w){
			throw "should snap to game width";
		}
	};
	
	Pager.prototype = Object.create(Scroller.prototype);
	Pager.prototype.constructor = Pager;
	
	Pager.prototype.addChildren = function(){
		Scroller.prototype.addChildren.call(this);
		var numPages = this.numPages();
		if(numPages >= 2){
			this.groupMarker = new GroupMarker({"num":numPages, "buttonClass":this.options.markerButtonClass});
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

	['phasercomponents/display/view', 'phasercomponents/display/interactivesprite'],

function(View, InteractiveSprite){
	
	
	
	var MultiButton = function(options){
		View.call(this);
		this.options = options;
		this.model = this.options.model;
		this.options.model.changeSignal.add(this.onChanged, this);
		this.create();
		this.init();
		
	};

	MultiButton.prototype = Object.create(View.prototype);
	MultiButton.prototype.constructor = MultiButton;

	MultiButton.prototype.init = function(){
		var index = this.model.getData().index;
		if(index !== null){
			this.goToFrame(index);
		}
	};

	MultiButton.prototype.onChanged = function(data){
		this.goToFrame(data.index);
	};

	MultiButton.prototype.goToFrame = function(i){
		this.sprite.animations.play('frame'+i);
	};
	
	MultiButton.prototype.enableInput = function(){
		this.sprite.enableInput();
	};
	
	MultiButton.prototype.disableInput = function(){
		this.sprite.disableInput();
	};
	
	MultiButton.prototype.create = function(){
		var i;
		this.sprite = new InteractiveSprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 500, true);	
		}
		this.sprite.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	MultiButton.prototype.mouseUp = function(data){
		var p, frame;
		p = data.localPoint.x / this.options.bounds.w;
		frame = Math.floor(this.options.num * p);
		this.model.setData(frame);
	};
	
	MultiButton.prototype.destroy = function(){
		this.disableInput();
		this.model.changeSignal.remove(this.onChanged, this);
		this.model = null;
		this.sprite.destroy(true);
		View.prototype.destroy.call(this);
	};

	return MultiButton;

});




define('phasercomponents/display/buttons/stepperbutton',[ 
	
'phasercomponents/display/view', 'phasercomponents/display/interactivesprite'],

function(View, InteractiveSprite){
	
	
	
	var StepperButton = function(options){
		var index;
		View.call(this);
		this.options = options;
		this.model = this.options.model;
		this.model.changeSignal.add(this.onChanged, this);
		this.create();
		index = this.model.getData().index;
		if(index !== null){
			this.goToFrame(index);
		}
	};

	StepperButton.prototype = Object.create(View.prototype);
	StepperButton.prototype.constructor = StepperButton;

	StepperButton.prototype.onChanged = function(data){
		this.goToFrame(data.index);
	};

	StepperButton.prototype.goToFrame = function(i){
		this.sprite.animations.play('frame'+i);
	};
	
	StepperButton.prototype.enableInput = function(){
		this.sprite.enableInput();
	};
	
	StepperButton.prototype.disableInput = function(){
		this.sprite.disableInput();
	};
	
	StepperButton.prototype.create = function(){
		var i;
		this.sprite = new InteractiveSprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 0, true);	
		}
		this.sprite.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	StepperButton.prototype.mouseUp = function(data){
		this.model.increment();
	};
	
	StepperButton.prototype.destroy = function(){
		View.prototype.destroy.call(this);
		this.disableInput();
		this.model.changeSignal.remove(this.onChanged, this);
		this.model = null;
		this.sprite.destroy(true);
		this.options = null;
	};

	return StepperButton;

});




define('phasercomponents/display/buttons/radiobuttons',['phasercomponents/display/buttongrid/buttonbar'

],

function(ButtonBar

){
	
	
	
	var RadioButtons  = function(options){
		options.numX = 1;
		ButtonBar.call(this, options);
	};
	
	RadioButtons.WIDTH = 120;
	RadioButtons.HEIGHT = 120;

	RadioButtons.prototype = Object.create(ButtonBar.prototype);
	RadioButtons.prototype.constructor = RadioButtons;
	
	return RadioButtons;

});
	


define('phasercomponents/display/buttons/togglebutton',['phasercomponents/display/buttons/stepperbutton'],

function(StepperButton){
	
	
	
	var ToggleButton = function(options){
		options.num = 2;
		options.asset = 'toggle';
		StepperButton.call(this, options);
	};

	ToggleButton.WIDTH = 120;
	ToggleButton.HEIGHT = 60;

	ToggleButton.prototype = Object.create(StepperButton.prototype);
	ToggleButton.prototype.constructor = ToggleButton;

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
		var obj, type;
		obj = this.assets[this.numLoaded];
		type = obj.type;
		if(type === "image"){
			this.game.load.image(obj.key, obj.asset);
		}
		else if(type === "spritesheet"){
			this.game.load.spritesheet(obj.key, obj.asset, obj.w, obj.h);
		}
		else if(type === "tilemap"){
			this.game.load.tilemap(obj.key, obj.asset, null, Phaser.Tilemap.TILED_JSON);
		}
		else if(type === "sound"){
			this.game.load.audio(obj.key, [obj.asset]);
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







define('phasercomponents/display/popups/abstractpopup',['phaser',

'phasercomponents/display/container'],

function(Phaser,

Container){
	
	
		
	var AbstractPopup = function(options){
		this.buttons = [];
		this.selectSignal = new Phaser.Signal();
		Container.call(this, options);
		this.group.y = this.game.h + 50;
	};
	
	AbstractPopup.prototype = Object.create(Container.prototype);
	AbstractPopup.prototype.constructor = AbstractPopup;
	
	AbstractPopup.prototype.addPanel = function () {
		this.panel = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.bgasset);
		this.group.add(this.panel);
	};
	
	AbstractPopup.prototype.showMe = function () {
		this.game.add.tween(this.group).to( {x: 0, y: 0}, 300, Phaser.Easing.Back.Out, true, 0, false);
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
	





define('phasercomponents/display/loaderbar',['phasercomponents/display/movieclip'], 

	function(MovieClip){
	
	
	
	var LoaderBar = function(options){
		MovieClip.call(this, options);
		this.create();
	};
	
	LoaderBar.prototype = Object.create(MovieClip.prototype);
	LoaderBar.prototype.constructor = LoaderBar;

	LoaderBar.prototype.goToPercent = function(p){
		var g, numFrames;
		numFrames = 8;
		g = (numFrames - 1)/100;
		MovieClip.prototype.goTo.call(this, Math.round(p*g));
	};
	
	LoaderBar.prototype.destroy = function(){
		MovieClip.prototype.destroy.call(this);
	};
	
	return LoaderBar;

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
	'phasercomponents/display/slider/slider',
	'phasercomponents/display/scroller/scroller',
	'phasercomponents/scene',
	'phasercomponents/display/view',
	'phasercomponents/utils/storage',
	'phasercomponents/utils/alertmanager',
	'phasercomponents/utils/printmanager',
	'phasercomponents/utils/soundmanager',
	'phasercomponents/abstractcommand',
	'phasercomponents/display/scroller/pager',
	'phasercomponents/display/buttons/multibutton',
	'phasercomponents/display/buttons/stepperbutton',
	'phasercomponents/display/buttons/radiobuttons',
	'phasercomponents/display/buttons/togglebutton',
	'phasercomponents/preloader',
	'phasercomponents/display/popups/abstractpopup',
	'phasercomponents/display/loaderbar'
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
		LoaderBar
	) {

    

    //TODO - split
    var Display = {};

    return {
        'Display':Display,
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
        'Pager': 				Pager,
        'Context': 				Context,
        'Scene': 				Scene,
        'View': 				View,
        'Storage': 				Storage,
        'AlertManager': 		AlertManager,
        'PrintManager': 		PrintManager,
        'SoundManager': 		SoundManager,
        'AbstractCommand': 		AbstractCommand,
        'MultiButton': 			MultiButton,
        'StepperButton': 		StepperButton,
        'RadioButtons': 		RadioButtons,
        'ToggleButton': 		ToggleButton,
        'Preloader': 			Preloader,
        'AbstractPopup':  		AbstractPopup,
        'LoaderBar': 			LoaderBar
    };
    
});

