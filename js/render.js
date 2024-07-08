import formatAmount from "./formatAmount.js";

function render(data) {
    for (let i = 0; i < data.oponents.length; i++) {
        const oponent = document.querySelector(`.player-${i + 1}`)
        data.oponents[i].html = oponent
        oponent.querySelector(".name").innerText = data.oponents[i].name;
        oponent.querySelector(".amount").innerText = formatAmount(data.oponents[i].amount);
        oponent.style.display = "inline-block"
    }
    const myPlayer = document.querySelector(`.myPlayer`)
    data.myPlayer.html = myPlayer
    myPlayer.querySelector(".name").innerText = data.myPlayer.name
    myPlayer.querySelector(".amount").innerText = formatAmount(data.myPlayer.amount)
    myPlayer.style.display = "inline-block"

}

export default render;