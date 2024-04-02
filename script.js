const board = document.getElementById("board");

let turn = 1
let turn_mark = [ "", "!", "?" ];

let square_clicked_count = 0;


let squares = [];
let square_count = 0;

for (let r = 0; r < 3; r ++) {
    squares.push([]);
    for (let c = 0; c < 3; c ++) {
        square_count ++;
        squares[r][c] = {
            id: square_count,
            stans: 0
        };
    }
}

function createSquares()
{
    removeSquares();

    for (let r = 0; r < 3; r ++) {
        const squaresRow = document.createElement("div");
        squaresRow.classList.add("squares-row");
        for (let c = 0; c < 3; c ++) {
            const square = document.createElement("div");
            square.classList.add("square");
            const is_not_clicked = ! squares[r][c].stans;
            if (is_not_clicked) {
                square.classList.add("hover-shadow");
            }

            square.innerText = turn_mark[squares[r][c].stans]
            square.onclick = () => { clickHandle(squares[r][c].id) };

            squaresRow.appendChild(square);
        }
        board.appendChild(squaresRow);
    }
}

function removeSquares()
{
    const squaresRows = board.querySelectorAll("div");

    if (squaresRows) {
        squaresRows.forEach( squaresRow => squaresRow.remove() );
    }
}

function clickHandle(num)
{
    for (let r = 0; r < 3;  r ++) {
        for (let c = 0; c < 3; c ++) {
            const is_not_clicked = ! squares[r][c].stans;
            const is_select = squares[r][c].id === num;
            if (is_select) {
                if (is_not_clicked) {
                    squares[r][c].stans = turn;
                    turn = turnChange(turn);
                    square_clicked_count ++;

                    createSquares();
                    checkWiner();
                } else {
                    setTimeout(() => {
                        alert("This square ever selected!\nYou must be selct square that wasn't selected.");
                    }, 250);
                }
            }
        }
    }
}

function checkWiner()
{
    let winer = 0;
    const turn_name = [ "", "first turn", "second turn" ];

    for (let r = 0; r < 3; r ++) {
        const is_column = squares[r][0].stans === squares[r][1].stans && squares[r][1].stans === squares[r][2].stans && squares[r][2].stans;
        const is_row = squares[0][r].stans === squares[1][r].stans && squares[1][r].stans === squares[2][r].stans && squares[2][r].stans;

        if (is_column) {
            winer = squares[r][2].stans;
        } else if (is_row) {
            winer = squares[2][r].stans;
        }
    }

    if ( ! winer) {
        const is_x_right = squares[2][0].stans === squares[1][1].stans && squares[1][1].stans === squares[0][2].stans && squares[0][2].stans;
        const is_x_left = squares[0][0].stans === squares[1][1].stans && squares[1][1].stans === squares[2][2].stans && squares[2][2].stans;

        if (is_x_right) {
            winer = squares[0][2].stans;
        } else if (is_x_left) {
            winer = squares[2][2].stans;
        }
    }

    if (winer) {
        setTimeout(() => {
            alert("GAME END!\nThis game's winer is " + turn_name[winer] + " !!!");
            replay();
        }, 250);
    } else if (square_clicked_count === 9) {
        setTimeout(() => {
            alert("GAME END!\nThis game was draw!");
            replay();
        }, 250);
    }
}

function turnChange(turn) {
    if (turn === 1) {
        return (2);
    } else {
        return (1);
    }
}

function replay()
{
    setTimeout(() => {
        const question = confirm("Are you want to play again?");

        if (question) {
            window.location.reload();
        } else {
            window.close();
        }
    }, 250);
}

createSquares();

