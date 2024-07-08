import { data } from "./script.js";

function foldFunction(player) {

    const index = player.index;

    let indexPlayerRemoved;

    for (let i in data.allPlayers) {
        if (data.allPlayers[i].index === index) {
            indexPlayerRemoved = i;
        }
    }

    data.allPlayers[indexPlayerRemoved].html.classList.add("fold")
    data.allPlayers[indexPlayerRemoved].html.querySelector(".placing").innerText = ""

    const playerRemoved = data.allPlayers.splice(indexPlayerRemoved, 1)

    data.folders.push(playerRemoved[0])

}

export default foldFunction;