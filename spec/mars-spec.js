describe("Mars", function() {
	var mars;
	
	it("should accept any size up to 50", function() {
		mars = new Mars(20, 23);
		expect(mars).toBeDefined();
	});
	
	it("should accept a 0 0 size", function() {
		mars = new Mars(0, 0);
		expect(mars).toBeDefined();
	});
	
	it("should not accept a negative width", function() {
		expect(function(){new Mars(-20, 23);}).toThrow();
	});
	
	it("should not accept a negative height", function() {
		expect(function(){new Mars(20, -23);}).toThrow();
	});
	
	it("should not accept a size over 50 height", function() {
		expect(function(){new Mars(20, 53);}).toThrow();
	});
	
	it("should not accept a size over 50 width", function() {
		expect(function(){new Mars(52, 3);}).toThrow();
	});
	
	it("should add a new death if is an unsafe landing", function() {
		mars = new Mars(20, 23);
		mars.isUnsafeLanding(12, 24);
		expect(mars.hasDeathScent(12, 24)).toBe(true);
	});

	it("should accept death scents", function() {
		mars = new Mars(20, 23);
		mars.addDeath(20,30);
		expect(mars.hasDeathScent(20,30)).toBe(true);
	});

});
