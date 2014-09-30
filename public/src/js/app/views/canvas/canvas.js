
define(['phasercomponents',

'app/views/canvas/map', 'app/views/canvas/drawing', 'app/models/modelfacade',

'app/views/canvas/grid', 'app/views/canvas/corners', 'app/assets'],

function(PhaserComponents,

Map, Drawing, ModelFacade,

Grid, Corners, Assets){
	
	"use strict";
	
	var Canvas  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.view.scale = {'x':options.scale, 'y':options.scale};
	};

	PhaserComponents.Utils.extends(Canvas, PhaserComponents.Display.Container);

	Canvas.prototype.addCorners = function() {
		this.corners = new Corners({"bounds":this.options.bounds, "top":Assets.CORNERS, "right":Assets.CORNERS, "left":Assets.CORNERS, "bottom":Assets.CORNERS, "topleft":Assets.CORNERSX, "topright":Assets.CORNERSX, "bottomleft":Assets.CORNERSX, "bottomright":Assets.CORNERSX});
		this.group.add(this.corners.group);
	};

	Canvas.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMap();
		this.addGrid();
		this.addDrawing();
		this.addCorners();
	};
	
	Canvas.prototype.addDrawing = function() {
		this.drawing = new Drawing({'bounds':this.bounds});
		this.group.add(this.drawing.view);
	};
	
	Canvas.prototype.addMap = function() {
		this.map = new Map({'bounds':this.bounds});
		this.group.add(this.map.view);
	};

	Canvas.prototype.addGrid = function() {
		var sizeModel, visModel;
		visModel = ModelFacade.getInstance().get(ModelFacade.GRID);
		sizeModel = ModelFacade.getInstance().get(ModelFacade.STEPLENGTH);
		this.grid = new Grid({'bounds':this.bounds, 'sizeModel':sizeModel, 'visModel':visModel});
		this.group.add(this.grid.view);
	};
	
	Canvas.prototype.destroy = function() {
		this.group.remove(this.grid.view);
		this.group.remove(this.map.view);
		this.group.remove(this.drawing.view);
		this.map.destroy();
		this.grid.destroy();
		this.drawing.destroy();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Canvas;

});
	
