describe("Robot", function() {
	var robot;
	var mars = new Mars(40, 30);

	it("should be placed on a landmass", function() {
		robot = new Robot(mars, 20, 23, 'N');
		expect(robot.land.width).toBeDefined();
	});
	
	it("should accept an initial postition and direction", function() {
		robot = new Robot(mars, 20, 23, 'N');
		expect(robot).toBeDefined();
	});
	
	it("should not accept a negative position x", function() {
		expect(function(){new Robot(mars, -20, 23, 'N');}).toThrow();
	});
	
	it("should not accept a negative position y", function() {
		expect(function(){new Robot(mars, 20, -23, 'N');}).toThrow();
	});
	
	it("should not accept a position over 50 y", function() {
		expect(function(){new Robot(mars, 20, 53, 'N');}).toThrow();
	});
	
	it("should not accept a position over 50 x", function() {
		expect(function(){new Robot(mars, 52, 3, 'N');}).toThrow();
	});
	
	it("should only accept a string orientation", function() {
		expect(function(){new Robot(mars, 2, 3, 1);}).toThrow();
	});

	it("should always know it's position and direction", function() {
		
		robot = new Robot(mars, 20, 23, 'N');
		expect(robot.o).toBe('N');
		expect(robot.x).toBe(20);
		expect(robot.y).toBe(23);
		
		robot.turn('L');
		robot.forward();
		expect(robot.o).toBe('W');
		expect(robot.x).toBe(19);
		expect(robot.y).toBe(23);
	
	});

	it("should turn left", function() {
		robot = new Robot(mars, 20, 23, 'N');
		robot.turn('L');
		expect(robot.o).toBe('W');
		
		robot.turn('L');
		expect(robot.o).toBe('S');
		
		robot.turn('L');
		expect(robot.o).toBe('E');
		
		robot.turn('L');
		expect(robot.o).toBe('N');
		
		robot.turn('L');
		expect(robot.o).toBe('W');
	});

	it("should turn right", function() {
		robot = new Robot(mars, 20, 23, 'N');
		robot.turn('R');
		expect(robot.o).toBe('E');
		
		robot.turn('R');
		expect(robot.o).toBe('S');
		
		robot.turn('R');
		expect(robot.o).toBe('W');
		
		robot.turn('R');
		expect(robot.o).toBe('N');
		
		robot.turn('R');
		expect(robot.o).toBe('E');
	});

	it("should go forward", function() {
		robot = new Robot(mars, 20, 23, 'N');
		
		robot.turn('L');
		robot.forward();
		robot.turn('L');
		robot.forward();
		robot.turn('R');
		robot.forward();
		robot.turn('L');
		robot.forward();
		expect(robot.o).toBe('S');
		expect(robot.x).toBe(18);
		expect(robot.y).toBe(21);
	});
	
	it("should take a string of orders", function() {
		robot = new Robot(mars, 20, 23, 'N');
		
		robot.orders('LFLFRFLF');
		expect(robot.o).toBe('S');
		expect(robot.x).toBe(18);
		expect(robot.y).toBe(21);
	});
	
	it("should fall off the edge of space", function() {
		var mars = new Mars(5, 3);
		robot = new Robot(mars, 3, 2, 'N');
		
		robot.orders('FRRFLLFFRRFLL');
		expect(robot.isDead()).toBe(true);
		
	});

	it("should learn to have an awesome sense of death", function() {
		var mars = new Mars(5, 3);
		
		robot = new Robot(mars, 3, 2, 'N');
		robot.orders('FRRFLLFFRRFLL');
		var robotStatus = robot.isDead();
		expect(robotStatus).toBe(true);
		
		robot = new Robot(mars, 3, 2, 'N');
		robot.orders('FRRFLLFFRRFLL');
		var robotStatus = robot.isDead();
		expect(robotStatus).toBe(false);
	});

	it("should move in the right direction based on it's initial orientation", function() {
		robot = new Robot(mars, 20, 23, 'N');
		
		robot.turn('R');
		robot.forward();
		expect(robot.o).toBe('E');
		expect(robot.x).toBe(21);
		expect(robot.y).toBe(23);
		
		robot.turn('R');
		robot.forward();
		expect(robot.o).toBe('S');
		expect(robot.x).toBe(21);
		expect(robot.y).toBe(22);
		
		robot.turn('R');
		robot.forward();
		expect(robot.o).toBe('W');
		expect(robot.x).toBe(20);
		expect(robot.y).toBe(22);
		
		robot.turn('R');
		robot.forward();
		expect(robot.o).toBe('N');
		expect(robot.x).toBe(20);
		expect(robot.y).toBe(23);

	});

	it("should accept additional command types", function() {
		robot = new Robot(mars, 20, 23, 'N');

		robot.addOrder('D', function(){
			//die order
			this.isDead = true;
		});
		
		robot.order('D');
		expect(robot.isDead).toBe(true);

	});
	
	it("should match given example 1", function() {
		var mars = new Mars(5, 3);
		
		robot = new Robot(mars, 1, 1, 'E');
		robot.orders('RFRFRFRF');
		expect(robot.toString()).toBe('1 1 E');
		
		var robot2 = new Robot(mars, 3, 2, 'N');
		robot2.orders('FRRFLLFFRRFLL');
		expect(robot2.toString()).toBe('3 3 N LOST');
		
		var robot3 = new Robot(mars, 0, 3, 'W');
		robot3.orders('LLFFFLFLFL');
		expect(robot3.toString()).toBe('2 3 S');
		
	});	

});
