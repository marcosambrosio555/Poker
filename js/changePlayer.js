import { data } from "./script.js";

function changePlayer() {

    data.allPlayers.map(player => {
        player.html.classList.remove("selected")
    })

    data.target++

    if (!data.allPlayers[data.target]) {
        data.target = 0;
    }

    data.allPlayers[data.target].html.classList.add("selected")

}


export default changePlayer;