import formatAmount from "./formatAmount.js";
import { data } from "./script.js";
import updatePot from "./updatePot.js";

function payment(object, value) {

    const valueToPay = value;
    const placingValue = object.placing
    const amountToPay = valueToPay - placingValue;
    let amountPayed;

    if (amountToPay > object.amount) {
        console.log("Caso o valor é maior que o meu dinheiro")
        amountPayed = object.amount;
        object.placing += amountPayed
        object.amount = 0;
    } else {
        console.log("Caso tenha dinheiro suficiente")
        object.amount -= amountToPay
        amountPayed = amountToPay
        object.placing += amountToPay
    }

    object.html.querySelector(".amount").innerText = `$${formatAmount(object.amount)}`
    object.html.querySelector(".placing").innerText = `$${object.placing}`

    if (value > data.higherValue) {
        data.higherValue = value
    }

    data.potValue += amountPayed

    updatePot()

}

export default payment;