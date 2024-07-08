const stageName = document.querySelector(".board .stage")

import createHandFunction from "./createHandFunction.js";
import findWinnerRound from "./findWinnerRound.js";
import returnCard from "./returnCard.js";
import { data } from "./script.js";
import updateCardsOnBoard from "./updateCardsOnBoad.js";

function preFlop() {

    data.turnName = "PreFlop"
    stageName.innerText = "PreFlop"

}

function flopTurn() {

    data.turnName = "Flop"
    stageName.innerText = "Flop"


    for (let i = 0; i < 3; i++) {
        const card = returnCard();
        data.cardsOnBoard.push(card)
    }

    updateCardsOnBoard()

}

function turnTurn() {

    data.turnName = "Turn"
    stageName.innerText = "Turn"

    const card = returnCard();

    data.cardsOnBoard.push(card)

    updateCardsOnBoard()

}

function riverTurn() {

    data.turnName = "River"
    stageName.innerText = "River"


    const card = returnCard();

    data.cardsOnBoard.push(card)

    updateCardsOnBoard()

}

function showDownTurn() {

    data.turnName = "Show down"
    stageName.innerText = "Show down"

    // Rotate cards
    data.allPlayers.map(player => {

        player.html.querySelector(".card-1").classList.add("showCard")
        player.html.querySelector(".card-2").classList.add("showCard")

        setTimeout(() => {
            player.html.querySelector(".card-1").classList.remove("face-down")
            player.html.querySelector(".card-2").classList.remove("face-down")
        }, 200)

    })

    setTimeout(() => {
        createHandFunction()
        putHandOnPlacing()
        setTimeout(() => {
            findWinnerRound()
        }, 1000)
    }, 1000)

}


function putHandOnPlacing() {
    data.allPlayers.map(player => {
        player.html.querySelector(".placing").innerText = player.hand.name;
    })
}

export {
    preFlop,
    flopTurn,
    turnTurn,
    riverTurn,
    showDownTurn,
}