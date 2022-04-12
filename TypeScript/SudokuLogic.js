// generates a random sudoku board
function generateBoard() {
    var board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    // randomly fill the board with numbers
    fillDiagonals();
    fillBoard(0, 0);
    var emptySquaresCount = 0;
    var positions = getPositions();
    removeUntilListEmpty();
    return [board, emptySquaresCount];
    function fillDiagonals() {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function () { return Math.random() - 0.5; });
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                board[r][c] = numbers.pop();
            }
        }
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function () { return Math.random() - 0.5; });
        for (var r = 3; r < 6; r++) {
            for (var c = 3; c < 6; c++) {
                board[r][c] = numbers.pop();
            }
        }
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function () { return Math.random() - 0.5; });
        for (var r = 6; r < 9; r++) {
            for (var c = 6; c < 9; c++) {
                board[r][c] = numbers.pop();
            }
        }
    }
    function fillBoard(r, c) {
        // if the board is full, return
        if (r === 9) {
            return true;
        }
        // if the current cell is empty, skip it
        if (board[r][c] !== 0) {
            return solveNext();
        }
        else {
            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function () { return Math.random() - 0.5; });
            for (var i = 0; i < 9; i++) {
                if (isSafe(r, c, numbers[i], board)) {
                    board[r][c] = numbers[i];
                    if (!solveNext()) {
                        board[r][c] = 0;
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        }
        function solveNext() {
            if (r !== 9) {
                if (c !== 8) {
                    return fillBoard(r, c + 1);
                }
                else {
                    return fillBoard(r + 1, 0);
                }
            }
            else {
                return true;
            }
        }
    }
    function getPositions() {
        return [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
            [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
            [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
            [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
            [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
            [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
            [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
            [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]].sort(function () { return Math.random() - 0.5; });
        ;
    }
    function removeUntilListEmpty() {
        var position;
        var lastValue;
        while (positions.length > 0) {
            position = positions.pop();
            lastValue = board[position[0]][position[1]];
            board[position[0]][position[1]] = 0;
            if (solve(board) === null) {
                board[position[0]][position[1]] = lastValue;
            }
            else {
                emptySquaresCount++;
            }
        }
    }
}
// takes an incomplete sudoku board and returns a solved board
// returns null if the board is either not unique or has more than one solution
function solve(originalBoard) {
    var testBoard = JSON.parse(JSON.stringify(originalBoard));
    var outputBoard;
    var count = 0;
    solveRecursively(0, 0);
    if (count !== 1) {
        return null;
    }
    return outputBoard;
    ;
    // recursively solves the sudoku board
    function solveRecursively(r, c) {
        if (r === 9) {
            count++;
            if (count === 1) {
                outputBoard = JSON.parse(JSON.stringify(testBoard));
            }
        }
        if (r === 9 || count >= 2) {
            return;
        }
        // if the current cell is empty, skip it
        if (testBoard[r][c] !== 0) {
            solveNext();
        }
        else {
            for (var i = 1; i <= 9; i++) {
                if (isSafe(r, c, i, testBoard)) {
                    testBoard[r][c] = i;
                    solveNext();
                    testBoard[r][c] = 0;
                }
            }
        }
        function solveNext() {
            if (r !== 9) {
                if (c !== 8) {
                    solveRecursively(r, c + 1);
                }
                else {
                    solveRecursively(r + 1, 0);
                }
            }
        }
    }
}
// checks if it's safe to place a number in a cell
function isSafe(r, c, num, board) {
    return !isInColumn() && !isInRow() && !isInBox();
    function isInColumn() {
        for (var i = 0; i < 9; i++) {
            if (num === board[i][c])
                return true;
        }
        return false;
    }
    function isInRow() {
        for (var i = 0; i < 9; i++) {
            if (num === board[r][i])
                return true;
        }
        return false;
    }
    function isInBox() {
        for (var i = c - c % 3; i < c - c % 3 + 3; i++) {
            for (var j = r - r % 3; j < r - r % 3 + 3; j++) {
                if (num === board[j][i])
                    return true;
            }
        }
        return false;
    }
}
function generateBoards(num) {
    var boards = [];
    for (var i = 0; i < num; i++) {
        boards.push(generateBoard()[0]);
    }
    var storedBoardsHTML = localStorage.getItem("boardsHTML") + getBoardsHTML(boards, num);
    localStorage.setItem("boardsHTML", storedBoardsHTML);
    var storedBoardsData;
    if (localStorage.getItem("boardsData") === null) {
        localStorage.setItem("boardsData", "");
    }
    else {
        localStorage.setItem("boardsData", localStorage.getItem("boardsData").replace("undefined", ""));
    }
    storedBoardsData = localStorage.getItem("boardsData");
    for (var i = 0; i < boards.length; i++) {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                storedBoardsData += String(boards[i][r][c]);
            }
        }
    }
    localStorage.setItem("boardsData", storedBoardsData);
    localStorage.setItem("boardsCount", String(Number(localStorage.getItem("boardsCount")) + num));
    return storedBoardsHTML;
}
function getBoardsHTML(boards, num) {
    var output = "";
    for (var i = 0; i < num; i++) {
        output += "<div class='grid-item'><table class='sudoku-board' id='table " + (i + Number(localStorage.getItem("boardsCount"))) + "' onClick='boardClick(" + (i + Number(localStorage.getItem("boardsCount"))) + ")'>";
        for (var r = 0; r < 9; r++) {
            output += "<tr>";
            for (var c = 0; c < 9; c++) {
                if (boards[i][r][c] === 0) {
                    output += "<td id='" + r + "" + c + "'>&nbsp;</td>";
                }
                else {
                    output += "<td id='" + r + "" + c + "'>" + boards[i][r][c] + "</td>";
                }
            }
            output += "</tr>";
        }
        output += "</table></div>";
    }
    return output;
}
function boardClick(boardNum) {
    var boardHTML = document.getElementById("table " + boardNum).outerHTML;
    boardHTML = boardHTML.replace(' onclick="boardClick(' + boardNum + ')"', "");
    localStorage.setItem("boardHTML", boardHTML);
    localStorage.setItem("boardNum", String(boardNum));
    window.location.href = "BoardSolving.aspx";
}
//# sourceMappingURL=SudokuLogic.js.map