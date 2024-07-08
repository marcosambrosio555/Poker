import formatAmount from "./formatAmount.js";
import { data } from "./script.js";

const pot = document.querySelector(".board .pot")

function updatePot() {
    pot.innerText = `$${formatAmount(data.potValue)}`;
}

export default updatePot;