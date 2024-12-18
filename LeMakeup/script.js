const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 10;
const GRID_WIDTH = 80;
const GRID_HEIGHT = 60;

canvas.width = GRID_WIDTH * CELL_SIZE;
canvas.height = GRID_HEIGHT * CELL_SIZE;

let grid = createGrid();
let isRunning = false;

document.getElementById('startButton').addEventListener('click', () => isRunning = true);
document.getElementById('pauseButton').addEventListener('click', () => isRunning = false);
document.getElementById('resetButton').addEventListener('click', () => {
    isRunning = false;
    grid = createGrid();
    drawGrid();
});

function createGrid () {
    const grid = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            row.push(Math.random() > 0.8 ? 1 : 0); // 20% de cellules vivantes au départ
        }
        grid.push(row);
    }
    return grid;
}

function drawGrid () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (grid[y][x] === 1) {
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function getNextGeneration (grid) {
    const newGrid = createGrid();
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const neighbors = countNeighbors(grid, x, y);
            const cell = grid[y][x];

            if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                newGrid[y][x] = 1; // Survie
            } else if (cell === 0 && neighbors === 3) {
                newGrid[y][x] = 1; // Naissance
            } else {
                newGrid[y][x] = 0; // Mort
            }
        }
    }
    return newGrid;
}

function countNeighbors (grid, x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const newX = (x + dx + GRID_WIDTH) % GRID_WIDTH;
            const newY = (y + dy + GRID_HEIGHT) % GRID_HEIGHT;
            count += grid[newY][newX];
        }
    }
    return count;
}

function gameLoop () {
    if (isRunning) {
        grid = getNextGeneration(grid);
    }
    drawGrid();
    requestAnimationFrame(gameLoop);
}

drawGrid();
gameLoop();
