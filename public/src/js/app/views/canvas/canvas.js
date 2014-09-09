
define('app/views/canvas/canvas',[ 'phasercomponents', 'app/views/background',

'app/views/canvas/map', 'app/views/canvas/drawing', 'app/models/modelfacade',

'app/views/components/indicator', 'app/views/canvas/grid', 'app/views/canvas/corners', 'app/assets'],

function(PhaserComponents, Background,

Map, Drawing, ModelFacade,

Indicator, Grid, Corners, Assets){
	
	"use strict";
	
	var Canvas  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Canvas, PhaserComponents.Display.Container);

	Canvas.prototype.addBg = function() {
		var w, h, bounds;
		w = this.game.w;
		h = this.game.h;
		this.bg = new Background({"asset":Assets.BG, "bounds":this.bounds});
		this.group.add(this.bg.sprite);
	};

	Canvas.prototype.addCorners = function() {
		this.corners = new Corners({"bounds":this.options.bounds, "top":Assets.CORNERS, "right":Assets.CORNERS, "left":Assets.CORNERS, "bottom":Assets.CORNERS, "topleft":Assets.CORNERSX, "topright":Assets.CORNERSX, "bottomleft":Assets.CORNERSX, "bottomright":Assets.CORNERSX});
		this.group.add(this.corners.group);
	};

	Canvas.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
		this.addMap();
		this.addGrid();
		this.addDrawing();
		this.addIndicator();
		this.addCorners();
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
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Canvas;

});
	
