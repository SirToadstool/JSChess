const gameState = {
    currentCell: null,
    targetCell: null,
    isMoving: false,
};

const pieces = {
    lightPawn: { label: "pawn", imgSrc: "/assets/LightPawn.webp" },
    lightKnight: { label: "knight", imgSrc: "/assets/LightKnight.webp" },
    lightBishop: { label: "bishop", imgSrc: "/assets/LightBishop.webp" },
    lightRook: { label: "rook", imgSrc: "/assets/LightRook.webp" },
    lightQueen: { label: "queen", imgSrc: "/assets/LightQueen.webp" },
    lightKing: { label: "king", imgSrc: "/assets/LightKing.webp" },
    darkPawn: { label: "pawn", imgSrc: "/assets/DarkPawn.webp" },
    darkKnight: { label: "knight", imgSrc: "/assets/DarkKnight.webp" },
    darkBishop: { label: "bishop", imgSrc: "/assets/DarkBishop.webp" },
    darkRook: { label: "rook", imgSrc: "/assets/DarkRook.webp" },
    darkQueen: { label: "queen", imgSrc: "/assets/DarkQueen.webp" },
    darkKing: { label: "king", imgSrc: "/assets/DarkKing.webp" }
}

function handleClick(event) {
    const target = event.target;
    const name = target.nodeName;

    if (name === "IMG" && !gameState.isMoving) {
        gameState.isMoving = true;
        gameState.currentCell = target.parent;
    } else if (name === "DIV" && gameState.isMoving) {
        gameState.isMoving = false;
        gameState.targetCell = target;
    }
}

function createImage(imgSrc) {
    const img = document.createElement("img");
    img.classList.add("piece");
    img.src = imgSrc;
    return img;
}

function initBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
        const arr = [];
        for (let j = 0; j < 8; j++) {
            arr.push({ imgSrc: null });
        }
        board.push(arr);
    }
    return board;
}

function initPieces(board) {
    // setup black pieces
    board[0][0] = pieces.darkRook;
    board[0][1] = pieces.darkKnight;
    board[0][2] = pieces.darkBishop;
    board[0][3] = pieces.darkQueen;
    board[0][4] = pieces.darkKing;
    board[0][5] = pieces.darkBishop;
    board[0][6] = pieces.darkKnight;
    board[0][7] = pieces.darkRook;

    for (let i = 0; i < 8; i++) {
        board[1][i] = pieces.darkPawn;
    }

    // setup white pieces
    board[7][0] = pieces.lightRook;
    board[7][1] = pieces.lightKnight;
    board[7][2] = pieces.lightBishop;
    board[7][3] = pieces.lightQueen;
    board[7][4] = pieces.lightKing;
    board[7][5] = pieces.lightBishop;
    board[7][6] = pieces.lightKnight;
    board[7][7] = pieces.lightRook;

    for (let i = 0; i < 8; i++) {
        board[6][i] = pieces.lightPawn;
    }
}

function drawBoard(board, boardElem) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement("div");
            const className = (i + j) % 2 == 0 ? "light" : "dark";
            const imgSrc = board[i][j].imgSrc;

            cell.classList.add(className);
            cell.setAttribute("rank", 8 - i - 1);
            cell.setAttribute("file", j);
            cell.addEventListener("click", handleClick);

            if (imgSrc) {
                cell.appendChild(createImage(imgSrc));
            }

            boardElem.appendChild(cell);
        }
    }
}

const board = initBoard();
const boardElem = document.getElementById("board");

initPieces(board);
drawBoard(board, boardElem);