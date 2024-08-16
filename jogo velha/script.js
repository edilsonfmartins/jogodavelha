// script.js
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
const statusElement = document.getElementById('status');

function makeMove(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    
    if (!gameBoard[index] && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        
        if (checkWinner()) {
            statusElement.innerText = `Jogador ${currentPlayer} venceu!`;
        } else if (gameBoard.every(cell => cell)) {
            statusElement.innerText = 'Empate!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.innerText = `Jogador ${currentPlayer}, sua vez!`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas verticais
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    gameBoard.fill(null);
    Array.from(document.querySelectorAll('.cell')).forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    statusElement.innerText = 'Jogador X, sua vez!';
}
