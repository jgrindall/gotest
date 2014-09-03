
define('app/views/canvas/canvas',['app/game', 'phasercomponents', 'app/components/background',

'app/views/canvas/map', 'app/views/canvas/drawing', 'app/models/modelfacade',

'app/views/components/indicator', 'app/views/canvas/grid'],

function(Game, PhaserComponents, Background,

Map, Drawing, ModelFacade,

Indicator, Grid){
	
	"use strict";
	
	var Canvas  = function(options){
		PhaserComponents.Container.call(this, Game.getInstance(), options);
	};
	
	Canvas.prototype = Object.create(PhaserComponents.Container.prototype);
	Canvas.prototype.constructor = Canvas;
	
	Canvas.prototype.addBg = function() {
		var w, h, bounds;
		w = Game.w();
		h = Game.h();
		this.bg = new Background({"asset":'sky', "bounds":this.bounds});
		this.group.add(this.bg.sprite);
	};

	Canvas.prototype.create = function() {
		PhaserComponents.Container.prototype.create.call(this);
		this.addBg();
		this.addMap();
		this.addGrid();
		this.addDrawing();
		this.addIndicator();
	};
	
	Canvas.prototype.addIndicator = function() {
		this.indicator = new Indicator({'bounds':{'x':10, 'y':50}});
		this.group.add(this.indicator.gfx);
	};
	
	Canvas.prototype.addDrawing = function() {
		this.drawing = new Drawing({'bounds':this.bounds});
		this.group.add(this.drawing.group);
	};
	
	Canvas.prototype.addMap = function() {
		this.map = new Map({'bounds':this.bounds});
		this.group.add(this.map.group);
	};

	Canvas.prototype.addGrid = function() {
		var sizeModel, visModel;
		visModel = ModelFacade.getInstance().get(ModelFacade.GRID);
		sizeModel = ModelFacade.getInstance().get(ModelFacade.STEPLENGTH);
		this.grid = new Grid({'bounds':this.bounds, 'sizeModel':sizeModel, 'visModel':visModel});
		this.group.add(this.grid.group);
	};
	
	Canvas.prototype.destroy = function() {
		this.group.remove(this.grid.group);
		this.group.remove(this.map.group);
		this.group.remove(this.grid.group);
		this.group.remove(this.indicator.gfx);
		this.group.remove(this.bg.sprite);
		this.map.destroy();
		this.bg.destroy();
		this.grid.destroy();
		this.drawing.destroy();
		this.indicator.destroy();
		PhaserComponents.Container.prototype.destroy.call(this);
	};
	
	return Canvas;

});
	
