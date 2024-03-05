const gameRef = firebase.database().ref('Game');

function renderName() {
    //const currentUser = firebase.auth().currentUser;
    gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        console.log(gameData);
        if (gameData) {
            Object.keys(gameData).forEach((key) => {
                const room = gameData[key];
                if (key === room.roomId && room.status === 'occupied') {
                    document.querySelector('#playerName1').innerHTML = room.userOname;
                    document.querySelector('#playerName2').innerHTML = room.userXname;
                } else if (key === room.roomId && room.status === 'lobby') {
                    document.querySelector('#playerName1').innerHTML = room.userOname;
                    document.querySelector('#playerName2').innerHTML = 'Waiting...';
                }
            });
        }
    });
}

function startGame() {
    renderName();
}

startGame();