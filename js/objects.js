function createPlayers(name, numberOfOponents, amount) {

    const myPlayer = {
        myPlayer: true,
        id: "@1234",
        name,
        amount: Number(amount),
        cards: [],
        placing: 0,
        status: "",
        html: null,
        function: [],
        hand: null,
        index: 0,
        points: 0,
    }

    const oponents = []

    for (let i = 1; i <= numberOfOponents; i++) {

        const oponent = {
            id: Math.floor(Math.random() * 10000),
            name: `player ${i}`,
            amount: Number(amount),
            cards: [],
            placing: 0,
            status: "",
            html: null,
            function: [],
            hand: null,
            index: i,
            points: 0,
        }

        oponents.push(oponent)
    }

    return {
        myPlayer,
        oponents,
        allPlayers: [myPlayer, ...oponents]
    }
}

export default createPlayers;