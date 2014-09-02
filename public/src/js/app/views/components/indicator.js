
define('app/views/components/indicator',['phaser', 'app/game', 'app/text/textfactory',

'app/components/container', 'app/models/modelfacade'],

function(Phaser, Game, TextFactory,

Container, ModelFacade){
	
	"use strict";
	
	var Indicator = function(options){
		Container.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.add(this.setProgress, this);
	};

	Indicator.RADIUS = 40;
	
	Indicator.prototype.setProgress = function(){
		var num, total;
		num = ModelFacade.getInstance().get(ModelFacade.COMMTICKER).getData().commandNum;
		total = ModelFacade.getInstance().get(ModelFacade.COMM).getNum();
		this.drawText(num, total);
	};

	Indicator.prototype.drawText = function(num, total){
		this.label.text = num+"/"+total;
	};
	
	Indicator.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.remove(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.remove(this.setProgress, this);
		this.group.remove(this.gfx);
		this.group.remove(this.label);
		this.gfx.destroy();
		this.label.destroy();
		this.gfx = null;
		this.label = null;
	};

	Indicator.prototype.create = function(){
		Container.prototype.create.call(this);
		this.label = TextFactory.make(this.bounds.x, this.bounds.y, "0/0", TextFactory.VSMALL);
		this.gfx = new Phaser.Graphics(Game.getInstance(), this.options.bounds.x, this.options.bounds.y);
		this.group.add(this.gfx);
		this.group.add(this.label);
	};
	
	return Indicator;
});

