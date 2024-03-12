const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages = {
    english: {
        welcome: "Welcome to Tic-Tac-Toe!",
        chooseLanguage: "Choose a language 1: English, 2: French:",
        chooseMode: "Choose your game mode (1: Play hot seat, 2: against A.I.):",
        chooseMarker: "Choose your marker (O/X):",
        turn: "Choose a position (0-8):",
        invalidMove: "Invalid move, please try again.",
        win: player => `${player} wins!`,
        draw: "It's a draw!",
        playAgain: "Play again? (yes/no):",
    },
    french: {
        welcome: "Bienvenue au Tic-Tac-Toe!",
        chooseLanguage: "Choisissez une langue 1: Anglais, 2: Français:",
        chooseMode: "Choisissez votre mode de jeu (1: Jouer en hot seat, 2: contre l'IA):",
        chooseMarker: "Choisissez votre marqueur (O/X):",
        turn: "Choisissez une position (0-8):",
        invalidMove: "Mouvement invalide, veuillez réessayer.",
        win: player => `${player} gagne!`,
        draw: "C'est un match nul!",
        playAgain: "Jouer à nouveau ? (oui/non):",
    }
};

let currentLang = 'english';
let gameMode, currentPlayer, aiPlayer, board;


function initGame() {
    console.log(messages[currentLang].welcome);
    rl.question(messages[currentLang].chooseLanguage, lang => {
        currentLang = lang === '2' ? 'french' : 'english';
        setupGame();
    });
}

function setupGame() {
    rl.question(messages[currentLang].chooseMode, mode => {
        gameMode = mode === '2' ? 'AI' : 'Hot Seat';
        rl.question(messages[currentLang].chooseMarker, marker => {
            currentPlayer = marker.toUpperCase() === 'O' ? 'O' : 'X';
            aiPlayer = currentPlayer === 'X' ? 'O' : 'X';
            board = Array(9).fill(null);
            printBoard();
            if (gameMode === 'AI') {
                playerTurn();
            }
        });
    });
}

function printBoard() {
    console.log('\n' + board.slice(0, 3).join(' | ') + '\n---------\n' +
                board.slice(3, 6).join(' | ') + '\n---------\n' +
                board.slice(6).join(' | ') + '\n');
}
function playerTurn() {
    rl.question(messages[currentLang].turn, position => {
        const pos = parseInt(position);
        if (isValidMove(pos)) {
            board[pos] = currentPlayer;
            printBoard();
            if (checkWin(currentPlayer)) {
                console.log(messages[currentLang].win(currentPlayer));
                askPlayAgain();
            } else if (checkDraw()) {
                console.log(messages[currentLang].draw);
                askPlayAgain();
            } else {
                if (gameMode === 'AI') {
                    aiMove();
                }
            }
        } else {
            console.log(messages[currentLang].invalidMove);
            playerTurn();
        }
    });
}

// AI move logic
function findBestMoveForAI() {
    let move = findWinningMove(aiPlayer);
    if (move !== -1) return move;

    move = findWinningMove(currentPlayer);
    if (move !== -1) return move;

    if (board[4] === null) return 4;

    move = findEmptyCorner();
    if (move !== -1) return move;

    return board.findIndex(spot => spot === null);
}

function aiMove() {
    console.log("AI is thinking...");
    const move = findBestMoveForAI();
    board[move] = aiPlayer;
    console.log(`AI chooses position ${move}`);
    printBoard();
    if (checkWin(aiPlayer)) {
        console.log(messages[currentLang].win(aiPlayer));
        askPlayAgain();
    } else if (checkDraw()) {
        console.log(messages[currentLang].draw);
        askPlayAgain();
    } else {
        playerTurn();
    }
}

function findWinningMove(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let condition of winConditions) {
        const positions = condition.map(index => board[index]);
        if (positions.filter(val => val === player).length === 2 && positions.includes(null)) {
            return condition[positions.indexOf(null)];
        }
    }
    return -1;
}

function findEmptyCorner() {
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (board[corner] === null) return corner;
    }
    return -1;
}

function isValidMove(position) {
    return position >= 0 && position < board.length && board[position] === null;
}



function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    return winConditions.some(condition => condition.every(index => board[index] === player));
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function askPlayAgain() {
    rl.question(messages[currentLang].playAgain, answer => {
        if (answer.toLowerCase() === 'yes' || (currentLang === 'french' && answer.toLowerCase() === 'oui')) {
            initGame();
        } else {
            console.log("Thank you for playing!");
            rl.close();
        }
    });
}

initGame();