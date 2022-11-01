var board;
let playerO = "O";
let playerX = "X";
let currPlayer = playerO;
let gameOver = false;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("slot");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontalSlot");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("verticalSlot");
      }
      tile.addEventListener("click", setTile);
      document.getElementById("gameBody").append(tile);
    }
  }

  playerSelect();
}

function playerSelect() {
  let x = document.getElementById("btX");
  x.addEventListener("click", setX);

  let o = document.getElementById("btO");
  o.addEventListener("click", setO);

  let rld = document.getElementById("reload");
  rld.addEventListener("click", gameReset);
}

function gameReset() {
  gameOver = false;
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = " ";
      tile.classList.remove("winner");
    }
  }
}

function setO() {
  currPlayer = playerO;
}

function setX() {
  currPlayer = playerX;
}

function setTile() {
  if (gameOver) {
    return;
  }

  let coordenada = this.id.split("-");
  let r = parseInt(coordenada[0]);
  let c = parseInt(coordenada[1]);

  if (board[r][c] != " ") {
    return;
  }

  board[r][c] = currPlayer;
  this.innerText = currPlayer;

  if (currPlayer == playerO) {
    currPlayer = playerX;
  } else {
    currPlayer = playerO;
  }
  checkWinner();
}

function checkWinner() {
  for (let r = 0; r < 3; r++) {
    if (
      board[r][0] == board[r][1] &&
      board[r][1] == board[r][2] &&
      board[r][0] != " "
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(r.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      gameOver = true;
      return;
    }
  }

  for (let c = 0; c < 3; c++) {
    if (
      board[0][c] == board[1][c] &&
      board[1][c] == board[2][c] &&
      board[0][c] != " "
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + c.toString());
        tile.classList.add("winner");
      }
      gameOver = true;
      return;
    }
  }

  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] != " "
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("winner");
    }
    gameOver = true;
    return;
  }

  if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[0][2] != " "
  ) {
    let tile = document.getElementById("0-2");
    tile.classList.add("winner");

    tile = document.getElementById("1-1");
    tile.classList.add("winner");

    tile = document.getElementById("2-0");
    tile.classList.add("winner");
    gameOver = true;
    return;
  }
}
