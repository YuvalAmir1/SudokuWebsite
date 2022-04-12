var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var board, boardDataString;
var boardData = __spreadArray([], Array(9), true).map(function (e) { return Array(9); });
var solvedBoard = __spreadArray([], Array(9), true).map(function (e) { return Array(9); });
var currentBoard = __spreadArray([], Array(9), true).map(function (e) { return Array(9); });
var inputTable = document.getElementById("input-table");
window.onload = function () {
    board = localStorage.getItem("boardHTML");
    boardDataString = localStorage.getItem("boardsData").substring(Number(localStorage.getItem("boardNum")) * 81, (Number(localStorage.getItem("boardNum")) + 1) * 81);
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            boardData[row][col] = Number(boardDataString[row * 9 + col]);
        }
    }
    currentBoard = boardData;
    solvedBoard = solve(boardData);
    board = board.replace(/&nbsp;/g, "<input type='text' maxlength='1' class='inputs' onInput='testIfSolved(this)'> </input>");
    document.getElementById("board").innerHTML = board;
};
function testIfSolved(input) {
    if (isNaN(input.value) || input.value === "0") {
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
//# sourceMappingURL=BoardSolving.js.map