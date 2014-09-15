define(['../../src/js/app/assets', '../../src/js/app/models/diagmodel', '../../src/js/app/views/buttons/arrowbutton'],

	function(Assets, DiagModel, ArrowButton){
  	
  	describe("Basic stuff", function(){
		it("should work",
			function(){ 
				expect(Assets.LOADER_BAR).toBe("loaderBar"); 
			}
		); 
    });

    describe("More stuff", function(){
		it("should work",
			function(){
				var model = new DiagModel();
				expect(model.get()).toBe(null); 
			}
		); 
    });


	describe("More stuff", function(){
		it("should work",
			function(){
				var b = new ArrowButton({data:{}});
				expect(b).toNotBe(null); 
			}
		); 
    });
    
});