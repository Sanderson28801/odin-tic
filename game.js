/*
Logic for Tic Tac Toe:

Init - main factory function
    -1 placeholder. 0 for O and 1 for X
    _board = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
    ];
    _turn 
    _turnCount
    _p1score
    _p2score
    _cacheDom
    _bindEvent - For clicking implemented later
    _render
    _gameOver
    


    markBoard
*/

let ticTac = (function () {
  let board = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  let turn = true;
  let turnCount = 0;
  let p1score = 0;
  let p2score = 0;
  let winner = false;
  //cacheDom
  let game = document.querySelector(".game");
  let choices = game.children;
  let gameOverMessage = document.querySelector(".gameOver");
  let playAgain = gameOverMessage.querySelector("button");
  let scores = document.querySelector(".scores");
  let resetButton = document.querySelector(".controls button");

  //bindEvents
  for (const choice of choices) {
    choice.addEventListener("click", (button) => {
      let coords = button.target.id;
      let x = coords.slice(0, 1);
      let y = coords.slice(1, 2);
      markBoard(x, y);
    });
  }

  playAgain.addEventListener("click", resetGame);

  resetButton.addEventListener("click", resetGame);
  _render();

  function resetGame() {
    board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    gameOverMessage.style.display = "none";
    turn = true;
    turnCount = 0;

    _render();
  }

  function _render() {
    for (let i = 0; i < 9; i++) {
      let currVal = board[Math.floor(i / 3)][i % 3];
      if (currVal === true) {
        choices.item(i).textContent = "X";
      } else if (currVal === false) {
        choices.item(i).textContent = "O";
      } else {
        choices.item(i).textContent = "";
      }

      scores.firstChild.textContent = `Player One Score: ${p1score}`;
      scores.querySelector("#p2s").textContent = `Player One Score: ${p2score}`;
    }
  }
  function _gameOver() {
    /* 
    Check rows, check columns, check diagonals
    Then check if turncount is 9
    */
    //Check Rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== -1
      ) {
        return board[i][0];
      } else if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== -1
      ) {
        return board[0][i];
      }
    }
    //Check Diagonals
    if (
      board[0][0] === board[1][1] &&
      board[0][0] == board[2][2] &&
      board[0][0] !== -1
    ) {
      return board[0][0];
    } else if (
      board[2][0] === board[1][1] &&
      board[2][0] == board[0][2] &&
      board[2][0] !== -1
    ) {
      return board[2][0];
    }
    //If there is no winner at this game stage
    return -1;
  }

  function markBoard(x, y) {
    if (board[x][y] === -1 && !winner) {
      board[x][y] = turn;
      turn = !turn;
      turnCount++;
      if (turnCount === 9) {
        console.log("Game Over");
      }
      let outcome = _gameOver();

      if (outcome !== -1) {
        if (outcome) {
          p1score++;
          gameOverMessage.querySelector("h1").textContent = "Player One Won";
        } else {
          p2score++;
          gameOverMessage.querySelector("h1").textContent = "Player Two Won";
        }
        gameOverMessage.style.display = "block";
      }
      _render();
    }
  }

  return {
    markBoard,
    board,
  };
})();
