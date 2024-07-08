import { data } from "./script.js";

function createHandFunction() {

    const cardsOnBoard = [...data.cardsOnBoard]

    data.allPlayers.map(player => {
        const cardsPLayers = [...player.cards]
        player.hand = findHand(...cardsPLayers, ...cardsOnBoard)
    })

    data.allPlayers.map(player => {


        if (player.hand.flush.isFlush && player.hand.straight.isStraight) {

            player.hand.name = "Straight flush"
            player.hand.order = player.hand.straight.order

        } else if (player.hand.equals.name === "Four of kind") {

            handleEquals(player, "Four of kind")

        } else if (player.hand.equals.name === "Full house") {

            handleEquals(player, "Full house")

        } else if (player.hand.flush.isFlush) {

            player.hand.name = "Flush"
            player.hand.order = player.hand.flush.order
            player.hand.highCard = player.hand.flush.highCard

        } else if (player.hand.straight.isStraight) {

            player.hand.name = "Straight"
            player.hand.order = player.hand.straight.order
            player.hand.highCard = player.hand.straight.highCard

        } else if (player.hand.equals.name === "Three of kind") {

            handleEquals(player, "Three of kind")

        } else if (player.hand.equals.name === "Two pair") {

            handleEquals(player, "Two pair")

        } else if (player.hand.equals.name === "One pair") {

            handleEquals(player, "One pair")

        } else if (player.hand.equals.name === "Highest card") {

            handleEquals(player, "Highest card")

        }

    })

    function handleEquals(player, name) {
        player.hand.name = name
        player.hand.highCard = player.hand.equals.highCard
        player.hand.order = player.hand.equals.order
    }

}

function findHand(...data) {

    const cards = orderCards(data)
    const numbers = []

    cards.map(card => {
        numbers.push(card.number)
    })

    const isEquals = equalsNumberFunction(numbers)
    const isFlush = flushFunction(cards)
    const isStraight = straightFunction(numbers)


    return {
        equals: isEquals,
        straight: isStraight,
        flush: isFlush
    }
}

function orderCards(cards) {
    const numbersOrder = []
    const allNumbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

    allNumbers.map(number => {
        cards.map(card => {
            if (number === card.number) {
                numbersOrder.push(card)
            }
        })
    })

    return numbersOrder
}

function equalsNumberFunction(numbers) {

    const combination = {
        pair: [],
        threeOfKind: [],
        fourOfkind: [],
    }

    const numberTesteds = []
    let cont = 0
    numbers.reverse()

    const hand = {
        name: "",
        highCard: "",
        order: [],
    }

    for (let index of numbers) {

        if (!numberTesteds.includes(index)) {
            numbers.map(number => {
                if (index === number) {
                    cont++;
                }
            })
        }

        if (cont === 4) {
            combination.fourOfkind.push(index)
        } else if (cont === 3) {
            combination.threeOfKind.push(index)
        } else if (cont === 2) {
            combination.pair.push(index)
        }

        if (cont > 1) {
            for (let i = 0; i < cont; i++) {
                hand.order.push(index)
            }
        }

        cont = 0
        numberTesteds.push(index)

    }

    let i = 0;

    while (hand.order.length < 5) {

        if (!hand.order.includes(numbers[i])) {
            hand.order.push(numbers[i])
        }
        i++;

    }

    if (combination.fourOfkind.length > 0) {
        hand.name = "Four of kind"
    } else if (combination.threeOfKind.length > 0 && combination.pair.length > 0) {
        hand.name = "Full house"
    } else if (combination.threeOfKind.length > 0) {
        hand.name = "Three of kind"
    } else if (combination.pair.length === 2) {
        hand.name = "Two pair"
    } else if (combination.pair.length === 1) {
        hand.name = "One pair"
    } else {
        hand.name = "Highest card"
    }

    hand.highCard = hand.order[0]

    return hand;

}

function straightFunction(numbers) {

    const hand = {
        isStraight: false,
        highCard: null
    }

    const orderArray = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"]
    const orderString = "AKQJ198765432A"
    const numbersOrder = []

    orderArray.forEach(num => {
        const pos = numbers.indexOf(num)
        if (pos != -1) {
            numbersOrder.push(numbers[pos])
        }
    })

    let string = ""

    numbersOrder.map(number => {
        if (number === "10") number = "1"
        string += number
    })

    let length = string.length

    let start1;
    let ends1;
    let start2;
    let ends2;
    let start3;
    let ends3;

    if (length == 5) {
        verification(string)
    }

    if (length == 6) {
        start1 = string.slice(0, -1)
        ends1 = string.slice(-length + 1)
    }

    if (length == 7) {
        start2 = string.slice(0, -2)
        ends2 = string.slice(-length + 2)
    }

    if (length == 8) {
        start3 = string.slice(0, -3)
        ends3 = string.slice(-length + 3)
    }

    const array = [start1, start2, start3, ends1, ends2, ends3]

    array.map(item => {
        if (item && !hand.isStraight) verification(item)
    })


    function verification(string) {
        if (orderString.includes(string)) {
            hand.isStraight = true
            hand.highCard = string.charAt(0)
            if (hand.highCard === "1") hand.highCard = "10"
            hand.order = numbersOrder.reverse()
            if (hand.order[0] === "A") hand.order.shift()
        }
    }

    return hand;

}

function flushFunction(cards) {

    let hearts = 0;
    let spades = 0;
    let clubs = 0;
    let diams = 0;

    cards.map(card => {
        if (card.naipe.includes("hearts")) hearts++;
        if (card.naipe.includes("spades")) spades++;
        if (card.naipe.includes("clubs")) clubs++;
        if (card.naipe.includes("diams")) diams++;
    })

    const hand = {
        isFlush: false,
        order: []
    }

    findIsFlush(hearts, "&hearts;")
    findIsFlush(spades, "&spades;")
    findIsFlush(clubs, "&clubs;")
    findIsFlush(diams, "&diams;")

    function findIsFlush(naipe, string) {

        if (naipe >= 5) {

            hand.isFlush = true

            cards.reverse()

            let i = 0
            while (hand.order.length < 5) {
                if (cards[i].naipe === string) {
                    hand.order.push(cards[i].number)
                }
                i++
            }

            hand.highCard = hand.order[0]

        }
    }

    return hand;
}

export default createHandFunction;