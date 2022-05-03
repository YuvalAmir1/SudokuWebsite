// generates a random sudoku board
function generateBoard(): number[][] {
    let board =
        [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    // randomly fill the board with numbers
    fillDiagonal();
    fillBoard(0, 0);

    let positions = getPositions();
    removeUntilListEmpty();
    return board;

    function fillDiagonal(): void {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[r][c] = numbers.pop();
            }
        }

        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let r = 3; r < 6; r++) {
            for (let c = 3; c < 6; c++) {
                board[r][c] = numbers.pop();
            }
        }

        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let r = 6; r < 9; r++) {
            for (let c = 6; c < 9; c++) {
                board[r][c] = numbers.pop();
            }
        }
    }

    function fillBoard(r: number, c: number): boolean {
        if (r === 9) {
            return true;
        }
        // if the current cell is empty, skip it
        if (board[r][c] !== 0) {
            return testNext();
        }

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 9; i++) {
            if (getIlegals(r, c, numbers[i], board).length === 0) {
                board[r][c] = numbers[i];
                if (!testNext()) {
                    board[r][c] = 0;
                }
                else {
                    return true;
                }
            }
        }
        return false;

        function testNext(): boolean {
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

    function getPositions(): number[][] {
        return [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
        [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]].sort(() => Math.random() - 0.5);;
    }

    function removeUntilListEmpty(): void {
        let position;
        let lastValue;
        while (positions.length > 0) {
            position = positions.pop();
            lastValue = board[position[0]][position[1]];
            board[position[0]][position[1]] = 0;

            if (solve(board) === null) {
                board[position[0]][position[1]] = lastValue;
            }
        }
    }
}

// takes an incomplete sudoku board and returns a solved board
// returns null if the board is either not unique or has more than one solution
function solve(originalBoard): number[][] {
    let testBoard = JSON.parse(JSON.stringify(originalBoard));
    let outputBoard: number[][];
    let count = 0;
    solveRecursively(0, 0);
    if (count !== 1) {
        return null;
    }
    return outputBoard;

    // recursively solves the sudoku board
    function solveRecursively(r, c): void {
        if (r === 9) {
            // reached the end of the board
            count++;
            if (count === 1) {
                outputBoard = JSON.parse(JSON.stringify(testBoard));
            }
        }
        if (r === 9 || count >= 2) {
            return;
        }
        // if the current cell isn't empty, skip it
        if (testBoard[r][c] !== 0) {
            solveNext();
        }
        else {
            for (let i = 1; i <= 9; i++) {
                if (getIlegals(r, c, i, testBoard).length === 0) {
                    testBoard[r][c] = i;
                    solveNext();
                }
            }
            testBoard[r][c] = 0;
        }

        function solveNext(): void {
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

// returns the positions of all the numbers that are ilegaly placed
function getIlegals(r, c, num, board): number[][] {
    let ilegals = [];

    for (let i = 0; i < 9; i++) {
        if (i !== r && num === board[i][c]) {
            if (ilegals.length === 0) {
                ilegals.push(r + "" + c);
            }
            if (ilegals.indexOf(i + "" + c) === -1) {
                ilegals.push(i + "" + c);
            }
        }

        if (i !== c && num === board[r][i]) {
            if (ilegals.length === 0) {
                ilegals.push(r + "" + c);
            }
            if (ilegals.indexOf(r + "" + i) === -1) {
                ilegals.push(r + "" + i);
            }
        }
    }

    for (let i = r - r % 3; i < r - r % 3 + 3; i++) {
        for (let j = c - c % 3; j < c - c % 3 + 3; j++) {
            if (i != r && j != c && num == board[i][j]) {
                if (ilegals.length === 0) {
                    ilegals.push(r + "" + c);
                }
                if (ilegals.indexOf(i + "" + j) === -1) {
                    ilegals.push(i + "" + j);
                }
            }
        }
    }

    return ilegals;
}

function generateBoards(num: number): string {
    let boards = [];

    for (let i = 0; i < num; i++) {
        boards.push(generateBoard());
    }

    let storedBoardsHTML = localStorage.getItem("boardsHTML") + getBoardsHTML(boards, num);
    localStorage.setItem("boardsHTML", storedBoardsHTML);
    let storedBoardsData;

    if (localStorage.getItem("boardsData") === null) {
        localStorage.setItem("boardsData", "");
    }
    else {
        localStorage.setItem("boardsData", localStorage.getItem("boardsData").replace("undefined", ""));
    }
    storedBoardsData = localStorage.getItem("boardsData");

    for (let i = 0; i < boards.length; i++) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                storedBoardsData += String(boards[i][r][c]);
            }
        }
    }
    localStorage.setItem("boardsData", storedBoardsData);
    localStorage.setItem("boardsCount", String(Number(localStorage.getItem("boardsCount")) + num));

    return storedBoardsHTML;
}

function getBoardsHTML(boards: number[][][], num: number): string {
    let output = "";

    for (let i = 0; i < num; i++) {
        output += "<div class='grid-item'><table class='sudoku-board' id='table " + (i + Number(localStorage.getItem("boardsCount"))) + "' onClick='boardClick(" + (i + Number(localStorage.getItem("boardsCount"))) + ")'>";
        for (let r = 0; r < 9; r++) {
            output += "<tr>";
            for (let c = 0; c < 9; c++) {
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

function boardClick(boardNum: number): void {
    let boardHTML = document.getElementById("table " + boardNum).outerHTML;
    boardHTML = boardHTML.replace(' onclick="boardClick(' + boardNum + ')"', "");
    localStorage.setItem("boardHTML", boardHTML);
    localStorage.setItem("boardNum", String(boardNum));
    window.location.href = "BoardSolving.aspx";
}