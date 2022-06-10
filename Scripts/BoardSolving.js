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
var originalBoard = __spreadArray([], Array(9), true).map(function (e) { return Array(9); });
var solvedBoard = __spreadArray([], Array(9), true).map(function (e) { return Array(9); });
var currentBoard;
var inputTable = document.getElementById("input-table");
var previusIlegals = [];
var ilegals = [];
window.onload = function () {
    board = localStorage.getItem("boardHTML");
    document.getElementById("HiddenField").value = JSON.parse(JSON.stringify(board));
    board = board.replace(' onclick="boardClick(' + localStorage.getItem("boardNum") + ')"', "");
    boardDataString = localStorage.getItem("boardsData").substring(Number(localStorage.getItem("boardNum")) * 81, (Number(localStorage.getItem("boardNum")) + 1) * 81);
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            originalBoard[row][col] = Number(boardDataString[row * 9 + col]);
        }
    }
    currentBoard = JSON.parse(JSON.stringify(originalBoard));
    solvedBoard = solve(originalBoard);
    board = board.replace(/id=(.)([0-9])([0-9])(.)>&nbsp;/g, "><input type='text' id='$2$3' maxlength='2' class='safe' onInput='testIfSolved(this,$2,$3)'> </input>");
    document.getElementById("board").innerHTML = JSON.parse(JSON.stringify(board));
};
function testIfSolved(input, r, c) {
    if (input.value.length === 2) {
        if ((!isNaN(input.value[1])) && input.value[1] !== "0") {
            input.value = input.value[1];
        }
        else {
            input.value = input.value[0];
        }
    }
    var num = Number(input.value);
    if (isNaN(input.value) || input.value === "0") {
        input.value = "";
    }
    else {
        currentBoard[Number(r)][Number(c)] = num;
        refreshBoard();
    }
    if (JSON.stringify(solvedBoard) === JSON.stringify(currentBoard)) {
        alert("ניצחת!");
    }
    function refreshBoard() {
        var tempIlegals;
        if (previusIlegals.length === 0) {
            previusIlegals.push(r + "" + c);
        }
        for (var i = 0; i < previusIlegals.length; i++) {
            if (ilegals.indexOf(previusIlegals[i]) === -1) {
                tempIlegals = getIlegals(Number(previusIlegals[i][0]), Number(previusIlegals[i][1]), currentBoard[Number(previusIlegals[i][0])][Number(previusIlegals[i][1])], currentBoard, false);
                if (tempIlegals.length > 0) {
                    for (var j = 0; j < tempIlegals.length; j++) {
                        if (ilegals.indexOf(tempIlegals[j]) === -1) {
                            ilegals.push(tempIlegals[j]);
                        }
                    }
                }
                else {
                    if (currentBoard[previusIlegals[i][0]][previusIlegals[i][1]] === originalBoard[previusIlegals[i][0]][previusIlegals[i][1]]) {
                        document.getElementById(previusIlegals[i]).className = "origin";
                    }
                    else {
                        document.getElementById(previusIlegals[i]).className = "safe";
                    }
                }
            }
        }
        for (var i = 0; i < ilegals.length; i++) {
            document.getElementById(ilegals[i]).className = "unsafe";
        }
        previusIlegals = JSON.parse(JSON.stringify(ilegals));
        ilegals = [];
    }
}
//# sourceMappingURL=BoardSolving.js.map