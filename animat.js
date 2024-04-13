class Animat {
    // Constructor for Animat class
    constructor(data, automata) {
        // Assigning the automata instance to the animat
        this.automata = automata;
        // Extracting hue, x, y values from the data object
        this.hue = data.hue;
        this.x = data.x;
        this.y = data.y;
        // Initializing energy to 50
        this.energy = 50;
    }	

    // Method to normalize a value within a range
    normalize(value, max) { 
        // return value >= max ? max-1 : value < 0 ? 0 : value; // no wrap
        return (value + max) % max; // wrap
    }

    // Method to move the animat
    move() {
        let best = Infinity;
        let x = this.x;
        let y = this.y;

        const empty = [];

        // Loop to find the cell to move to
        for (var i = -1; i < 2; i++) {
            const newX = this.normalize(this.x + i, PARAMETERS.dimension);
            for (var j = -1; j < 2; j++) {
                const newY = this.normalize(this.y + j, PARAMETERS.dimension);
                const plant = this.automata.plants[newX][newY];
                
                // If the cell is empty, add it to the empty array
                if (!plant) {
                    empty.push({ x: newX, y: newY });
                }

                const diff = Math.abs(this.hue - (plant ? plant.hue : Infinity));
                
                // Update best cell to move to
                if (diff < best) {
                    best = diff;
                    x = newX;
                    y = newY;
                }
            }
        }

        // Update x and y coordinates
        this.x = x;
        this.y = y;
    }

    // Method to calculate hue difference
    hueDifference(plant) {
        let diff = plant ? Math.abs(this.hue - plant.hue) : 180;
        if (diff > 180) 
            diff = 360 - diff; // now diff is between 0-180 and wraps 
        return (90 - diff) / 90;
    }

    // Method for animat to eat plants
    eat() {
        const growthrate = parseInt(document.getElementById("animatgrowth").value);
        const selectivity = parseInt(document.getElementById("animatselection").value);
        const plant = this.automata.plants[this.x][this.y];
        const diff = this.hueDifference(plant);
    
        // If a plant exists at the current location and meets selectivity criteria, consume it
        if (plant && diff >= selectivity) {
            this.automata.plants[this.x][this.y] = null;
            this.energy += 80 / growthrate * diff;
        }
    }

    // Method for animat to reproduce
    reproduce() {
        // If energy is greater than 80, reduce energy and create a new animat
        if (this.energy > 80) {
            this.energy -= 80;
            gameEngine.addEntity(new Animat(this.mutate(), this.automata));
        }
    }

    // Method for animat to die
    die() {
        this.removeFromWorld = true;
    }

    // Method to mutate the animat
    mutate() {
        // Calculating new x and y coordinates within a range of -1 to +1 from the current position
        const newX = this.normalize(this.x - 1 + randomInt(3), PARAMETERS.dimension);
        const newY = this.normalize(this.y - 1 + randomInt(3), PARAMETERS.dimension);
        // Calculating new hue within a range of -10 to +10 from the current hue
        const hue = this.normalize(this.hue - 10 + randomInt(21), 360);
        // Returning the mutated animat data
        return { hue: hue, x: newX, y: newY };
    }

    // Method to update the animat's state
    update() {
        this.move();
        this.eat();
        this.reproduce();
        // If energy is less than 1 or with a small probability, animat dies
        if (this.energy < 1 || Math.random() < 0.01) 
            this.die();
    }

    // Method to draw the animat on the canvas
    draw(ctx) {
        ctx.fillStyle = hsl(this.hue, 75, 50);
        ctx.strokeStyle = "light gray";
        ctx.beginPath();
        ctx.arc((this.x + 1 / 2) * PARAMETERS.size, (this.y + 1 / 2) * PARAMETERS.size, PARAMETERS.size / 2 - 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
};


