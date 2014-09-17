
define(['phasercomponents', 'app/models/modelfacade'],

function(PhaserComponents, ModelFacade){
	
	"use strict";
	
	var Indicator = function(options){
		PhaserComponents.Display.Container.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.add(this.setProgress, this);
	};

	Indicator.RADIUS = 40;
	
	Indicator.prototype.setProgress = function(){
		var num, total;
		num = ModelFacade.getInstance().get(ModelFacade.COMMTICKER).get();
		total = ModelFacade.getInstance().get(ModelFacade.COMM).getNum();
		this.drawText(num, total);
	};

	Indicator.prototype.drawText = function(num, total){
		this.label.text = num+"/"+total;
	};
	
	Indicator.prototype.destroy = function() {
		PhaserComponents.Display.Container.prototype.destroy.call(this);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.remove(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.remove(this.setProgress, this);
		this.group.remove(this.label);
		this.label.destroy();
		this.label = null;
	};

	Indicator.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.label = PhaserComponents.TextFactory.make('vsmall', this.game, this.bounds.x, this.bounds.y, "0/0");
		this.group.add(this.label);
	};
	
	return Indicator;
});

