const amount = document.querySelector("#amount")
const bigBlind = document.querySelector("#bigBlind")

function calcBigBlind() {
    const amountValue = Number(amount.value)
    bigBlind.value = amountValue * 0.05;
}

amount.addEventListener("input", () => {
    calcBigBlind()
})

calcBigBlind()