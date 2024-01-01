let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        checkWinner();
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            gameActive = false;
            resultDisplay.innerText = `${currentPlayer} wins!`;
            highlightWinningCells(pattern);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        resultDisplay.innerText = 'It\'s a tie!';
    }
}

function highlightWinningCells(pattern) {
    for (const index of pattern) {
        cells[index].style.backgroundColor = '#7CFC00'; // Light green color for winning cells
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDisplay.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#ddd'; // Reset cell background color
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});
