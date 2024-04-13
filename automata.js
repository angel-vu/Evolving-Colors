class Automata {
    // Constructor for Automata class
    constructor() {
        // Initialize the plants array
        this.plants = [];
        // Loop to create a 2D array of null values
        for (var i = 0; i < PARAMETERS.dimension; i++) {
            this.plants.push([]);
            for (var j = 0; j < PARAMETERS.dimension; j++) {
                this.plants[i].push(null);
            }
        }
    }

    // Method to clear all plants from the automata
    clearPlants() {
        // Loop to set all elements of the plants array to null
        for (var i = 0; i < PARAMETERS.dimension; i++) {
            for (var j = 0; j < PARAMETERS.dimension; j++) {
                this.plants[i][j] = null;
            }
        }
    }

    // Method to add a new plant to a random location in the automata
    addPlant() {
        // Generate random coordinates within the dimension
        const i = randomInt(PARAMETERS.dimension);
        const j = randomInt(PARAMETERS.dimension);
        // Create a new Plant instance at the random location with a random hue
        this.plants[i][j] = new Plant({ hue: randomInt(360), x: i, y: j }, this);
    }

    // Method to update all plants in the automata
    update() {
        // Loop through all elements in the plants array
        for (var i = 0; i < PARAMETERS.dimension; i++) {
            for (var j = 0; j < PARAMETERS.dimension; j++) {
                // Update the plant if it exists, and with a small probability, remove it
                this.plants[i][j]?.update();
                if (Math.random() < 0.001) this.plants[i][j] = null;
            }
        }
    }

    // Method to draw all plants in the automata
    draw(ctx) {
        // Loop through all elements in the plants array and draw each plant
        for (var i = 0; i < PARAMETERS.dimension; i++) {
            for (var j = 0; j < PARAMETERS.dimension; j++) {
                this.plants[i][j]?.draw(ctx);
            }
        }
    }
};




