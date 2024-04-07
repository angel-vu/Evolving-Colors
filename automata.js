class Automata {
    constructor(game) {
        Object.assign(this, { game });

        this.game = game;
        this.automata = [];
        this.height = 100;
        this.width = 200;

        this.tickCount = 0;
        this.ticks = 0;

        this.speed = parseInt(document.getElementById("speed").value, 10);

        // Initialize automata grid
        for (let col = 0; col < this.width; col++) {
            this.automata.push([]);
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = 0;
            }
        }
        // Load random initial configuration
        this.loadRandomAutomata();
    };

    // Load random initial configuration for the automata
    loadRandomAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = randomInt(2); // Assign random state (0 or 1) to each cell
            }
        }
    };

    // Block pattern 
    addBlock(col, row) {
        this.automata[col][row] = 1;
        this.automata[col + 1][row] = 1;
        this.automata[col][row + 1] = 1;
        this.automata[col + 1][row + 1] = 1;
    };

    // Hive pattern 
    addHive(col, row, vert) {
        // Vertical hive
        if (vert) {
            this.automata[col][row] = 1;
            this.automata[col + 1][row + 1] = 1;
            this.automata[col - 1][row + 1] = 1;
            this.automata[col + 1][row + 2] = 1;
            this.automata[col - 1][row + 2] = 1;
            this.automata[col][row + 3] = 1;
        } else {
            // Horizontal hive
            this.automata[col][row] = 1;
            this.automata[col + 1][row + 1] = 1;
            this.automata[col + 1][row - 1] = 1;
            this.automata[col + 2][row + 1] = 1;
            this.automata[col + 2][row - 1] = 1;
            this.automata[col + 3][row] = 1;
        }
    };

    // Blinker pattern 
    addBlinker(col, row, vert) {
        // Vertical blinker
        if (vert) {
            this.automata[col][row] = 1;
            this.automata[col][row + 1] = 1;
            this.automata[col][row + 2] = 1;
        } else {
            // Horizontal blinker
            this.automata[col][row] = 1;
            this.automata[col + 1][row] = 1;
            this.automata[col + 2][row] = 1;
        }
    };

    // Gosper gun pattern
    addGosper(col, row) {
        // Adds initial block
        this.addBlock(col, row);
        this.addBlinker(col + 10, row, true);
        this.automata[col + 11][row - 1] = 1;
        this.automata[col + 11][row + 3] = 1;
        this.automata[col + 12][row - 2] = 1;
        this.automata[col + 12][row + 4] = 1;
        this.automata[col + 13][row - 2] = 1;
        this.automata[col + 13][row + 4] = 1;
        this.automata[col + 14][row + 1] = 1;
        this.automata[col + 15][row - 1] = 1;
        this.automata[col + 15][row + 3] = 1;
        this.addBlinker(col + 16, row, true);
        this.automata[col + 17][row + 1] = 1;
        this.addBlinker(col + 20, row - 2, true);
        this.addBlinker(col + 21, row - 2, true);
        this.automata[col + 22][row - 3] = 1;
        this.automata[col + 22][row + 1] = 1;
        this.automata[col + 24][row - 3] = 1;
        this.automata[col + 24][row + 1] = 1;
        this.automata[col + 24][row - 4] = 1;
        this.automata[col + 24][row + 2] = 1;
        this.addBlock(col + 34, row - 2);
    };

    // Glider pattern
    addGlider(col, row) {
        this.automata[col][row] = 1;
        this.automata[col + 1][row + 1] = 1;
        this.automata[col + 2][row + 1] = 1;
        this.automata[col + 2][row] = 1;
        this.automata[col + 2][row - 1] = 1;
    };
    
    // Spaceship pattern
    addSpaceship(col, row) {
        this.automata[col][row] = 1;
        this.automata[col + 1][row] = 1;
        this.automata[col + 2][row] = 1;
        this.automata[col + 3][row] = 1;
        this.automata[col + 4][row] = 1;
        this.automata[col + 4][row + 1] = 1;
        this.automata[col][row + 2] = 1;
        this.automata[col + 4][row + 2] = 1;
        this.automata[col + 1][row + 3] = 1;
        this.automata[col + 3][row + 3] = 1;
    };

    // Queen bee shuttle pattern
    addQueenBeeShuttle(col, row) {
        this.automata[col][row] = 1;
        this.automata[col][row + 1] = 1;
        this.automata[col][row + 2] = 1;
        this.automata[col][row + 3] = 1;
        this.automata[col + 1][row] = 1;
        this.automata[col + 2][row + 1] = 1;
        this.automata[col + 2][row + 3] = 1;
        this.automata[col + 3][row + 1] = 1;
        this.automata[col + 4][row + 2] = 1;
    };    
    
    loadAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = 0;
            }
        }

        // Still lifes
        this.addBlock(10, 10);
        this.addHive(14, 11, false);
        this.addHive(21, 10, true);
        // Oscillators
        this.addBlinker(30, 11);
        // Guns
        this.addGosper(10, 50);
        // Spaceships
        this.addGlider(20, 15);
        this.addSpaceship(30, 20);
        this.addQueenBeeShuttle(25, 15);
    };

    // Count the number of live neighbors for a cell
    count(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) count++;
            }
        }
        return count;
    };    

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);
        
        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.tickCount = 0; // Reset tick count
            this.ticks++; // Increment total tick count
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;
            // Create a new array to holf the next state 
            let next = [];
            for (let col = 0; col < this.width; col++) {
                next.push([]);
                for (let row = 0; row < this.height; row++) {
                    next[col].push(0); // Initialize each cell in the next state to dead
                }
            }
            // RUles of the game to each cell for the next state
            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    if (this.automata[col][row] && (this.count(col, row) === 2 || this.count(col, row) === 3)) next[col][row] = 1; // Cell survives
                    if (!this.automata[col][row] && this.count(col, row) === 3) next[col][row] = 1; // Cell is born
                }
            }
            this.automata = next; // Update the automata grid to the next state
        }
    };

    draw(ctx) {
        let size = 8; 
        let gap = 1;
        ctx.fillStyle = "Purple";
        // Draw each cell of the automata 
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row]; // Get the state of the current cell
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap); // If the cell is alive, fill it with the color
            }
        }
    };

};
