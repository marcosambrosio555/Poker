import { data } from "./script.js";

function createHandFunction(cards) {

    const cardsOnBoard = [...data.cardsOnBoard]

    const hand = findHand(...cards, ...cardsOnBoard)

    if (hand.flush.isFlush && hand.straight.isStraight) {

        hand.name = "Straight flush"
        hand.order = hand.straight.order

    } else if (hand.equals.name === "Four of kind") {

        handleEquals(hand, "Four of kind")

    } else if (hand.equals.name === "Full house") {

        handleEquals(hand, "Full house")

    } else if (hand.flush.isFlush) {

        hand.name = "Flush"
        hand.order = hand.flush.order
        hand.highCard = hand.flush.highCard

    } else if (hand.straight.isStraight) {

        hand.name = "Straight"
        hand.order = hand.straight.order.reverse()
        hand.highCard = hand.straight.highCard

    } else if (hand.equals.name === "Three of kind") {

        handleEquals(hand, "Three of kind")

    } else if (hand.equals.name === "Two pair") {

        handleEquals(hand, "Two pair")

    } else if (hand.equals.name === "One pair") {

        handleEquals(hand, "One pair")

    } else if (hand.equals.name === "Highest card") {

        handleEquals(hand, "Highest card")

    }

    function handleEquals(hand, name) {
        hand.name = name
        hand.highCard = hand.equals.highCard
        hand.order = hand.equals.order
    }

    return hand

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

    while (hand.order.length < numbers.length) {

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