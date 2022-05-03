let board: string, boardDataString: string;
let originalBoard = [...Array(9)].map(e => Array(9));
let solvedBoard = [...Array(9)].map(e => Array(9));
let currentBoard: number[][];
let inputTable = document.getElementById("input-table");
let previusIlegals = [];
let ilegals = [];

window.onload = function () {
    board = localStorage.getItem("boardHTML");
    boardDataString = localStorage.getItem("boardsData").substring(Number(localStorage.getItem("boardNum")) * 81, (Number(localStorage.getItem("boardNum")) + 1) * 81);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            originalBoard[row][col] = Number(boardDataString[row * 9 + col]);
        }
    }

    currentBoard = JSON.parse(JSON.stringify(originalBoard));
    solvedBoard = solve(originalBoard);
    board = board.replace(/id=(.)([0-9])([0-9])(.)>&nbsp;/g, "><input type='text' id='$2$3' maxlength='2' class='safe' onInput='testIfSolved(this,$2,$3)'> </input>");
    document.getElementById("board").innerHTML = board;
};

function testIfSolved(input: HTMLInputElement, r: string, c: string): void {
    if (input.value.length === 2) {
        if ((!isNaN(input.value[1] as any)) && input.value[1] !== "0") {
            input.value = input.value[1];
        }
        else {
            input.value = input.value[0];
        }
    }

    let num = Number(input.value);


    if (isNaN(input.value as any) || input.value === "0") {
        input.value = "";
    }
    else {
        currentBoard[Number(r)][Number(c)] = num;
        refreshBoard();
    }

    if (JSON.stringify(solvedBoard) === JSON.stringify(currentBoard)) {
        alert("You won!");
    }

    function refreshBoard() {
        let tempIlegals;
        
        if (previusIlegals.length === 0) {
            previusIlegals.push(r + "" + c);
        }

        for (let i = 0; i < previusIlegals.length; i++) {
            if (ilegals.indexOf(previusIlegals[i]) === -1) {
                tempIlegals = getIlegals(Number(previusIlegals[i][0]), Number(previusIlegals[i][1]), currentBoard[Number(previusIlegals[i][0])][Number(previusIlegals[i][1])], currentBoard);
                if (tempIlegals.length > 0) {
                    for (let j = 0; j < tempIlegals.length; j++) {
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

        for (let i = 0; i < ilegals.length; i++) {
            document.getElementById(ilegals[i]).className = "unsafe";
        }

        previusIlegals = JSON.parse(JSON.stringify(ilegals));
        ilegals = [];
    }
}