import { data } from "./script.js";

const boardCards = document.querySelector(".board .cards")

function updateCardsOnBoard() {

    boardCards.innerHTML = ""

    data.cardsOnBoard.map(card => {
        boardCards.innerHTML += `
                <div class='card ${card.color}'>
                <span class='number'>${card.number}</span>
                <span class='naipe'>${card.naipe}</span>
            </div>
        `
    })

}

export default updateCardsOnBoard;