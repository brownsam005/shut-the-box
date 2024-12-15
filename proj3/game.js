const rollBtn = document.querySelector("#roll");
const sumBtn = document.querySelector("#sum");
const individualBtn = document.querySelector("#individual");
const startBtn = document.querySelector("#start");
const endBtn = document.querySelector("#end");
const playAgainBtn = document.querySelector("#play-again");
const dice1 = document.querySelector("#first-dice");
const dice2 = document.querySelector("#second-dice");

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const beforeStart = document.querySelector("#after-start");
const afterGame = document.querySelector("#score")
const startGame = document.querySelector("#playerNames");
const p1Name = document.querySelector("#p1name");
const p2Name = document.querySelector("#p2name");
const playerTurn = document.querySelector("#turn");
const round = document.querySelector("#round");
const firstPlayer = player1.value.trim()
const secondPlayer = player2.value.trim()
const winner = document.querySelector("#winner");
const finishGame = document.querySelector("#finishGame");
let currentTurn = firstPlayer;
let roundNumber = (1);
let die1 = Math.floor(Math.random() * 6) + 1;
let die2 = Math.floor(Math.random() * 6) + 1;
let player1Points = 0
let player2Points = 0
// rollBtn.disabled = true;
sumBtn.disabled = true;
individualBtn.disabled = true;
endBtn.disabled = true;
beforeStart.style.display = "none";
afterGame.style.display = "none";
finishGame.style.display= "none";


startBtn.addEventListener("click", function() {
    const firstPlayer = player1.value.trim()
    const secondPlayer = player2.value.trim()
    beforeStart.style.display = "block";
    rollBtn.disabled = false;
    currentTurn = firstPlayer;
    if (firstPlayer != "" && secondPlayer != "") {
        beforeStart.style.display = "block";
        afterGame.style.display = "block";
        round.textContent = "Round 1"
        playerTurn.textContent = currentTurn + "'s Turn";
        p1Name.textContent = firstPlayer;
        p2Name.textContent = secondPlayer;
        startGame.style.display = "none"
        finishGame.style.display= "none";
    } else {
        alert("Names not entered")
        beforeStart.style.display = "none"
        afterGame.style.display = "none"
    }
});




rollBtn.addEventListener("click", function() {
    die1 = rollDice();
    die2 = rollDice();

    dice1.className = `bi bi-dice-${die1}`;
    dice2.className = `bi bi-dice-${die2}`;

    if (boxes[die1] || boxes[die2] == 0) {
        individualBtn.disabled = false;
    }
    if (boxes[die1] || boxes[die2] == "X") {
        individualBtn.disabled = true;
    }
    if (boxes[(die1 + die2)] == 0) {
        sumBtn.disabled = false;
    }
    diceSum();
    rollBtn.disabled = true;
    endBtn.disabled = true;
    if (individualBtn.disabled && sumBtn.disabled == true) {
        endBtn.disabled = false;
    }
});
individualBtn.addEventListener("click", function() {
    shut(die1);
    shut(die2);
    boxes[die1] = "X";
    boxes[die2] = "X";
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    boxes[0] = boxes[0] + (die1 + die2);
});
sumBtn.addEventListener("click", function() {
    shut(die1 + die2);
    boxes[(die1 + die2)] = "X";
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    boxes[0] = boxes[0] + (die1 + die2);


})
endBtn.addEventListener("click", function() {
    const firstPlayer = player1.value.trim()
    const secondPlayer = player2.value.trim()
    endBtn.disabled = true;
    round.textContent = "Round" + roundNumber;
    rollBtn.disabled = false;
    if(currentTurn === firstPlayer){
        const turnPoints1 = 45 - boxes[0];
        player1Points = turnPoints1 + player1Points;
        currentTurn = secondPlayer;
        playerTurn.textContent = currentTurn + "'s Turn";
        buildRow(roundNumber, turnPoints1);
    } else if(currentTurn === secondPlayer){
        const turnPoints2 = 45 - boxes[0];
        player2Points = turnPoints2 + player2Points;
        const p2Scorecard = document.querySelector("#round" + roundNumber + " .p2Pts");
        p2Scorecard.textContent = turnPoints2;
        currentTurn = firstPlayer;
        roundNumber = roundNumber + 1;
        playerTurn.textContent = currentTurn + "'s Turn";
    }
    if(roundNumber > 5){
        gameOver();
    }
    resetBoard();
})
playAgainBtn.addEventListener("click",function(){
    roundNumber = 1;
  player1Points = 0;
  player2Points = 0;
  resetBoard();
  startGame.style.display = "block";
  beforeStart.style.display = "none";
  afterGame.style.display = "none";
  winner.textContent = "";
  const allRows = document.querySelectorAll("tr");
    allRows.forEach(row => row.remove());

})

function rollDice() {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    return diceNumber;
}

function diceSum() {
    const sumNumber = document.querySelector("#sum-number");
    sumNumber.textContent = ("Sum: " + (die1 + die2));
    return sumNumber;
}

function shut(boxNumber) {
    const specialBox = document.querySelector(`#box${boxNumber}`)
    const specialBoxPara = document.querySelector(`#box${boxNumber} h1`)
    specialBox.classList.add("shut")
    specialBox.textContent = "X"
}
function buildRow(X, points){
    const tbody = document.querySelector("#tbody");
    const tr = document.createElement("tr");
    tr.id = `round${X}`;
    const th = document.createElement("th");
  th.textContent = `Round ${X}`;
  const td1 = document.createElement("td");
  td1.classList.add("p1Pts");
  td1.textContent = points;
  const td2 = document.createElement("td");
  td2.classList.add("p2Pts");
    tbody.insertAdjacentElement("beforeend", tr);
    tr.insertAdjacentElement("beforeend", th);
    tr.insertAdjacentElement("beforeend", td1);
    tr.insertAdjacentElement("beforeend", td2);
    return tr;
}
function resetBoard(){
    boxes.fill(0);
    const cards = document.querySelectorAll(".box");
    cards.forEach((card, index) => {
      card.classList.remove("shut");
      card.textContent = index + 1;
    });
}
function gameOver(){
    const firstPlayer = player1.value.trim()
    const secondPlayer = player2.value.trim()
    finishGame.style.display = "block";
    beforeStart.style.display = "none";
    if (player1Points < player2Points){
        winner.textContent = "Winner: " + firstPlayer;
    } else {
        winner.textContent = "Winner: " +secondPlayer;
    }
}
