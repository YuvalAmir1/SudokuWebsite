﻿let board: string, boardDataString: string;
let boardData = [...Array(9)].map(e => Array(9));
let solvedBoard = [...Array(9)].map(e => Array(9));
let currentBoard: number[][];
let inputTable = document.getElementById("input-table");

window.onload = function () {
    board = localStorage.getItem("boardHTML");
    boardDataString = localStorage.getItem("boardsData").substring(Number(localStorage.getItem("boardNum")) * 81, (Number(localStorage.getItem("boardNum")) + 1) * 81);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            boardData[row][col] = Number(boardDataString[row * 9 + col]);
        }
    }
    
    currentBoard = JSON.parse(JSON.stringify(boardData));
    solvedBoard = solve(boardData);
    board = board.replace(/([0-9])([0-9])(.)>&nbsp;/g, "$1$2$3><input type='text' maxlength='2' class='inputs' onInput='testIfSolved(this, $1, $2)'> </input>");
    document.getElementById("board").innerHTML = board;
};

function testIfSolved(input: HTMLInputElement, r: string, c: string): void {
    if (input.value.length === 2) {
        if ((!isNaN(input.value[1] as any)) && input.value[1] !== "0")
            input.value = input.value[1];
        else
            input.value = input.value[0];
    }

    let num: number = +input.value;
    
    if (isNaN(input.value as any) || input.value === "0") {
        input.value = "";
    }
    
    currentBoard[Number(r)][Number(c)] = num;
    
    if (JSON.stringify(solvedBoard) === JSON.stringify(currentBoard)) {
        alert("You won!");
    }
}