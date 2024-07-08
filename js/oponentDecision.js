import changePlayer from "./changePlayer.js"
import foldFunction from "./foldFunction.js"
import payment from "./payment.js"
import { data, require } from "./script.js"

function oponentDecision() {

    setTimeout(() => {

        const object = data.allPlayers[data.target]
        const higherValue = data.higherValue


        let numberRandom = Math.floor(Math.random() * 6)

        if (numberRandom === 0 && data.higherValue !== 0) {

            fold(object)

        } else if (numberRandom === 1 && object.amount > higherValue) {

            raise(object, higherValue)

            data.allPlayers.map(player => {
                player.status = ""
            })

        } else {

            call(object)

        }

        object.status = "check"

        setTimeout(() => {
            changePlayer();
            require()
        }, data.speed / 1.5)

    }, data.speed / 1.5)

}

function fold(object) {
    foldFunction(object)
}

function call(object) {

    const higherValue = data.higherValue

    if (higherValue > object.placing) {

        payment(object, higherValue)

    } else {

        object.html.querySelector(".placing").innerText = "check"

    }

}

function raise(object, higherValue) {
    const raiseValue = parseInt(higherValue + object.amount * 0.1)
    payment(object, raiseValue)
}

export default oponentDecision;