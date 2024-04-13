class Plant {
    // Constructor for Plant class
    constructor(data, automata) {
        // Assigning the automata instance to the plant
        this.automata = automata;
        // Extracting hue, x, y values from the data object
        this.hue = data.hue;
        this.x = data.x;
        this.y = data.y;
        // Initializing growth to 0
        this.growth = 0;
    }	

    // Method to normalize a value within a range
    normalize(value, max) { 
        return (value + max) % max; 
    }

    // Method to mutate the plant
    mutate() {
        // Calculating new x and y coordinates within a range of -1 to +1 from the current position
        const newX = this.normalize(this.x - 1 + randomInt(3), PARAMETERS.dimension);
        const newY = this.normalize(this.y - 1 + randomInt(3), PARAMETERS.dimension);
        // Calculating new hue within a range of -10 to +10 from the current hue
        const hue = this.normalize(this.hue - 10 + randomInt(21), 360);
        // Returning the mutated plant data
        return { hue: hue, x: newX, y: newY };
    }

    // Method to update the plant's growth and create new plants
    update() {
        // Getting growth rate from user input
        const growthrate = parseInt(document.getElementById("plantgrowth").value);

        // Increasing growth if it's less than 80
        if (this.growth < 80) 
            this.growth += 80 / growthrate;
        
        // If growth reaches 80, mutate and create new plant
        if (this.growth >= 80) {
            const other = this.mutate();
            // Check if the target cell is empty, if yes, create a new plant there
            if (!this.automata.plants[other.x][other.y]) {
                this.automata.plants[other.x][other.y] = new Plant(other, this.automata);
                // Reduce growth by 80
                this.growth -= 80;
            } 
        }
    }

    // Method to draw the plant on the canvas
    draw(ctx) {
        ctx.fillStyle = hsl(this.hue, 20 + this.growth, 50);
        ctx.strokeStyle = "dark gray";
        ctx.fillRect(this.x * PARAMETERS.size, this.y * PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
        ctx.strokeRect(this.x * PARAMETERS.size, this.y * PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
    }
};


