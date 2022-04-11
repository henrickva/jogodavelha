const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector ("[data-winning-message]");
const restartButton = document.querySelector ("[data-restart-button]")
let isCircleTurn;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const startGame = () =>{
    for (const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click",handleClick);
        cell.addEventListener ("click", handleClick, { once: true});
    }

    isCircleTurn = false;

    board.classList.add("x");

    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isdraw) => {
    if (isdraw) {
        winningMessageTextElement.innerText = "Empate";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "0 Venceu " : "X venceu";
    }

    winningMessage.classList.add("show-winning-message");
};


const checkForWin = (currentPlayer) =>{
    return winningCombinations.some( (combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () =>{
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swapTurns = () =>{
    isCircleTurn = !isCircleTurn

    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn){
        board.classList.add("circle");
        } else {
        board.classList.add("x");
        
    };
};

const handleClick = (e) => {
    //Colocar marca (x ou circulo)//
    const cell= e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    cell.classList.add(classToAdd);

    placeMark (cell, classToAdd);

    //Checar por vitoria//
    const isWin = checkForWin(classToAdd);
        if (isWin) {
            endGame (false);
        };
    //Verificar por empate//
    const isdraw = checkForDraw ();

    if (isWin){
        endGame (false);
    } else if (isdraw) {
        endGame (true);
    } else {
        swapTurns();
    }
    //Mudar simbolo//;
   
}

for(const cell of cellElements){
    cell.addEventListener("click", handleClick, {once: true});
};

startGame();

restartButton.addEventListener("click", startGame);
