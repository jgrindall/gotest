
define(['phasercomponents', 'app/models/modelconsts',

'app/views/canvas/map', 'app/views/canvas/drawing', 'app/views/canvas/hotspots',

'app/views/canvas/grid', 'app/views/canvas/corners', 'app/assets'],

function(PhaserComponents, ModelConsts,

Map, Drawing, Hotspots,

Grid, Corners, Assets){
	
	"use strict";
	
	var Canvas  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};

	PhaserComponents.Utils.extends(Canvas, PhaserComponents.Display.Container);

	Canvas.prototype.addCorners = function() {
		this.corners = new Corners({"bounds":this.bounds, "top":Assets.CORNERS, "right":Assets.CORNERS, "left":Assets.CORNERS, "bottom":Assets.CORNERS, "topleft":Assets.CORNERSX, "topright":Assets.CORNERSX, "bottomleft":Assets.CORNERSX, "bottomright":Assets.CORNERSX});
		this.group.add(this.corners.group);
	};

	Canvas.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMap();
		this.addHotspots();
		this.addGrid();
		this.addDrawing();
		this.addCorners();
	};
	
	Canvas.prototype.addDrawing = function() {
		this.drawing = new Drawing({'bounds':this.bounds});
		this.group.add(this.drawing.view);
	};

	Canvas.prototype.addHotspots = function() {
		this.hotspots = new Hotspots({'bounds':this.bounds});
		this.group.add(this.hotspots.view);
	};
	
	Canvas.prototype.addMap = function() {
		this.map = new Map({'bounds':this.bounds});
		this.group.add(this.map.view);
	};

	Canvas.prototype.addGrid = function() {
		var sizeModel, visModel;
		visModel = this.modelFacade.get(ModelConsts.GRID);
		sizeModel = this.modelFacade.get(ModelConsts.STEPLENGTH);
		this.grid = new Grid({'bounds':this.bounds, 'sizeModel':sizeModel, 'visModel':visModel});
		this.group.add(this.grid.view);
	};
	
	Canvas.prototype.removeMap = function() {
		if(this.map){
			this.group.remove(this.map.view);
			this.map.destroy();
			this.map = null;
		}
	};
	
	Canvas.prototype.removeHotspots = function() {
		if(this.hotspots){
			this.group.remove(this.hotspots.view);
			this.hotspots.destroy();
			this.hotspots = null;
		}
	};

	Canvas.prototype.removeGrid = function() {
		if(this.grid){
			this.group.remove(this.grid.view);
			this.grid.destroy();
			this.grid = null;
		}
	};

	Canvas.prototype.removeDrawing = function() {
		if(this.drawing){
			this.group.remove(this.drawing.view);
			this.drawing.destroy();
			this.drawing = null;
		}
	};

	Canvas.prototype.destroy = function() {
		this.removeMap();
		this.removeGrid();
		this.removeDrawing();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Canvas;

});
	
