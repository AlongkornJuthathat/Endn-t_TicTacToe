const gameRef = firebase.database().ref('Game');

function renderName() {
    //const currentUser = firebase.auth().currentUser;
    gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        console.log(gameData);
        if (gameData) {
            Object.keys(gameData).forEach((key) => {
                const room = gameData[key];
                if (key === room.roomId) {
                    document.querySelector('#playerName1').innerHTML = room.userOname;
                    document.querySelector('#playerName2').innerHTML = room.userXname;
                }
            });
        }
    });
}



function startGame() {
    
    renderName();
}

startGame();