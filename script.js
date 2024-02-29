const gameBoard = (function () {
    
    let board = Array(9).fill("");

    const getBoard = () => {
        return board;
    };

    const makeMove = (currentplayer, position) => {
        if (!board[position]) {
            board[position] = currentplayer.getSymbol();
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = Array(9).fill("");
    };

    return {getBoard, makeMove, resetBoard};
    
})();

const createPlayer = function(playerName, symbol) {
    const getPlayerName = () => playerName;
    const getSymbol = () => symbol;
    return {getPlayerName, getSymbol};
};

playerX = createPlayer("player1", "X");
playerO = createPlayer("player2", "O");

const playGame = (function() {

    let continuePlaying = true;
    let currentplayer = playerX;
    
    const checkWinner = function() {
        
        const board = gameBoard.getBoard();

        const winnerCombs = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (comb of winnerCombs) {
            const [a, b, c] = comb;
            if (board[a] && board[a] == board[b] && board[a] == board[c]) {
                domManagement.winColor(board[a]);
                return board[a]; // o retornar el nombre
            }
        };

        if (!board.includes("")) {
            domManagement.winColor("Tie");
            return "Tie";
        };

        return false;
    };

    const switchPlayer = function() {
        currentplayer == playerX ? currentplayer = playerO : currentplayer = playerX;
        return currentplayer;
    };

    const checkPlaying = function() {
        if (checkWinner()) {
            continuePlaying = false;
        };
        return continuePlaying;
    };

    const playMove = function(position) {
        if (gameBoard.makeMove(currentplayer, position)) {
            domManagement.activeTurn(currentplayer);
            switchPlayer();
        } 
    }

    const resetGame = function() {
        gameBoard.resetBoard();
        continuePlaying = true;
        currentplayer = playerX;
    };

    return {playMove, checkPlaying, resetGame, checkWinner, currentplayer};

})();

const domManagement = (function() {
    
    const restart = document.querySelector(".restart");
    const cells = document.querySelectorAll(".cell");
    const turns = document.querySelectorAll(".turn");
    const results = document.querySelectorAll(".result");
    
    const renderBoard = function() {
        
        const board = gameBoard.getBoard(); 
        cells.forEach((cell, index) => cell.textContent = board[index]);
    };

    const myEvents = function() {
        
        cells.forEach((cell, index) => cell.addEventListener("click", () => {
            if (playGame.checkPlaying()) {
                cell.textContent = playGame.playMove(index);
                renderBoard();
                if (playGame.checkWinner()) showResult();
            } 
        }));
        
        restart.addEventListener("click", () => {
            results.forEach((result) => result.textContent = "");
            activeTurn(playerO);
            playGame.resetGame();
            renderBoard();
        });


    };
    
    const activeTurn = function(currentplayer) {
        turns.forEach((turn) => {
            if (!turn.classList.contains(currentplayer.getSymbol())) turn.classList.add("active");
            else turn.classList.remove("active");
        })
    };

    const winColor = function(symbol) {
        turns.forEach((turn) => {
            if (turn.classList.contains(symbol)) {
                turn.classList.add("active");
            } else {
                turn.classList.remove("active");
            }
        })
    }

    const showResult = function() {
        results.forEach((result) => {
            if (result.classList.contains(playGame.checkWinner())) {
                if (playGame.checkWinner() == "Tie") result.textContent = "It's a Tie!";
                else if (playGame.checkWinner()) result.textContent = `Win!`;
            }
        })



    }

    myEvents();

    return {activeTurn, winColor}

})();