
define('app/views/components/indicator',['app/game', 'app/text/textfactory',

'app/components/container', 'app/models/modelfacade'],

function(Game, TextFactory,

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
		this.drawArc(1 - num/total);
	};

	Indicator.prototype.drawText = function(num, total){
		this.label.text = num+"/"+total;
	};

	Indicator.prototype.drawArc = function(percent){
		var r, x, y, angle;
		angle = percent * 2 * 3.14159265;
		r = Indicator.RADIUS;
		x = r + Math.cos(angle);
		y = r + Math.sin(angle);
		this.gfx.clear();
		this.gfx.lineStyle(0, 0x990099, 0);
		this.gfx.beginFill(0x990000, 1);
		this.gfx.moveTo(r, r);
		this.gfx.lineTo(x, y);
		this.gfx.arc(r, r, r, -angle, 0);
		this.gfx.lineTo(r, r);
		this.gfx.endFill();
		
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
		this.label = TextFactory.make(this.bounds.x, this.bounds.y, "0/0", TextFactory.SMALL);
		this.gfx = new Phaser.Graphics(Game.getInstance(), this.options.bounds.x, this.options.bounds.y);
		this.group.add(this.gfx);
		this.group.add(this.label);
	};
	
	return Indicator;
});

