let board: string, boardDataString: string;
let boardData = [...Array(9)].map(e => Array(9));
let solvedBoard = [...Array(9)].map(e => Array(9));
let currentBoard = [...Array(9)].map(e => Array(9));
let inputTable = document.getElementById("input-table");

window.onload = function () {
    board = localStorage.getItem("boardHTML");
    boardDataString = localStorage.getItem("boardsData").substring(Number(localStorage.getItem("boardNum")) * 81, (Number(localStorage.getItem("boardNum")) + 1) * 81);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            boardData[row][col] = Number(boardDataString[row * 9 + col]);
        }
    }
    currentBoard = boardData;
    solvedBoard = solve(boardData);
    board = board.replace(/&nbsp;/g, "<input type='text' maxlength='1' class='inputs' onInput='testIfSolved(this)'> </input>");
    document.getElementById("board").innerHTML = board;
};

function testIfSolved(input: HTMLInputElement): void {
    if (isNaN(input.value as any) || input.value === "0") {
        input.value = "";
    }
    else {
        console.log(input.value);
        currentBoard[Number(input.id[0])][Number(input.id[3])] = Number(input.value);
        console.log(currentBoard);
        console.log(solvedBoard);
        if (solvedBoard === currentBoard) {
            alert("You won!");
        }
    }
}