describe("Data", function() {
	var data;
	var testStr = "5 3\n"+
	"1 1 E\n"+
	"RFRFRFRF\n"+
	"3 2 N\n"+
	"FRRFLLFFRRFLL\n"+
	"0 3 W\n"+
	"LLFFFLFLFL";
	
	var outStr = "1 1 E\n"+
"3 3 N LOST\n"+
"2 3 S"
		
	beforeEach(function(){
		data = new Data();
	})
	
	it("should only accept a string value", function() {
		expect(function(){data.input(12);}).toThrow();		
	});
	it("should accept a string value", function() {
		data.input(testStr);
		expect(data.str).toBe(testStr);
	});
		
	it("should create a landmass like Mars", function() {
		data.input(testStr);
		data.findLandmass();
		expect(data.landmass).toBeDefined()
		expect(data.landmass.width).toBeDefined()

	});	
	
	it("should split the string into new Robots", function() {
		data.input(testStr);
		data.findLandmass();
		data.findRobots();
		data.splitRobots();
		expect(data.robots[0]).toEqual(jasmine.any(Array))	
	});		
	it("should split the string into Robot commands", function() {
		data.input(testStr);
		data.findLandmass();
		data.findRobots();
		data.splitRobots();
		expect(data.robots[0][1]).toEqual(jasmine.any(String))	
	});	
	it("should run each robot and with it's commands on the landmass", function() {
		data.input(testStr);
		data.findLandmass();
		data.findRobots();
		data.splitRobots();
		data.processRobots();
		expect(data.outputHolder[0]).toEqual(jasmine.any(String));
	});	
	it("should output the data", function() {
		data.input(testStr);
		data.findLandmass();
		data.findRobots();
		data.splitRobots();
		data.processRobots();
		expect(data.output()).toBe(outStr)
	});
	
	it("should have an easy run function", function(){
		var data = new Data();
		expect(
			data.runner("5 3\n"+
			"1 1 E\n"+
			"RFRFRFRF\n"+
			"3 2 N\n"+
			"FRRFLLFFRRFLL\n"+
			"0 3 W\n"+
			"LLFFFLFLFL")
		).toBe(outStr);
		
		
	});

});
