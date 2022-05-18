let originalDemoBoard;
if (localStorage.getItem("originalDemoBoard") === null) {
    originalDemoBoard = generateBoard();
    localStorage.setItem("originalDemoBoard", JSON.stringify(originalDemoBoard));
}
else {
    originalDemoBoard = JSON.parse(localStorage.getItem("originalDemoBoard"));
}

const solverContainer = document.getElementById("solver-container");
solverContainer.innerHTML = getBoardHTML(originalDemoBoard, true);
const ilegalDelay = document.getElementById("ilegal-delay");
const foundDelay = document.getElementById("found-delay");
const stuckDelay = document.getElementById("stuck-delay");
const removeDelay = document.getElementById("remove-delay");
const solveButton = document.getElementById("solve-button");
const newBoardButton = document.getElementById("new-board-button");
let demoBoard = JSON.parse(JSON.stringify(originalDemoBoard));
let pause, done, ilegals, previusIlegals, direction, r, c;

function getBoardHTML(board, isOriginalBoard) {
    let output = "<table class='sudoku-board' id='sudoku-board'>";
    for (let r = 0; r < 9; r++) {
        output += "<tr>";
        for (let c = 0; c < 9; c++) {
            output += "<td id='" + r + "" + c + "'";
            if (board[r][c] == 0) {
                output += " class='safe'>&nbsp;</td>";
            }
            else if (isOriginalBoard || board[r][c] === originalDemoBoard[r][c]) {
                output += " class='origin'>" + board[r][c] + "</td>";
            }
            else {
                output += "class='safe'>" + board[r][c] + "</td >";
            }
        }
        output += "</tr>";
    }
    output += "</table>";

    return output;
}

async function demoSolve() {
    if (Number(ilegalDelay.value) + Number(foundDelay.value) + Number(stuckDelay.value) + Number(removeDelay.value) === 0) {
        demoBoard = solve(originalDemoBoard);
        solverContainer.innerHTML = getBoardHTML(demoBoard, false);
        done = true;
        solveButton.innerText = "אפס לוח";
        solveButton.onclick = resetBoard;
        return;
    }

    while (!done) {
        if (pause) {
            return;
        }

        if (originalDemoBoard[r][c] !== 0) {
            increment();
            continue;
        }
        direction = 1;

        for (let i = demoBoard[r][c] + 1; i <= 10; i++) {
            if (i === 10) {
                if (stuckDelay.value !== "0") {
                    await sleep(stuckDelay.value);
                }
                document.getElementById(r + "" + c).innerHTML = "&nbsp;";
                demoBoard[r][c] = 0;
                previusIlegals = JSON.parse(JSON.stringify(ilegals));
                ilegals = getIlegals(r, c, i, demoBoard, false);
                refreshBoard();
                direction = -1;
                if (removeDelay.value !== "0") {
                    await sleep(removeDelay.value);
                }
                increment();
                break;
            }

            if (pause) {
                return;
            }

            document.getElementById(r + "" + c).innerText = i;
            previusIlegals = JSON.parse(JSON.stringify(ilegals));
            demoBoard[r][c] = i;
            ilegals = getIlegals(r, c, i, demoBoard, false);
            refreshBoard();
            if (ilegals.length === 0) {
                if (foundDelay.value !== "0") {
                    await sleep(foundDelay.value);
                }
                increment();
                break;
            }
            else if (ilegalDelay.value !== "0") {
                await sleep(ilegalDelay.value);
            }
        }

        if (done) {
            solveButton.innerText = "אפס לוח";
            solveButton.onclick = resetBoard;
        }
    }

    function refreshBoard() {
        if (Number(ilegalDelay.value) + Number(foundDelay.value) + Number(stuckDelay.value) + Number(removeDelay.value) === 0) {
            return;
        }

        if (previusIlegals.indexOf(r + "" + c) === -1) {
            previusIlegals.push(r + "" + c);
        }

        for (let i = 0; i < previusIlegals.length; i++) {
            if (ilegals.indexOf(previusIlegals[i]) === -1) {
                if (originalDemoBoard[previusIlegals[i][0]][previusIlegals[i][1]] !== 0) {
                    document.getElementById(previusIlegals[i]).className = "origin";
                }
                else {
                    document.getElementById(previusIlegals[i]).className = "safe";
                }
            }
        }

        for (let i = 0; i < ilegals.length; i++) {
            document.getElementById(ilegals[i]).className = "unsafe";
        }
    }

    function increment() {
        if (direction === 1) {
            if (c === 8) {
                if (r === 8) {
                    done = true;
                }
                else {
                    c = 0;
                    r++;
                }
            }
            else {
                c++;
            }
        }

        else {
            if (c === 0) {
                r--;
                c = 9;
            }
            else {
                c--;
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, Number(ms)));
}

function solveButtonClick() {
    pause = false;
    done = false;
    solveButton.innerText = "עצור";
    solveButton.onclick = pauseButtonClick;
    ilegals = [];
    previusIlegals;
    direction = 1;
    r = 0;
    c = 0;
    demoSolve();
}

function pauseButtonClick() {
    pause = !pause;
    solveButton.onclick = pauseButtonClick;
    if (pause) {
        solveButton.innerText = "המשך";
    }
    else {
        solveButton.innerText = "עצור";
        demoSolve();
    }
}

function resetBoard() {
    demoBoard = JSON.parse(JSON.stringify(originalDemoBoard));
    solverContainer.innerHTML = getBoardHTML(demoBoard, true);
    solveButton.innerText = "פתור";
    solveButton.onclick = solveButtonClick;
}

function newBoardButtonClick() {
    pause = true;
    originalDemoBoard = generateBoard();
    demoBoard = JSON.parse(JSON.stringify(originalDemoBoard));
    solverContainer.innerHTML = getBoardHTML(demoBoard, true);
    solveButton.innerText = "פתור";
    localStorage.setItem("originalDemoBoard", JSON.stringify(originalDemoBoard));
    solveButton.onclick = solveButtonClick;
}

function validateInput(input) {
    if (parseInt(input.value) > 9999) {
        input.value = 9999; return false;
    }
    else if (parseInt(input.value) < 0) {
        input.value = 0;
        return false;
    }
}