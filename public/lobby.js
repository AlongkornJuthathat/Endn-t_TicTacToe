const gameRef = firebase.database().ref('Game');

document.addEventListener("DOMContentLoaded", function() {
    // Get room ID parameter value from URL
    var params = new URLSearchParams(window.location.search);
    var roomId = params.get("roomId");
    console.log(roomId);
    
    // Check if the room is full by accessing its data from the database
    var gameRefRoom = firebase.database().ref('Game/' + roomId);
    gameRefRoom.once('value').then((snapshot) => {
        var room = snapshot.val();
        console.log("Room Data:", room);
        if (room && room.status === 'occupied') {
            // Room is occupied, redirect to game.html
            window.location.href = "field.html?roomId=" + roomId;
        }
    })
    .catch((error) => {
        console.error("Error checking room status:", error);
    });
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        gameRef.once('value').then((snapshot) => {
            const gameData = snapshot.val();
            console.log(gameData);
            if (gameData) {
                Object.keys(gameData).forEach((key) => {
                    const room = gameData[key];
                    var userNameRef = firebase.database().ref('users/' + currentUser.uid + '/username');
                    userNameRef.once("value", (snapshot) => {
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
});


gameRef.once('value').then((snapshot) => {
    const gameData = snapshot.val();
    Object.keys(gameData).forEach((key) => {
        if (gameData === '') {
            
        }
    })
})