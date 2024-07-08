
function formatAmount(value) {
    return value.toLocaleString('pt-br', {
        minimumFractionDigits: 0
    })
}


export default formatAmount