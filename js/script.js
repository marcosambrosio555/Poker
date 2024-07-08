import createPlayers from "./objects.js"
import render from "./render.js"
import createRound from "./createRound.js"
import changePlayer from "./changePlayer.js"
import { flopTurn, turnTurn, riverTurn, showDownTurn, preFlop } from "./turns.js";
import { myDecision } from "./buttons.js";
import oponentDecision from "./oponentDecision.js";
import { winnerFunction } from "./findWinnerRound.js";


const urlSearch = new URLSearchParams(window.location.search)
const name = urlSearch.get("name")
const numberOfOponents = urlSearch.get("numberOfOponents")
const speed = Number(urlSearch.get("speed"))
const amount = urlSearch.get("amount")
const bigBlind = Number(urlSearch.get("bigBlind"))
const smallBlind = bigBlind / 2;

const speedValue = speed >= 1 && speed <= 6 ? speed : 3

export const data = {
    ...createPlayers(name, numberOfOponents, amount),
    potValue: 0,
    target: 0,
    smallBlind: smallBlind,
    bigBlind: bigBlind,
    higherValue: 0,
    currentTurn: 0,
    turnName: "",
    turns: [
        preFlop,
        flopTurn,
        turnTurn,
        riverTurn,
        showDownTurn,
    ],
    // speed: 500,
    speed: 6000 / speedValue,
    allCards: [],
    cardsOnBoard: [],
    folders: [],
    smallBlindIndex: null,
    state: null
}

startGame()

function startGame() {

    // Renderizar
    render(data)

    initRound()

}

function initRound() {

    createRound(data)

    if (data.state === "Over") return

    changePlayer()

    require()

}

function require() {

    if (data.allPlayers.length === 1) {
        winnerFunction(data.allPlayers[0])
    } else if (everyOnePayed()) {

        cleanPlacing()
        data.turns[data.currentTurn]();

        if (data.turnName !== "Show down") {

            data.currentTurn++;

            cleanPlayers()

            data.allPlayers.map(player => {
                player.html.classList.remove("selected")
            })

            if (!data.allPlayers[data.smallBlindIndex]) {
                console.log("Recurso")
                data.smallBlindIndex = 0

            }

            data.target = data.smallBlindIndex;

            data.allPlayers[data.target].html.classList.add("selected")

            setTimeout(() => {
                require()
            }, data.speed)

        }

    } else {

        const player = data.allPlayers[data.target].myPlayer

        if (player) {
            myDecision()
        } else {
            oponentDecision()
        }

    }

}

function cleanPlacing() {

    data.allPlayers.map(player => {
        player.placing = 0
        player.html.querySelector(".placing").innerText = ""
    })
    data.higherValue = 0;
}

function everyOnePayed() {

    const allPlayersPayed = data.allPlayers.every(player => {
        return player.status === "check"
    })

    return allPlayersPayed;
}

function cleanPlayers() {
    data.allPlayers.map(player => {
        player.status = ""
    })
}

export { require, initRound }