"use strict";

const PLAY = ["rock", "paper", "scissors"];
const PLAY_VAL = {"rock": 1, "paper": 0, "scissors": -1};

function capitalize(string) {
    let newString = string.toLowerCase(); 
    return newString.replace(newString[0], 
        newString[0].toUpperCase());
}

let computerPlay = () => PLAY[Math.floor(Math.random()*3)];

function playRound(playerSelection, computerSelection) {
    const pScore = document.querySelector("#p-score");
    const cScore = document.querySelector("#c-score");
    let pScoreValue = () => +(pScore.textContent);
    let cScoreValue = () => +(cScore.textContent);

    if(pScoreValue() === 5 || cScoreValue() === 5) {
        pScore.textContent = 0;
        cScore.textContent = 0;
    }

    const events = document.querySelector("#events");
    let turnBlock = document.createElement("div");
    let pTurn = document.createElement("p");
    let cTurn = document.createElement("p");

    pTurn.textContent = `You pick ${playerSelection}.`;
    pTurn.setAttribute("class", "player-turn");

    cTurn.textContent = `Computer picks ${computerSelection}.`;
    cTurn.setAttribute("class", "computer-turn");

    turnBlock.appendChild(pTurn);
    turnBlock.appendChild(cTurn);

    function getOutcome(winValue) {
        if(player + comp === winValue){
            return ["win", "beats", true];
        } 
        else{
            return ["lose", "loses to", false];
        }
    };

    let result = document.createElement("p");
    result.setAttribute("class", "result");

    let player = PLAY_VAL[playerSelection];
    let comp = PLAY_VAL[computerSelection];
    let outcome = undefined;
    let text = undefined;

    if(player === comp) {
        text = `Draw! You both played ${playerSelection}s!`;
    }
    else if(player === 1){
        outcome = getOutcome(0);
    }
    else if(player === 0){
        outcome = getOutcome(1);
    }
    else if(player === -1){
        outcome = getOutcome(-1);
    }

    if(!text){
        if(outcome[2]) {
            pScore.textContent = pScoreValue() + 1;
        }
        else {
            cScore.textContent = cScoreValue() + 1;
        }

        playerSelection = capitalize(playerSelection);
        computerSelection = capitalize(computerSelection);
        text = `You ${outcome[0]}! ${playerSelection} ${outcome[1]} ${computerSelection}!`;
    }

    result.textContent = text;
    turnBlock.appendChild(result);
    events.appendChild(turnBlock);

    if(pScoreValue() === 5 || cScoreValue() === 5) {
        let winner = undefined;
        let gameOver = document.createElement("p");
        gameOver.setAttribute("class", "game-over");

        if(pScoreValue() > cScoreValue()) {
            winner = "Player";
        }
        else {
            winner = "Computer";
        }

        gameOver.textContent = `GAME OVER!\n${winner} wins the match!`;
        events.appendChild(gameOver);
    }

    events.scrollTop = 999999;
}

const buttons = document.querySelectorAll("button")

buttons.forEach(function(button){
    button.addEventListener("click", (e) => playRound(button.id, computerPlay()))
});