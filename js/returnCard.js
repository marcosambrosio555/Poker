import { data } from "./script.js";

function returnCard() {
    return data.allCards.splice(0, 1)[0]
}


export default returnCard;