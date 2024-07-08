const numbers = [
    "A", "2", "3", "4", "5",
    "6", "7", "8", "9", "10",
    "J", "Q", "K"
]

const naipes = [
    "&diams;",
    "&clubs;",
    "&spades;",
    "&hearts;"
]



function createCardsFunction() {

    const cards = []

    for (let number of numbers) {
        for (let naipe of naipes) {

            const card = {
                number,
                naipe,
                color: naipe === "&diams;" || naipe === "&hearts;" ? "red" : "black"
            }

            cards.push(card)
        }
    }

    return cards;
}



function mixCards() {
    const allCards = []
    const cards = createCardsFunction();
    do {
        const numRandom = Math.floor(Math.random() * cards.length)
        const card = cards.splice(numRandom, 1)
        allCards.push(card[0])
    } while (allCards.length < 52);

    return allCards
}


export default mixCards;