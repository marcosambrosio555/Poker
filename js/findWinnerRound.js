import formatAmount from "./formatAmount.js";
import { data, initRound } from "./script.js";
import updatePot from "./updatePot.js";

function findWinnerRound() {

    const namesHand = [
        "Highest card",
        "One pair",
        "Two pair",
        "Three of kind",
        "Straight",
        "Flush",
        "Full house",
        "Four of kind",
        "Straight flush"
    ]

    const orderList = ["2", "3", "4", "5",
        "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

    let highestNumber = 0
    let arrayBestHand = []

    data.allPlayers.map(player => {

        const index = namesHand.indexOf(player.hand.name)

        if (index >= highestNumber) {
            if (index > highestNumber) {
                arrayBestHand = []
            }
            highestNumber = index
            arrayBestHand.push(player)
        }

    })

    if (arrayBestHand.length === 1) {
        winnerFunction(arrayBestHand[0])
    } else {
        lastTierBreakerFinal(arrayBestHand)
    }


    function lastTierBreakerFinal(players) {

        let winners = [];

        for (let i = 0; i < 5; i++) {

            winners = []
            let maxPoints = -1;

            players.map(player => {
                let points = Number(orderList.indexOf(player.hand.order[i]))
                if (points > maxPoints) {
                    maxPoints = points
                    winners = []
                    winners.push(player)
                } else if (points === maxPoints) {
                    winners.push(player)
                }
            })

            if (winners.length === 1) {
                winnerFunction(winners[0])
                break;
            } else {
                players = [...winners]
            }

        }

        multiplyWinners(winners)

    }



}

export function winnerFunction(player) {
    player.html.classList.add("winner_animation")
    player.amount += data.potValue
    player.html.querySelector(".amount").innerText = `${formatAmount(player.amount)}`

    data.potValue = 0;
    updatePot()

    setTimeout(() => {
        initRound()
    }, 5000)
}

function multiplyWinners(players) {

    const numberOfWinners = players.length
    const amount = parseInt(data.potValue / numberOfWinners)

    players.map(player => {
        player.html.classList.add("winner_animation")
        player.amount += amount
        player.html.querySelector(".amount").innerText = `${formatAmount(player.amount)}`
    })

    data.potValue = 0;
    updatePot()

    setTimeout(() => {
        initRound()
    }, 5000)
}

export default findWinnerRound;