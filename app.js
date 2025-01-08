const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const frog = document.querySelector('.frog');
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');  // Add a score display element

let currentIndex = 76;  // Position of the frog
const width = 9;
let timerId;
let currentTime = 20;
let score = 0;  // Initialize score to 0

// Positions of logs and cars
const carPositions = [18, 20, 22, 24, 26, 28];  // Example positions for cars
const logPositions = [9, 17, 25, 33, 41];  // Example positions for logs

function moveFrog(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex--;
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex++;
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width;
            break;
    }
    updateFrogPosition();
    updateScore();
}

function updateFrogPosition() {
    frog.style.gridRow = Math.floor(currentIndex / width) + 1;
    frog.style.gridColumn = currentIndex % width + 1;
}

function autoMoveElements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    if (currentTime <= 0) {
        resultDisplay.textContent = 'You Lose! Time Up!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
    }
}

function checkCollisions() {
    // Check if frog hits a car
    if (carPositions.includes(currentIndex)) {
        resultDisplay.textContent = 'You Lose! Hit a car!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        return;
    }

    // Check if frog is in the water (log positions)
    if (logPositions.includes(currentIndex)) {
        // If frog is on a log, no reset; frog can ride the log
        // Optional: You can move the frog along the log here if needed.
    } else if (currentIndex < 9) {
        // If frog is in the first row (water), reset game
        resultDisplay.textContent = 'You Lose! Fell in the water!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
    }
}

function checkWin() {
    if (currentIndex === 1) { // If the frog reaches the ending block
        resultDisplay.textContent = 'You Win!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
    }
}

function updateScore() {
    // Increase score as the frog successfully moves
    // You can modify this logic depending on how you want to score the frog
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
    } else {
        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(() => {
            checkCollisions();
            checkWin();
        }, 50);
        document.addEventListener('keydown', moveFrog);
    }
});
