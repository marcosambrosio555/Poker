import changePlayer from "./changePlayer.js";
import cleanAllRound from "./cleanAllRound.js";
import mixCards from "./deck.js";
import payment from "./payment.js";
import returnCard from "./returnCard.js";
import { data } from "./script.js";

function createRound(data) {

    // First rest all things
    cleanAllRound()

    // Eliminate who has 0 coins
    eliminateWhoLoses()

    // Verification if has a champions
    const state = verificationIfHasChampions()
    if (state) {
        return;
    }

    // Ative PreFlop
    data.turns[data.currentTurn]();
    data.currentTurn++;

    // Create new Deck
    data.allCards = mixCards()

    // Choose Functions
    chooseFunctions()

    // Give players cards
    data.allPlayers.map(player => {
        const html = player.html.querySelector(".cards")
        player.cards.push(returnCard())
        player.cards.push(returnCard())
        if (player.myPlayer) {
            renderCards(html, player, "")
        } else {
            renderCards(html, player, "face-down")
        }
        putFunction(player.html, player)
    })


}

function renderCards(html, data, status) {
    html.innerHTML += `
        <div class='card card-1 ${status} ${data.cards[0].color}'>
            <span class='number'>${data.cards[0].number}</span>
            <span class='naipe'>${data.cards[0].naipe}</span>
        </div>
        <div class='card card-2 ${status} ${data.cards[1].color}'>
            <span class='number'>${data.cards[1].number}</span>
            <span class='naipe'>${data.cards[1].naipe}</span>
        </div>
    `
}

function putFunction(html, data) {
    data.function.map(func => {
        html.querySelector(".function").innerHTML += `<span class='${func}'>${func}</span>`
    })

}

function chooseFunctions() {

    // Dealer
    data.allPlayers[data.target].function.push("D")

    // Small Blind
    changePlayer()
    data.allPlayers[data.target].function.push("S")
    payment(data.allPlayers[data.target], data.smallBlind);
    data.smallBlindIndex = data.target;

    // Big Blind
    changePlayer()
    data.allPlayers[data.target].function.push("B")
    payment(data.allPlayers[data.target], data.bigBlind);

}

function eliminateWhoLoses() {
    const players = data.allPlayers.filter(player => {
        if (player.amount <= 0) {
            player.html.classList.remove("selected")
            player.html.classList.add("out")
        }
        return player.amount > 0;
    })
    data.allPlayers = players;
}

function verificationIfHasChampions() {
    if (data.allPlayers.length === 1) {

        const player = data.allPlayers[0]
        console.log("Temos um campeão")
        console.log("Campeão é " + player.name)
        alert(player.name + " é o grande vencedor.")
        data.state = "Over"
        return true
    }
}

export default createRound;