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
var currentBoard;
var inputTable = document.getElementById("input-table");
window.onload = function () {
    board = localStorage.getItem("boardHTML");
    boardDataString = localStorage.getItem("boardsData").substring(Number(localStorage.getItem("boardNum")) * 81, (Number(localStorage.getItem("boardNum")) + 1) * 81);
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            boardData[row][col] = Number(boardDataString[row * 9 + col]);
        }
    }
    currentBoard = JSON.parse(JSON.stringify(boardData));
    solvedBoard = solve(boardData);
    board = board.replace(/([0-9])([0-9])(.)>&nbsp;/g, "$1$2$3><input type='text' maxlength='2' class='inputs' onInput='testIfSolved(this, $1, $2)'> </input>");
    document.getElementById("board").innerHTML = board;
};
function testIfSolved(input, r, c) {
    if (input.value.length === 2) {
        if ((!isNaN(input.value[1])) && input.value[1] !== "0")
            input.value = input.value[1];
        else
            input.value = input.value[0];
    }
    var num = +input.value;
    if (isNaN(input.value) || input.value === "0") {
        input.value = "";
    }
    currentBoard[Number(r)][Number(c)] = num;
    if (JSON.stringify(solvedBoard) === JSON.stringify(currentBoard)) {
        alert("You won!");
    }
}
//# sourceMappingURL=BoardSolving.js.map