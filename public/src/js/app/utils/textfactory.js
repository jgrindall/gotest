
define(['app/game'], function(Game){
	
	"use strict";
	
	var TextFactory  = function(){
		
	};
	
	TextFactory.LARGE = 0;
	TextFactory.MEDIUM = 1;
	TextFactory.SMALL = 2;	
	
	TextFactory.DEFAULT_FONT_LARGE = {font: "100px Yanone", align: "center"};
	TextFactory.DEFAULT_FONT_MEDIUM = {font: "60px Yanone", align: "center"};
	TextFactory.DEFAULT_FONT_SMALL = {font: "40px Yanone", align: "center"};
	
	TextFactory.FONTS = [TextFactory.DEFAULT_FONT_LARGE, TextFactory.DEFAULT_FONT_MEDIUM, TextFactory.DEFAULT_FONT_SMALL];
	
	TextFactory.centreX = function(label){
		
	};
		
	TextFactory.make = function(x, y, label, size){
		var font, text, fill;
		font = TextFactory.FONTS[size];
		text = new Phaser.Text(Game.getInstance(), x, y, label, font);
	    text.stroke = '#777777';
	    text.strokeThickness = 2;
	    fill = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
		fill.addColorStop(0, '#ffffff');   
		fill.addColorStop(1, '#eeeeee');
		text.fill = fill;
		text.setShadow(2, 2, 'rgba(1, 1, 1, 0.4)', 5);
		return text;
	};
	
	return TextFactory;

});
	
	

