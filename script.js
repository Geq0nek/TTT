const boardCells = [...document.querySelectorAll('.cell')];
const popup = document.getElementById("popup");
const h2WinningSection = document.getElementsByTagName("h2")[0];
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"
let gameActive = true;
let turnCount = 0;
let whoWon;

boardCells.forEach(cell => {    
    cell.addEventListener('click', () => {
        //console.log(cell.dataset.cellIndex);

        if(cell.innerHTML == "" && currentPlayer == "X"){   
            cell.innerHTML = "X";
            gameState[cell.dataset.cellIndex] = "X";
            currentPlayer = "O";
        }

        if(cell.innerHTML == "" && currentPlayer == "O"){
            cell.innerHTML = "O";
            gameState[cell.dataset.cellIndex] = "O";
            currentPlayer = "X";
        }

        turnCount++;
        checkForWinner();
        checkForDraw();

        if(!gameActive){
            if(whoWon === "X" || whoWon === "O"){
                h2WinningSection.innerHTML = "The winner is " + whoWon + "!";
            }
            if(whoWon === "Draw"){
                h2WinningSection.innerHTML = "Draw!";
            }

            popup.style.display = "flex";
        }
    })
});

function checkForWinner(){
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningPositions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') 
            continue;
        
        if (a === b && b === c) {
            gameActive = false;
            whoWon = gameState[winCondition[0]];
            break;
        }
    }
}
    

function checkForDraw(){
    if(turnCount == 9 && gameActive == true){
        gameActive = false;
        whoWon = "Draw";
    }
}

function restart(){
    window.location.reload();
}