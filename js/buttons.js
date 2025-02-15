import changePlayer from "./changePlayer.js"
import foldFunction from "./foldFunction.js"
import payment from "./payment.js"
import { data, require } from "./script.js"

const btnCheck = document.querySelector(".btn-check")
const btnRaise = document.querySelector(".btn-raise")
const btnFold = document.querySelector(".btn-fold")
const btnAllIn = document.querySelector(".btn-all-in")

const raiseValue = document.querySelector(".box-raise .value")

btnCheck.addEventListener("click", () => {

    disableOptions()

    const object = data.myPlayer;
    const value = data.higherValue;

    if (btnCheck.innerText === "Call") {

        payment(object, value)

    } else {

        data.myPlayer.html.querySelector(".placing").innerText = "check"

    }

    object.status = "check"

    setTimeout(() => {

        changePlayer()

        require()

    }, data.speed)

})

btnRaise.addEventListener("click", () => {

    // Se o valor do raise for negativo ou maior que o meu cahs...
    if (raiseValue.value <= 0 ||
        raiseValue.value > data.myPlayer.amount ||
        raiseValue.value <= data.higherValue
    ) {
        return;
    }

    disableOptions()

    const object = data.myPlayer;
    const value = Number(raiseValue.value)

    payment(object, value);

    data.allPlayers.map(player => {
        player.status = ""
    })

    raiseValue.value = 0

    object.status = "check"

    changePlayer()

    require()

})

btnFold.addEventListener("click", () => {

    disableOptions()

    const object = data.myPlayer;

    foldFunction(object)

    object.status = "check"

    disableOptions()

    changePlayer()

    require()

})

btnAllIn.addEventListener("click", () => {

    disableOptions()

    const object = data.myPlayer;

    payment(object, object.amount);

    data.allPlayers.map(player => {
        player.status = ""
    })

    object.status = "check"

    changePlayer()

    require()

})

function myDecision() {

    // Habilitar opções
    ableOptions()

    // Atualizar valor do raise
    raiseValue.value = data.higherValue + 100;

    // Mudar texto para cobrir ou passar
    if (data.higherValue > data.myPlayer.placing) {
        btnCheck.innerText = "Call"
    } else {
        btnCheck.innerText = "Check"
    }


}

function ableOptions() {
    document.querySelector(".options").classList.remove("disable")
}

function disableOptions() {
    document.querySelector(".options").classList.add("disable")
}

export { myDecision }