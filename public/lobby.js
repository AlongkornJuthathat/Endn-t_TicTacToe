//const gameRef = firebase.database().ref('Game');
/* var roomId = ''; // Global variable declaration

document.addEventListener("DOMContentLoaded", function() {
    // Get room ID parameter value from URL
    var params = new URLSearchParams(window.location.search);
    roomId = params.get("roomId"); // Assign the value to global roomId
    console.log(roomId);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            redirectToGame();
        } else {
            console.log("User is not authenticated.");
        }
    });
}); */

/* function redirectToGame(){
    var gameRefRoom = firebase.database().ref('Game/' + roomId);
    gameRefRoom.once('value').then((snapshot) => {
        var room = snapshot.val();
        console.log("Room Data:", room);
        if (room && room.status === 'occupied' && room.userX && room.userO) {
            // Room is occupied and both players are present, redirect to game.html
            window.location.href = "field.html?roomId=" + roomId;
        }
    }).catch((error) => {
        console.error("Error checking room status:", error);
    });
} */

/* function renderName() {
    //const currentUser = firebase.auth().currentUser;
    gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        console.log(gameData);
        if (gameData) {
            Object.keys(gameData).forEach((key) => {
                const room = gameData[key];
                if(key === room.roomId){
                    document.querySelector('#playerName1').innerHTML = room.userOname;
                    document.querySelector('#playerName2').innerHTML = room.userXname;
                }
            });
        }
    });
}
 */
/* function renderName() {
    //const currentUser = firebase.auth().currentUser;
    gameRef.on('value').then((snapshot) => {
        const gameData = snapshot.val();
        console.log(gameData);
        if (gameData) {
            Object.keys(gameData).forEach((key) => {
                const room = gameData[key];
                document.querySelector('#playerName1').innerHTML = room.userOname;
                document.querySelector('#playerName2').innerHTML = room.userXname;
                var thisUser = currentUser.uid

                switch (thisUser) {
                    case room.userO:
                        console.log("Is player X");
                        document.querySelector('#playerName1').innerHTML = room.userOname;
                        break;
                    case room.userX:
                        console.log("Is player O");
                        document.querySelector('#playerName2').innerHTML = room.userXname;
                        break;
                    default:
                        console.log("User is not a player in this room.");
                }
            });
        }
    });
} */



//renderName();

/* setTimeout(() => {
    renderName();
    
}, 700);
 */
/* firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        gameRef.once('value').then((snapshot) => {
            const gameData = snapshot.val();
            console.log(gameData);
            if (gameData) {
                Object.keys(gameData).forEach((key) => {
                    const room = gameData[key];
                    switch (currentUser.uid) {
                        case room.userO:
                            console.log("Is player X");
                            document.querySelector('#playerName1').innerHTML = room.userOname;
                            break;
                        case room.userX:
                            console.log("Is player O");
                            document.querySelector('#playerName2').innerHTML = room.userXname;
                            break;
                        default:
                            console.log("User is not a player in this room.");
                    }
                });
            }
        });
    } else {
        console.log("User is not authenticated.");
    }
}); */

/* firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        gameRef.once('value').then((snapshot) => {
            const gameData = snapshot.val();
            console.log(gameData);
            if (gameData) {
                Object.keys(gameData).forEach((key) => {
                    const room = gameData[key];
                    var gameRef = firebase.database().ref('game/username');
                    gameRef.once("value", (snapshot) => {
                        var data = snapshot.val();
                        console.log(data);
                        switch (currentUser.uid) {
                            case room.userO:
                                console.log("Is player X");
                                document.querySelector('#playerName1').innerHTML = data;
                                break;
                            case room.userX:
                                console.log("Is player O");
                                document.querySelector('#playerName2').innerHTML = data;
                                break;
                            default:
                                console.log("User is not a player in this room.");
                        }
                    });
                });
            }
        });
    } else {
        console.log("User is not authenticated.");
    }
}); */

/* gameRef.once('value').then((snapshot) => {
    const gameData = snapshot.val();
    Object.keys(gameData).forEach((key) => {
        if (gameData === '') {
            
        }
    })
}) */