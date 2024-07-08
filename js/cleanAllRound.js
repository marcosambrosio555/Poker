import { data } from "./script.js";
import updateCardsOnBoard from "./updateCardsOnBoad.js";

function cleanAllRound() {

    data.cardsOnBoard = []
    updateCardsOnBoard()
    data.currentTurn = 0
    data.potValue = 0
    data.higherValue = 0
    data.allCards = []
    data.turnName = ""
    if (data.target >= data.allPlayers.length) data.target = 0

    putFoldersOnGame()

    data.folders = []

    data.allPlayers.map(player => {
        player.cards = []
        player.function = []
        player.placing = 0
        player.status = ""
        player.hand = null
        player.points = 0
        player.html.classList.remove("winner_animation")
        player.html.querySelector(".cards").innerHTML = ""
        player.html.querySelector(".function").innerHTML = ""
        player.html.querySelector(".placing").innerHTML = ""
    })


}

// currentTurn: 0,
// smallBlindIndex: null,

function putFoldersOnGame() {

    const players = []

    data.allPlayers.map(player => {
        const index = player.index
        players[index] = player
    })

    data.folders.map(player => {
        const index = player.index
        player.html.classList.remove("fold")
        players[index] = player
    })

    data.allPlayers = players;

}


export default cleanAllRound;