import changePlayer from "./changePlayer.js"
import createHandFunction from "./createHandFunction.js"
import foldFunction from "./foldFunction.js"
import payment from "./payment.js"
import { data, require } from "./script.js"

function oponentDecision() {

    const namesHand = [
        "Highest card",  // 0
        "One pair",      // 1
        "Two pair",      // 2
        "Three of kind", // 3
        "Straight",      // 4
        "Flush",         // 5
        "Full house",    // 6
        "Four of kind",  // 7
        "Straight flush" // 8
    ]


    const object = data.allPlayers[data.target]
    const higherValue = data.higherValue
    const bluff = generateNumber(0, 20)
    const hand = createHandFunction(object.cards)
    const pointsHandName = namesHand.indexOf(hand.name)
    const initialTurn = data.turnName === "PreFlop"
    const first2Turn = data.turnName === "PreFlop" || data.turnName === "Flop"
    const finalTurn = data.turnName === "River"
    const numberUntil2 = generateNumber(0, 2)
    const numberUntil3 = generateNumber(0, 3)
    const numberUntil4 = generateNumber(0, 4)
    const numberUntil6 = generateNumber(0, 6)
    const numberUntil8 = generateNumber(0, 8)
    const numberUntil10 = generateNumber(0, 10)
    const numberUntil15 = generateNumber(0, 15)

    setTimeout(() => {

        if (pointsHandName >= 6) {

            if (numberUntil3 === 0) {
                allIn(object)
            } else if (numberUntil3 === 1) {
                raise(object, 3)
            } else {
                call(object)
            }

        } else if (pointsHandName < 6 && pointsHandName >= 3) {

            if (numberUntil4 === 0) {
                raise(object, 2)
            } else {
                call(object)
            }

        } else if (bluff === 0 && finalTurn) {

            if (numberUntil15 === 0) {
                allIn(object)
            } else {
                raise(object, 3)
            }

        } else if (bluff === 0) {

            if (numberUntil4 === 0) {
                raise(object, 1)
            } else {
                call(object)
            }


        } else if (higherValue > 0) {
            if (initialTurn) {
                if (numberUntil10 === 0) {
                    fold(object)
                } else if (numberUntil10 === 1) {
                    raise(object, 1)
                } else {
                    call(object)
                }
            } else if (first2Turn) {

                if (pointsHandName >= 2 && pointsHandName < 3) {

                    if (numberUntil10 === 0) {
                        raise(object, 3)
                    } else if (numberUntil8 === 1) {
                        raise(object, 2)
                    } else if (numberUntil8 === 2) {
                        raise(object, 1)
                    } else {
                        call(object)
                    }

                } else {
                    if (higherValue >= object.amount / 5) {
                        if (numberUntil4 === 0) {
                            call(object)
                        } else {
                            fold(object)
                        }
                    } else {
                        if (numberUntil4 === 0) {
                            fold(object)
                        } else {
                            call(object)
                        }
                    }
                }
            } else {

                if (pointsHandName >= 2 && pointsHandName < 4) {

                    if (numberUntil6 === 0) {
                        raise(object, 3)
                    } else if (numberUntil8 === 1) {
                        raise(object, 2)
                    } else if (numberUntil8 === 2) {
                        raise(object, 1)
                    } else {
                        call(object)
                    }

                } else {

                    if (higherValue >= object.amount / 4) {
                        if (numberUntil3 === 0) {
                            call(object)
                        } else {
                            fold(object)
                        }
                    } else {
                        if (numberUntil3 === 0) {
                            fold(object)
                        } else {
                            call(object)
                        }
                    }
                }

            }


        } else if (higherValue === 0) {

            if (pointsHandName >= 2 && pointsHandName < 3) {

                if (numberUntil2 === 0) {
                    call(object)
                } else {
                    raise(object, 1)
                }

            } else {

                if (numberUntil3 === 0) {
                    raise(object, 1)
                } else {
                    call(object)
                }
            }

        } else {
            call(object)
        }

        setTimeout(() => {
            changePlayer();
            require();
        }, data.speed / 2)

    }, data.speed / 2)

}

function fold(object) {
    foldFunction(object)
}

function call(object) {

    const higherValue = data.higherValue

    payment(object, higherValue)

    if (higherValue === 0) {
        object.html.querySelector(".placing").innerText = "check"
    }

    object.status = "check";

}

function raise(object, value) {

    const higherValue = data.higherValue
    const initialAmount = data.initialAmount
    const multiply = Number(initialAmount / 100)

    const increaseAmount = generateNumber(1, 5)
    const raiseValue = (higherValue + multiply * increaseAmount) * value

    payment(object, raiseValue)

    data.allPlayers.map(player => {
        player.status = ""
    })

    object.status = "check";

}

function allIn(object) {

    payment(object, object.amount)

    object.status = "check";

}

function generateNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

export default oponentDecision;