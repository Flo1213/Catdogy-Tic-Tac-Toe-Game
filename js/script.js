"use strict";

// ***********SELECTOR***********
const playersTurn = document.querySelector(".player-status__turn");
const playersText = document.querySelector(".player-status__text");

const game = document.querySelector(".game");
const gameCells = document.querySelectorAll(".game__cell");
const gameBox = document.querySelector(".game__box");
const catScoreText = document.querySelector(".score__player-0--score");
const dogScoreText = document.querySelector(".score__player-1--score");

const btnStart = document.querySelector(".btn__start");
const btnReset = document.querySelector(".btn__reset");

// ***********DATA***************
const players = ["cat", "dog"];
let currentPlayer = 0;
let clickCount = 0;
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let catScore = 0;
let dogScore = 0;

let positions = ["", "", "", "", "", "", "", "", ""];

console.log();

// ***********FUNCTION***********

// Decide first player
const firstPlayer = function () {
  playersText.style.opacity = 1;
  playersText.classList.add("player-status__animation");
  const random = Math.floor(Math.random() * 2);
  currentPlayer = random;
  playersText.innerHTML = `
  Player Status: <span class="player-status__turn">${players[currentPlayer]}</span> first
  `;
};

const gamePlayProcess = function (e) {
  // Check if click the same cell
  checkSameCell(e);
};

// Display game board
const displayGameBoard = function (e) {
  const clickCell = e.target;
  addCellClasslist(e);

  // Check cat or dog and display on the game board
  if (currentPlayer === 0) {
    const html = `
    <img
              src="./images/icons8-${players[currentPlayer]}.png"
              alt="dog--icon"
              class="game__${players[currentPlayer]}--img"
            />
    `;
    clickCell.insertAdjacentHTML("afterbegin", html);
  } else {
    const html = `
    <img
              src="./images/icons8-${players[currentPlayer]}.png"
              alt="dog--icon"
              class="game__${players[currentPlayer]}--img"
            />
    `;
    clickCell.insertAdjacentHTML("afterbegin", html);
  }

  // Check if the game win
  checkGameWin();
};

// Add animal classList in cell
const addCellClasslist = function (e) {
  e.target.classList.add(players[currentPlayer]);
};

// Check if click the same cell
const checkSameCell = function (e) {
  const imgElement = e.currentTarget.querySelector("img");
  if (imgElement) return alert("Click the same cell. Need to refresh the game");

  // Push cell index to position
  pushCellIndex(e);
};

// Push cell index to position
const pushCellIndex = function (e) {
  const cellNumber = e.target.classList[1].slice(-1);
  if (currentPlayer === 0) {
    positions.splice(cellNumber, 1, players[currentPlayer]);
  } else {
    positions.splice(cellNumber, 1, players[currentPlayer]);
  }

  // Display game board
  displayGameBoard(e);
};

// Check the game win or not
const checkGameWin = function () {
  let roundWin = false;

  winCondition.forEach((condition) => {
    const cellA = positions[condition[0]];
    const cellB = positions[condition[1]];
    const cellC = positions[condition[2]];

    if (cellA !== "" || cellB !== "" || cellC !== "") {
      if (cellA === cellB && cellB === cellC) {
        return (roundWin = true);
      }
    }
  });

  if (roundWin === true && currentPlayer === 0) {
    catScore++;
    catScoreText.textContent = catScore;
    playersText.innerHTML = `
    Player Status: <span class="player-status__turn">${players[currentPlayer]} </span> WIN !!!
  `;
    disabledToggle();
  } else if (roundWin === true && currentPlayer === 1) {
    dogScore++;
    dogScoreText.textContent = dogScore;
    playersText.innerHTML = `
  Player Status: <span class="player-status__turn">${players[currentPlayer]} </span> WIN !!!
`;
    disabledToggle();
    game.classList.add("disabled");
  } else if (!positions.includes("")) {
    playersText.innerHTML = `
    Player Status: <span class="player-status__turn">DRAW</span>game
  `;
    disabledToggle();
  } else {
    changePlayer();
  }
};

const changePlayer = function () {
  if (currentPlayer === 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
  playersText.innerHTML = `
  Player Status: <span class="player-status__turn">${players[currentPlayer]}</span> turn
  `;
};

const disabledToggle = function () {
  game.classList.toggle("disabled");
};

const clearTheDisplay = function () {
  gameCells.forEach((gameCell) => (gameCell.innerHTML = ""));
  disabledToggle();
  positions = ["", "", "", "", "", "", "", "", ""];
};

const resetGame = function () {
  clearTheDisplay();
  catScore = 0;
  dogScore = 0;
  playersText.innerHTML = `
  Press start sutton to start the game <span class="player-status__turn"></span>
  `;
  catScoreText.textContent = catScore;
  dogScoreText.textContent = dogScore;
  disabledToggle();
};
// ***********EVENT HANDLER***********
// Start game
btnStart.addEventListener("click", function (e) {
  e.preventDefault();
  clearTheDisplay();
  firstPlayer();
});

// PLayer click game board
gameCells.forEach((gameCell) => {
  gameCell.addEventListener("click", function (e) {
    checkSameCell(e);
  });
});

btnReset.addEventListener("click", function (e) {
  e.preventDefault();
  resetGame();
});
